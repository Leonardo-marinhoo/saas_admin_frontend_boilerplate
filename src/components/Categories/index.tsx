import { useState, useEffect } from "react";
import * as S from "./styles";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../services/api/productCategoriesApi";
import type {
  Category,
  UpdateCategoryRequest,
} from "../../services/api/productCategoriesApi";
import CategoryForm from "../CategoryForm";
import { FaThLarge } from "react-icons/fa";
import { useTheme } from "styled-components";

export default function Categories() {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bannerFile: null as File | null,
    iconFile: null as File | null,
  });
  const [error, setError] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  // Estados para controlar a visibilidade das imagens do card
  const [iconLoadError, setIconLoadError] = useState<{
    [key: number]: boolean;
  }>({});

  // Resetar os estados de erro quando as categorias mudarem
  useEffect(() => {
    setIconLoadError({});
  }, [categories]);

  const handleImageError = (categoryId: number, type: "banner" | "icon") => {
    if (type === "banner") {
      // setBannerLoadError((prev) => ({ ...prev, [categoryId]: true })); // This line was removed
    } else {
      setIconLoadError((prev) => ({ ...prev, [categoryId]: true }));
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        bannerFile: null,
        iconFile: null,
      });
      setBannerPreview(category.banner_image);
      setIconPreview(category.icon_image);
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        bannerFile: null,
        iconFile: null,
      });
      setBannerPreview(null);
      setIconPreview(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      bannerFile: null,
      iconFile: null,
    });
    setBannerPreview(null);
    setIconPreview(null);
    setError("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "bannerFile" | "iconFile"
  ) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [type]: file }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "bannerFile") {
        setBannerPreview(reader.result as string);
      } else {
        setIconPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (editingCategory) {
        // Para atualização, só enviamos os arquivos se eles foram alterados
        const updateData: UpdateCategoryRequest = {
          name: formData.name,
          description: formData.description || undefined,
        };

        // Só adiciona os arquivos se eles foram alterados (não são null)
        if (formData.bannerFile) {
          updateData.bannerFile = formData.bannerFile;
        }
        if (formData.iconFile) {
          updateData.iconFile = formData.iconFile;
        }

        await updateCategory({
          id: editingCategory.id,
          data: updateData,
        }).unwrap();
      } else {
        // Para criação, enviamos todos os dados
        await createCategory({
          name: formData.name,
          description: formData.description || undefined,
          bannerFile: formData.bannerFile || undefined,
          iconFile: formData.iconFile || undefined,
        }).unwrap();
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError("Erro ao salvar categoria. Tente novamente.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await deleteCategory(id).unwrap();
      } catch {
        setError("Erro ao excluir categoria. Tente novamente.");
      }
    }
  };

  if (isLoading) return <div>Carregando categorias...</div>;

  const theme = useTheme();

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categorias</S.Title>
        <S.AddButton onClick={() => handleOpenModal()}>
          Nova Categoria
        </S.AddButton>
      </S.Header>

      <S.Grid>
        {categories.map((category) => (
          <S.Card key={category.id}>
            <S.CardBanner>
              <S.CategoryNavTitle>
                Como os clientes verão no seu cardápio:
              </S.CategoryNavTitle>
              <S.CategoryNavMock>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontWeight: 500,
                    color: theme.colors.primary,
                  }}
                >
                  <FaThLarge size={20} color={theme.colors.primary} /> Todos
                </span>
                <span style={{ color: "#ddd", fontWeight: 700 }}>|</span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontWeight: 500,
                  }}
                >
                  {category.icon_image && (
                    <img
                      src={category.icon_image}
                      alt={category.name + " icon"}
                      style={{
                        width: 20,
                        height: 20,
                        objectFit: "contain",
                        borderRadius: 4,
                      }}
                    />
                  )}
                  {category.name}
                </span>
              </S.CategoryNavMock>
              <S.CategoryNavOverlay />
            </S.CardBanner>
            <S.CardContent>
              {category.icon_image && !iconLoadError[category.id] && (
                <S.CardIcon>
                  <S.IconImage
                    src={category.icon_image}
                    alt={`${category.name} icon`}
                    onError={() => {
                      handleImageError(category.id, "icon");
                    }}
                  />
                </S.CardIcon>
              )}
              <S.CardHeader>
                <S.CardTitle>{category.name}</S.CardTitle>
                <S.CardActions>
                  <S.ActionButton onClick={() => handleOpenModal(category)}>
                    Editar
                  </S.ActionButton>
                  <S.ActionButton
                    className="delete"
                    onClick={() => handleDelete(category.id)}
                  >
                    Excluir
                  </S.ActionButton>
                </S.CardActions>
              </S.CardHeader>
              {category.description && (
                <S.CardDescription>{category.description}</S.CardDescription>
              )}
            </S.CardContent>
          </S.Card>
        ))}
      </S.Grid>

      {isModalOpen && (
        <CategoryForm
          editingCategory={editingCategory}
          formData={formData}
          bannerPreview={bannerPreview}
          iconPreview={iconPreview}
          error={error}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </S.Container>
  );
}
