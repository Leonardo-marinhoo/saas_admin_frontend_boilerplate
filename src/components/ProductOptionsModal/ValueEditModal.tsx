import React, { useState, useEffect } from "react";
import * as S from "./styles";
import type { OptionValue } from "../../services/api/productOptionsApi";
import { useUpdateOptionValueMutation } from "../../services/api/productOptionsApi";

interface ValueEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionId: number;
  value: OptionValue;
  onSuccess: () => void;
}

export default function ValueEditModal({
  isOpen,
  onClose,
  optionId,
  value,
  onSuccess,
}: ValueEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price_increment: 0,
    default_option: false,
  });

  const [updateOptionValue] = useUpdateOptionValueMutation();

  // Reset form when modal opens or value changes
  useEffect(() => {
    if (isOpen && value) {
      setFormData({
        name: value.name,
        price_increment: Number(value.price_increment),
        default_option: value.default_option,
      });
    }
  }, [isOpen, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Nome do valor é obrigatório");
      return;
    }

    try {
      const updateData: Partial<OptionValue> = {};

      if (formData.name !== value.name) {
        updateData.name = formData.name;
      }
      if (Number(formData.price_increment) !== Number(value.price_increment)) {
        updateData.price_increment = Number(formData.price_increment);
      }
      if (formData.default_option !== value.default_option) {
        updateData.default_option = formData.default_option;
      }

      // Só atualizar se há mudanças
      if (Object.keys(updateData).length > 0) {
        await updateOptionValue({
          optionId,
          valueId: value.id!,
          data: updateData,
        }).unwrap();
      }

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
      alert("Erro ao atualizar valor");
    }
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
          <h3>Editar Valor</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer>
          <S.FormGroup>
            <S.Label>Nome do Valor *</S.Label>
            <S.Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Pão de hambúrguer"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Preço Adicional</S.Label>
            <S.PriceInput
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price_increment}
              onChange={handleInputChange}
              name="price_increment"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.CheckboxContainer>
              <S.Checkbox
                type="checkbox"
                name="default_option"
                checked={formData.default_option}
                onChange={handleInputChange}
              />
              <S.CheckboxLabel>Opção Padrão</S.CheckboxLabel>
            </S.CheckboxContainer>
          </S.FormGroup>

          <S.ModalButtons>
            <S.Button type="button" className="primary" onClick={handleSubmit}>
              Atualizar Valor
            </S.Button>
            <S.Button type="button" onClick={onClose}>
              Cancelar
            </S.Button>
          </S.ModalButtons>
        </S.FormContainer>
      </S.ModalContent>
    </S.Modal>
  );
}
