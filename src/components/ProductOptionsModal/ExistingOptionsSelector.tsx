import React, { useState } from "react";
import * as S from "./styles";
import type { ProductOption } from "../../services/api/productOptionsApi";
import { useGetOptionsQuery } from "../../services/api/productOptionsApi";

interface ExistingOptionsSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOptions: (options: ProductOption[]) => void;
}

export default function ExistingOptionsSelector({
  isOpen,
  onClose,
  onSelectOptions,
}: ExistingOptionsSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);

  const { data: response, isLoading, error } = useGetOptionsQuery();
  const allOptions = response?.options || [];

  // Por enquanto, mostrar todas as opções
  // TODO: Implementar filtro quando a API retornar informações de associação
  const availableOptions = allOptions;

  // Filtrar por termo de busca
  const filteredOptions = availableOptions.filter((option) => {
    if (!option || !option.name) return false;
    return option.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log("Response:", response);
  console.log("All options:", allOptions);
  console.log("Available options:", availableOptions);
  console.log("Filtered options:", filteredOptions);

  const handleToggleOption = (option: ProductOption) => {
    setSelectedOptions((prev) => {
      const isSelected = prev.some((selected) => selected.id === option.id);
      if (isSelected) {
        return prev.filter((selected) => selected.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleConfirmSelection = () => {
    if (selectedOptions.length > 0) {
      onSelectOptions(selectedOptions);
    }
    onClose();
  };

  const handleCancel = () => {
    setSelectedOptions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.Modal
      onClick={(e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>Escolher Opções já Existentes</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <div
          style={{
            background: "#fffbe6",
            border: "1px solid #ffe58f",
            color: "#ad8b00",
            borderRadius: "6px",
            padding: "12px 16px",
            margin: "16px 0",
            fontSize: "0.98rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "1.2em" }}>⚠️</span>
          <span>
            Ao reaproveitar uma opção existente,{" "}
            <b>
              qualquer alteração no preço de um item será refletida em todos os
              produtos
            </b>{" "}
            que utilizam essa opção.
            <br />
            Caso deseje valores diferentes para cada produto,{" "}
            <b>crie um grupo de opção exclusivo para cada um</b>.
          </span>
        </div>

        <S.FormContainer>
          <S.FormGroup>
            <S.Label>Buscar opções</S.Label>
            <S.Input
              type="text"
              placeholder="Digite para buscar opções..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </S.FormGroup>

          {isLoading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Carregando opções...
            </div>
          )}

          {error && (
            <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
              Erro ao carregar opções
            </div>
          )}

          {!isLoading && !error && (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {filteredOptions.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  {searchTerm
                    ? "Nenhuma opção encontrada"
                    : "Nenhuma opção disponível"}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        backgroundColor: selectedOptions.some(
                          (selected) => selected.id === option.id
                        )
                          ? "#e3f2fd"
                          : "#f9f9f9",
                        borderColor: selectedOptions.some(
                          (selected) => selected.id === option.id
                        )
                          ? "#2196f3"
                          : "#ddd",
                      }}
                      onClick={() => handleToggleOption(option)}
                      onMouseEnter={(e) => {
                        if (
                          !selectedOptions.some(
                            (selected) => selected.id === option.id
                          )
                        ) {
                          e.currentTarget.style.backgroundColor = "#f0f0f0";
                          e.currentTarget.style.borderColor = "#007bff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (
                          !selectedOptions.some(
                            (selected) => selected.id === option.id
                          )
                        ) {
                          e.currentTarget.style.backgroundColor = "#f9f9f9";
                          e.currentTarget.style.borderColor = "#ddd";
                        }
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: selectedOptions.some(
                              (selected) => selected.id === option.id
                            )
                              ? "#2196f3"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {selectedOptions.some(
                            (selected) => selected.id === option.id
                          ) && "✓"}
                        </div>
                        <div style={{ fontWeight: "bold" }}>{option.name}</div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#666",
                          marginBottom: "8px",
                        }}
                      >
                        Tipo:{" "}
                        {option.type === "single"
                          ? "Única escolha"
                          : "Múltipla escolha"}
                        {option.required && " • Obrigatório"}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#888" }}>
                        {option.values.length} valor
                        {option.values.length !== 1 ? "es" : ""}
                      </div>
                      {option.values.length > 0 && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#999",
                            marginTop: "5px",
                            fontStyle: "italic",
                          }}
                        >
                          Ex:{" "}
                          {option.values
                            .slice(0, 3)
                            .map((v) => `${v.name}: ${v.price_increment}`)
                            .join(", ")}
                          {option.values.length > 3 && "..."}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <S.ModalButtons>
            <S.Button
              type="button"
              className="primary"
              onClick={handleConfirmSelection}
              disabled={selectedOptions.length === 0}
            >
              Adicionar {selectedOptions.length} Opção
              {selectedOptions.length > 1 ? "ões" : ""}
            </S.Button>
            <S.Button type="button" onClick={handleCancel}>
              Cancelar
            </S.Button>
          </S.ModalButtons>
        </S.FormContainer>
      </S.ModalContent>
    </S.Modal>
  );
}
