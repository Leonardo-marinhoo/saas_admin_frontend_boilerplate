import React from "react";
import { S } from "./styles";
import { useState } from "react";
import { useTheme } from "styled-components";
import icon1 from "../../assets/categories-icons/1.png";
import icon2 from "../../assets/categories-icons/2.png";
import icon3 from "../../assets/categories-icons/3.png";
import icon4 from "../../assets/categories-icons/4.png";
import icon5 from "../../assets/categories-icons/5.jpg";
import icon6 from "../../assets/categories-icons/6.png";
import icon7 from "../../assets/categories-icons/7.png";
import icon8 from "../../assets/categories-icons/8.png";
import icon9 from "../../assets/categories-icons/9.png";
import icon10 from "../../assets/categories-icons/10.png";
import icon11 from "../../assets/categories-icons/11.jpg";
import icon12 from "../../assets/categories-icons/12.png";
import icon13 from "../../assets/categories-icons/13.png";

const categoryIcons: Record<string, string> = {
  "1.png": icon1,
  "2.png": icon2,
  "3.png": icon3,
  "4.png": icon4,
  "5.jpg": icon5,
  "6.png": icon6,
  "7.png": icon7,
  "8.png": icon8,
  "9.png": icon9,
  "10.png": icon10,
  "11.jpg": icon11,
  "12.png": icon12,
  "13.png": icon13,
};

export interface CategoryFormProps {
  editingCategory: any; // tipar corretamente depois
  formData: {
    name: string;
    description: string;
    bannerFile: File | null;
    iconFile: File | null;
  };
  bannerPreview: string | null;
  iconPreview: string | null;
  error: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "bannerFile" | "iconFile"
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const CategoryForm = ({
  editingCategory,
  formData,
  iconPreview,
  error,
  onInputChange,
  onImageChange,
  onSubmit,
  onClose,
}: CategoryFormProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const theme = useTheme();

  // Handler para selecionar um ícone pré-definido
  const handlePredefinedIconSelect = async (iconFileName: string) => {
    setSelectedIcon(iconFileName);
    // Buscar o arquivo da pasta de assets
    const iconUrl = categoryIcons[iconFileName];
    const response = await fetch(iconUrl);
    const blob = await response.blob();
    const file = new File([blob], iconFileName, { type: blob.type });
    // Simular o upload
    onImageChange(
      {
        target: { files: [file] },
      } as any,
      "iconFile"
    );
  };

  return (
    <S.Modal>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>
            {editingCategory ? "Editar Categoria" : "Nova Categoria"}
          </S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.Form onSubmit={onSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="name">Nome da Categoria</S.Label>
            <S.Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Digite o nome da categoria"
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="description">Descrição</S.Label>
            <S.TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Digite a descrição da categoria"
            />
          </S.FormGroup>

          {/* <S.FormGroup>
            <S.Label>Imagem Banner</S.Label>
            <S.ImageLabel>
              <S.ImageButton>
                Escolher Imagem Banner
                <S.ImageInput
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => onImageChange(e, "bannerFile")}
                />
              </S.ImageButton>
              {bannerPreview && (
                <S.ImagePreview>
                  <img src={bannerPreview} alt="Banner preview" />
                </S.ImagePreview>
              )}
            </S.ImageLabel>
          </S.FormGroup> */}

          <S.FormGroup>
            <S.Label>Escolha um de nossos ícones:</S.Label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {Object.keys(categoryIcons).map((icon) => (
                <button
                  type="button"
                  key={icon}
                  style={{
                    border:
                      selectedIcon === icon
                        ? `2px solid ${theme.colors.primary}`
                        : "1px solid #ccc",
                    borderRadius: 8,
                    padding: 4,
                    background: "#fff",
                    cursor: "pointer",
                    outline: "none",
                    boxShadow:
                      selectedIcon === icon
                        ? `0 0 0 2px ${theme.colors.primary}33`
                        : undefined,
                  }}
                  onClick={() => handlePredefinedIconSelect(icon)}
                >
                  <img
                    src={categoryIcons[icon]}
                    alt={icon}
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>
              Ou envie o seu
            </div>
            <S.ImageLabel>
              <S.ImageButton>
                Escolher Imagem Ícone
                <S.ImageInput
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => {
                    setSelectedIcon(null);
                    onImageChange(e, "iconFile");
                  }}
                />
              </S.ImageButton>
              {iconPreview && (
                <S.ImagePreview>
                  <img
                    src={(function () {
                      const iconKey = iconPreview
                        ? iconPreview.split("/").pop()
                        : undefined;
                      return iconKey && categoryIcons[iconKey]
                        ? categoryIcons[iconKey]
                        : iconPreview;
                    })()}
                    alt="Icon preview"
                  />
                </S.ImagePreview>
              )}
            </S.ImageLabel>
          </S.FormGroup>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.Footer>
            <S.SubmitButton type="submit">
              {editingCategory ? "Salvar" : "Criar"}
            </S.SubmitButton>
          </S.Footer>
        </S.Form>
      </S.ModalContent>
    </S.Modal>
  );
};

export default CategoryForm;
