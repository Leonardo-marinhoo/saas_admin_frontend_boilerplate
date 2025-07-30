import React from "react";
import * as S from "./styles";
import type { ProductOption } from "../../services/api/productOptionsApi";

interface ProductOptionsProps {
  productId: number;
  options: ProductOption[];
  onEditOption: (option: ProductOption) => void;
  onDeleteOption: (optionId: number) => void; // Na verdade é detach/desassociar
  onEditValue?: (optionId: number, value: any) => void;
}

export default function ProductOptions({
  productId,
  options,
  onEditOption,
  onDeleteOption,
  onEditValue,
}: ProductOptionsProps) {
  console.log("ProductOptions render - productId:", productId);
  console.log("ProductOptions render - options:", options);
  console.log("ProductOptions render - options length:", options?.length);
  return (
    <S.Container>
      <S.Header>
        <S.Title>Opções do Produto</S.Title>
      </S.Header>

      {options.length === 0 ? (
        <S.EmptyState>
          <p>Nenhuma opção configurada para este produto</p>
          <p>Adicione opções como tipos de pão, tamanhos, etc.</p>
        </S.EmptyState>
      ) : (
        <S.OptionsList>
          {options.map((option) => (
            <S.OptionCard key={option.id}>
              <S.OptionHeader>
                <S.OptionInfo>
                  <S.OptionName>{option.name}</S.OptionName>
                  <S.OptionMeta>
                    <S.Badge type={option.type}>
                      {option.type === "single"
                        ? "Única escolha"
                        : "Múltipla escolha"}
                    </S.Badge>
                    {option.required && (
                      <S.Badge type="required">Obrigatório</S.Badge>
                    )}
                  </S.OptionMeta>
                </S.OptionInfo>
                <S.OptionActions>
                  <S.ActionButton
                    type="button"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onEditOption(option);
                    }}
                  >
                    Editar
                  </S.ActionButton>
                  <S.ActionButton
                    type="button"
                    className="danger"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      option.id && onDeleteOption(option.id);
                    }}
                  >
                    Remover
                  </S.ActionButton>
                </S.OptionActions>
              </S.OptionHeader>

              <S.ValuesList>
                {option.values.map((value) => (
                  <S.ValueItem key={value.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <S.ValueName>{value.name}</S.ValueName>
                      {onEditValue && (
                        <button
                          type="button"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onEditValue(option.id!, value);
                          }}
                          style={{
                            background: "none",
                            color: "#666",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            border: "1px solid #ddd",
                          }}
                        >
                          Editar
                        </button>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <S.ValuePrice>
                        {Number(value.price_increment) > 0
                          ? `+R$ ${Number(value.price_increment).toFixed(2)}`
                          : "Grátis"}
                      </S.ValuePrice>
                      {value.default_option && (
                        <S.DefaultBadge>Padrão</S.DefaultBadge>
                      )}
                    </div>
                  </S.ValueItem>
                ))}
              </S.ValuesList>
            </S.OptionCard>
          ))}
        </S.OptionsList>
      )}
    </S.Container>
  );
}
