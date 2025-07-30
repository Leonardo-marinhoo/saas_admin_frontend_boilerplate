import React, { useState, useEffect } from "react";
import * as S from "./styles";
import type { ProductOption } from "../../services/api/productOptionsApi";
import { useUpdateOptionMutation } from "../../services/api/productOptionsApi";

interface OptionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: ProductOption;
  onSuccess: () => void;
}

export default function OptionEditModal({
  isOpen,
  onClose,
  option,
  onSuccess,
}: OptionEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "single" as "single" | "multiple",
    required: true,
  });

  const [updateOption] = useUpdateOptionMutation();

  // Reset form when modal opens or option changes
  useEffect(() => {
    if (isOpen && option) {
      setFormData({
        name: option.name,
        type: option.type,
        required: option.required,
      });
    }
  }, [isOpen, option]);

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

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Nome da opção é obrigatório");
      return;
    }

    try {
      const updateData: Partial<ProductOption> = {};

      if (formData.name !== option.name) {
        updateData.name = formData.name;
      }
      if (formData.type !== option.type) {
        updateData.type = formData.type;
      }
      if (formData.required !== option.required) {
        updateData.required = formData.required;
      }

      // Só atualizar se há mudanças
      if (Object.keys(updateData).length > 0) {
        await updateOption({
          id: option.id!,
          data: updateData,
        }).unwrap();
      }

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erro ao atualizar opção:", error);
      alert("Erro ao atualizar opção");
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
          <h3>Editar Opção</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer>
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

          <S.ModalButtons>
            <S.Button type="button" className="primary" onClick={handleSubmit}>
              Atualizar Opção
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
