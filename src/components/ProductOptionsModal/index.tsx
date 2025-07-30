import React, { useState } from "react";
import * as S from "./styles";
import type {
  ProductOption,
  OptionValue,
} from "../../services/api/productOptionsApi";
import {
  useCreateOptionMutation,
  useAttachOptionToProductMutation,
} from "../../services/api/productOptionsApi";
import ExistingOptionsSelector from "./ExistingOptionsSelector";

interface ProductOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onSuccess: () => void;
}

export default function ProductOptionsModal({
  isOpen,
  onClose,
  productId,
  onSuccess,
}: ProductOptionsModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "single" as "single" | "multiple",
    required: true,
    values: [] as Omit<
      OptionValue,
      "id" | "option_id" | "created_at" | "updated_at"
    >[],
  });

  const [createOption] = useCreateOptionMutation();
  const [attachOptionToProduct] = useAttachOptionToProductMutation();

  // Estado para o seletor de opções existentes
  const [isExistingOptionsSelectorOpen, setIsExistingOptionsSelectorOpen] =
    useState(false);

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        type: "single",
        required: true,
        values: [],
      });
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddValue = () => {
    setFormData((prev) => ({
      ...prev,
      values: [
        ...prev.values,
        {
          name: "",
          price_increment: 0,
          default_option: false,
        },
      ],
    }));
  };

  const handleRemoveValue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const handleValueChange = (
    index: number,
    field: keyof OptionValue,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.map((val, i) =>
        i === index ? { ...val, [field]: value } : val
      ),
    }));
  };

  const handleSelectExistingOptions = async (options: ProductOption[]) => {
    try {
      await attachOptionToProduct({
        optionIds: options.map((option) => option.id!),
        productId: productId,
      }).unwrap();

      onSuccess();
    } catch (error) {
      console.error("Erro ao associar opções:", error);
      alert("Erro ao associar opções ao produto");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Nome da opção é obrigatório");
      return;
    }

    if (formData.values.length === 0) {
      alert("Adicione pelo menos um valor para a opção");
      return;
    }

    if (formData.values.some((v) => !v.name.trim())) {
      alert("Todos os valores devem ter um nome");
      return;
    }

    try {
      // Criação: enviar todos os dados
      const optionData: ProductOption = {
        name: formData.name,
        type: formData.type,
        required: formData.required,
        product_id: productId,
        values: formData.values,
      };
      await createOption(optionData).unwrap();

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar opção:", error);
      alert("Erro ao salvar opção");
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
          <h3>Nova Opção</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer>
          <S.FormGroup>
            <S.Label>Escolher Opção Existente</S.Label>
            <S.Button
              type="button"
              onClick={() => setIsExistingOptionsSelectorOpen(true)}
              style={{
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "#28a745",
                borderColor: "#28a745",
              }}
            >
              Escolher Opções já Existentes
            </S.Button>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Nome da Opção *</S.Label>
            <S.Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: Escolha o tipo de pão"
            />
          </S.FormGroup>

          <S.FormRow>
            <S.FormGroup>
              <S.Label>Tipo</S.Label>
              <S.Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="single">Única escolha</option>
                <option value="multiple">Múltipla escolha</option>
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.CheckboxContainer>
                <S.Checkbox
                  type="checkbox"
                  name="required"
                  checked={formData.required}
                  onChange={handleInputChange}
                />
                <S.CheckboxLabel>Obrigatório</S.CheckboxLabel>
              </S.CheckboxContainer>
            </S.FormGroup>
          </S.FormRow>

          <S.ValuesSection>
            <S.ValuesHeader>
              <S.Label>Valores da Opção</S.Label>
              <S.AddValueButton type="button" onClick={handleAddValue}>
                + Adicionar Valor
              </S.AddValueButton>
            </S.ValuesHeader>

            {formData.values.map((value, index) => (
              <S.ValueForm key={index}>
                <S.ValueFormRow>
                  <S.ValueInput
                    type="text"
                    placeholder="Nome do valor"
                    value={value.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleValueChange(index, "name", e.target.value)
                    }
                  />
                  <S.PriceInput
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={value.price_increment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleValueChange(
                        index,
                        "price_increment",
                        Number(e.target.value) || 0
                      )
                    }
                  />
                  <S.CheckboxContainer>
                    <S.Checkbox
                      type="checkbox"
                      checked={value.default_option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleValueChange(
                          index,
                          "default_option",
                          e.target.checked
                        )
                      }
                    />
                    <S.CheckboxLabel>Padrão</S.CheckboxLabel>
                  </S.CheckboxContainer>
                  <S.RemoveButton
                    type="button"
                    onClick={() => handleRemoveValue(index)}
                  >
                    ×
                  </S.RemoveButton>
                </S.ValueFormRow>
              </S.ValueForm>
            ))}
          </S.ValuesSection>

          <S.ModalButtons>
            <S.Button type="button" className="primary" onClick={handleSubmit}>
              Criar Opção
            </S.Button>
            <S.Button type="button" onClick={onClose}>
              Cancelar
            </S.Button>
          </S.ModalButtons>
        </S.FormContainer>
      </S.ModalContent>

      {/* Seletor de Opções Existentes */}
      <ExistingOptionsSelector
        isOpen={isExistingOptionsSelectorOpen}
        onClose={() => setIsExistingOptionsSelectorOpen(false)}
        onSelectOptions={handleSelectExistingOptions}
      />
    </S.Modal>
  );
}
