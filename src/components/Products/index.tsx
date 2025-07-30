import { useState, useEffect } from "react";
import * as S from "./styles";
import {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useSetPrimaryImageMutation,
  useDeleteProductMutation,
  useAddProductImagesMutation,
  useDeleteProductImageMutation,
} from "../../services/api/productsApi";
import type { Product, ProductImage } from "../../services/api/productsApi";
import { useGetCategoriesQuery } from "../../services/api/productCategoriesApi";
import { useSubscriptionError } from "../../hooks/useSubscriptionError";
import Swal from "sweetalert2";
import ProductOptions from "../ProductOptions";
import ProductOptionsModal from "../ProductOptionsModal";
import ValueEditModal from "../ProductOptionsModal/ValueEditModal";
import OptionEditModal from "../ProductOptionsModal/OptionEditModal";
import { useDetachOptionFromProductMutation } from "../../services/api/productOptionsApi";
import type {
  ProductOption,
  OptionValue,
} from "../../services/api/productOptionsApi";
import ProductAddons from "../ProductAddons";
import ProductAddonCreateModal from "../ProductAddons/ProductAddonCreateModal";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_id: "",
    images: [] as File[],
  });
  const [error, setError] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [updatingPrimaryImage, setUpdatingPrimaryImage] = useState<
    number | null
  >(null);
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Estados para o modal de opções
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [detachOptionFromProduct] = useDetachOptionFromProductMutation();

  // Estados para o modal de edição de valores
  const [isValueEditModalOpen, setIsValueEditModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<{
    optionId: number;
    value: OptionValue;
  } | null>(null);

  // Estados para o modal de edição de opção principal
  const [isOptionEditModalOpen, setIsOptionEditModalOpen] = useState(false);
  const [editingOptionMain, setEditingOptionMain] =
    useState<ProductOption | null>(null);

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: productDetails,
    isLoading: isLoadingProductDetails,
    refetch: refetchProductDetails,
  } = useGetProductQuery(editingProduct?.id || 0, {
    skip: !editingProduct,
    refetchOnMountOrArgChange: true,
  });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [setPrimaryImage] = useSetPrimaryImageMutation();
  const [addProductImages] = useAddProductImagesMutation();
  const [deleteProductImage] = useDeleteProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Verificar erros de assinatura
  useSubscriptionError(productsError);
  useSubscriptionError(categoriesError);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id?.toString() === selectedCategory)
    : products;

  // Atualizar as imagens quando os detalhes do produto forem carregados
  useEffect(() => {
    if (productDetails) {
      setExistingImages(productDetails.images || []);
      console.log("ProductDetails updated:", productDetails);
      console.log("ProductDetails.options:", productDetails.options);
      console.log(
        "ProductDetails.options length:",
        productDetails.options?.length
      );
    }
  }, [productDetails]);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description || "",
        price: editingProduct.price.toString(),
        stock_quantity: editingProduct.stock_quantity.toString(),
        category_id: editingProduct.category_id.toString(),
        images: [],
      });
      setImagePreviews([]);
    }
  }, [editingProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));

    // Create previews
    const previews = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    );
    setImagePreviews(previews);

    // If editing a product, upload images immediately
    if (editingProduct) {
      try {
        const result = await addProductImages({
          productId: editingProduct.id,
          images: files,
        }).unwrap();

        setExistingImages(result.images || []);
        setImagePreviews([]);
      } catch (error) {
        setError("Falha ao fazer upload das imagens");
      }
    }
  };

  // Limpar as previews quando o componente for desmontado
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handlePrimaryImageChange = async (imageId: number) => {
    if (!editingProduct) return;

    try {
      setUpdatingPrimaryImage(imageId);
      const result = await setPrimaryImage({
        productId: editingProduct.id,
        imageId: imageId,
      }).unwrap();

      // Atualizar o estado com o produto atualizado
      setExistingImages(result.images || []);
    } catch (error) {
      console.error("Error updating primary image:", error);
      setError("Falha ao atualizar imagem principal");
    } finally {
      setUpdatingPrimaryImage(null);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!editingProduct) return;

    if (!window.confirm("Tem certeza que deseja excluir esta imagem?")) {
      return;
    }

    setDeletingImageId(imageId);

    try {
      const result = await deleteProductImage({
        productId: editingProduct.id,
        imageId,
      }).unwrap();

      setExistingImages(result.images || []);
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Falha ao excluir imagem");
    } finally {
      setDeletingImageId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock_quantity ||
      !formData.category_id
    ) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("stock_quantity", formData.stock_quantity);
      submitData.append("category_id", formData.category_id);

      // Adicionar imagens ao FormData se estiver criando um novo produto
      if (!editingProduct && formData.images.length > 0) {
        formData.images.forEach((image) => {
          submitData.append("images[]", image);
        });
      }

      if (editingProduct) {
        const result = await updateProduct({
          id: editingProduct.id,
          data: submitData,
        }).unwrap();

        setExistingImages(result.images || []);
      } else {
        const result = await createProduct(submitData).unwrap();
        setExistingImages(result.images || []);
        // SweetAlert2 feedback
        Swal.fire({
          icon: "success",
          title: "Produto adicionado!",
          text: "O produto foi cadastrado com sucesso.",
          timer: 1800,
          showConfirmButton: false,
        });
      }

      setIsModalOpen(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_id: "",
        images: [],
      });
      setImagePreviews([]);
      setExistingImages([]);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Falha ao salvar produto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch {
        setError("Falha ao excluir produto");
      }
    }
  };

  // Handlers para o modal de opções
  const handleOpenOptionsModal = () => {
    setIsOptionsModalOpen(true);
  };

  const handleCloseOptionsModal = () => {
    setIsOptionsModalOpen(false);
  };

  const handleEditOption = (option: ProductOption) => {
    setEditingOptionMain(option);
    setIsOptionEditModalOpen(true);
  };

  const handleDetachOption = async (optionId: number) => {
    if (
      window.confirm("Tem certeza que deseja remover esta opção do produto?")
    ) {
      try {
        await detachOptionFromProduct({
          optionIds: [optionId],
          productId: editingProduct!.id,
        }).unwrap();
        console.log(
          "Opção desassociada com sucesso - fazendo refetch dos dados"
        );
        refetchProducts();
        if (editingProduct) {
          refetchProductDetails();
        }
      } catch (error) {
        console.error("Erro ao desassociar opção:", error);
        alert("Erro ao remover opção do produto");
      }
    }
  };

  const handleOptionsSuccess = () => {
    // O RTK Query já invalida o cache automaticamente
    // Mas vamos fazer um refetch manual para garantir
    console.log("Opção criada/editada com sucesso - fazendo refetch dos dados");

    // Forçar refetch de todos os dados
    refetchProducts();

    if (editingProduct) {
      console.log(
        "Fazendo refetch dos detalhes do produto:",
        editingProduct.id
      );

      // Aguardar um pouco e fazer refetch novamente para garantir
      setTimeout(() => {
        refetchProductDetails();
      }, 100);
    }
  };

  // Handlers para o modal de edição de valores
  const handleEditValue = (optionId: number, value: OptionValue) => {
    setEditingValue({ optionId, value });
    setIsValueEditModalOpen(true);
  };

  const handleCloseValueEditModal = () => {
    setIsValueEditModalOpen(false);
    setEditingValue(null);
  };

  const handleValueEditSuccess = () => {
    // O RTK Query já invalida o cache automaticamente
    // Mas vamos fazer um refetch manual para garantir
    console.log("Valor editado com sucesso - fazendo refetch dos dados");

    // Forçar refetch de todos os dados
    refetchProducts();

    if (editingProduct) {
      console.log(
        "Fazendo refetch dos detalhes do produto:",
        editingProduct.id
      );

      // Aguardar um pouco e fazer refetch novamente para garantir
      setTimeout(() => {
        refetchProductDetails();
      }, 100);
    }
  };

  // Handlers para o modal de edição de opção principal
  const handleCloseOptionEditModal = () => {
    setIsOptionEditModalOpen(false);
    setEditingOptionMain(null);
  };

  const handleOptionEditSuccess = () => {
    // O RTK Query já invalida o cache automaticamente
    // Mas vamos fazer um refetch manual para garantir
    console.log(
      "Opção principal editada com sucesso - fazendo refetch dos dados"
    );

    // Forçar refetch de todos os dados
    refetchProducts();

    if (editingProduct) {
      console.log(
        "Fazendo refetch dos detalhes do produto:",
        editingProduct.id
      );

      // Aguardar um pouco e fazer refetch novamente para garantir
      setTimeout(() => {
        refetchProductDetails();
      }, 100);
    }
  };

  const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
  const [addonRefetchKey, setAddonRefetchKey] = useState(0);

  if (isLoadingProducts || isLoadingCategories) {
    return <div>Carregando...</div>;
  }

  return (
    <S.Container>
      <S.FilterContainer>
        <S.FilterWrapper>
          <S.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Filtrar por categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </S.Select>
        </S.FilterWrapper>
        <S.ButtonWrapper>
          <S.Button className="primary" onClick={() => setIsModalOpen(true)}>
            Adicionar produto
          </S.Button>
        </S.ButtonWrapper>
      </S.FilterContainer>
      <S.Title>Gerencie seus produtos</S.Title>

      {/* Desktop Table */}
      <S.DesktopTable>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                {product.thumbnail && (
                  <S.Thumbnail
                    src={product.thumbnail}
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/50?text=Sem+Imagem";
                    }}
                  />
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.category_name}</td>
              <td>R$ {product.price}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <S.ActionButtons>
                  <S.Button onClick={() => handleEdit(product)}>
                    Editar
                  </S.Button>
                  <S.Button
                    className="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </S.Button>
                </S.ActionButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </S.DesktopTable>

      {/* Mobile Cards */}
      <S.MobileCards>
        {filteredProducts.map((product) => (
          <S.ProductCard key={product.id}>
            <S.CardImage>
              {product.thumbnail && (
                <S.Thumbnail
                  className="card-image"
                  src={product.thumbnail}
                  alt={product.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/100?text=Sem+Imagem";
                  }}
                />
              )}
            </S.CardImage>
            <S.CardContent>
              <S.CardHeader>
                <S.CardTitle>{product.name}</S.CardTitle>
                <S.CardDescription>
                  {product.description || "Sem descrição disponível"}
                </S.CardDescription>
              </S.CardHeader>
              <S.CardInfo>
                <S.Badge variant="category">{product.category_name}</S.Badge>
                <S.Badge variant="price">R$ {product.price}</S.Badge>
                <S.Badge variant="stock">{product.stock_quantity} un</S.Badge>
              </S.CardInfo>
            </S.CardContent>
            <S.CardActions>
              <S.Button onClick={() => handleEdit(product)}>Editar</S.Button>
              <S.Button
                className="danger"
                onClick={() => handleDelete(product.id)}
              >
                Excluir
              </S.Button>
            </S.CardActions>
          </S.ProductCard>
        ))}
      </S.MobileCards>

      {isModalOpen && (
        <S.Modal>
          <S.ModalContent>
            <h2>{editingProduct ? "Editar Produto" : "Adicionar Produto"}</h2>
            {isLoadingProductDetails && editingProduct ? (
              <div>Carregando detalhes do produto...</div>
            ) : (
              <S.Form onSubmit={handleSubmit}>
                <div>
                  <S.Label>Nome *</S.Label>
                  <S.Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <S.Label>Descrição</S.Label>
                  <S.TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição do produto"
                  />
                </div>

                <div>
                  <S.Label>Preço *</S.Label>
                  <S.Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <S.Label>Quantidade em Estoque *</S.Label>
                  <S.Input
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <S.Label>Categoria *</S.Label>
                  <S.Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </S.Select>
                </div>

                <div>
                  <S.Label>Imagens</S.Label>
                  <S.Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  <S.ImagePreview>
                    {/* Mostrar imagens existentes quando estiver editando */}
                    {existingImages.map((image) => (
                      <S.ImageContainer key={`existing-${image.id}`}>
                        <S.ImageCheckbox
                          type="checkbox"
                          checked={image.is_primary === 1}
                          onChange={() => handlePrimaryImageChange(image.id)}
                          disabled={
                            updatingPrimaryImage === image.id ||
                            deletingImageId === image.id
                          }
                        />
                        <S.DeleteButton
                          onClick={() => handleDeleteImage(image.id)}
                          disabled={
                            updatingPrimaryImage === image.id ||
                            deletingImageId === image.id
                          }
                        >
                          ×
                        </S.DeleteButton>
                        <S.ProductImage
                          src={image.full_file_path}
                          alt={`Imagem ${image.id}`}
                          isPrimary={image.is_primary === 1}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://via.placeholder.com/100?text=Erro";
                          }}
                        />
                        {(updatingPrimaryImage === image.id ||
                          deletingImageId === image.id) && (
                          <S.LoadingOverlay>
                            <div>Atualizando...</div>
                          </S.LoadingOverlay>
                        )}
                      </S.ImageContainer>
                    ))}
                  </S.ImagePreview>
                </div>

                {/* Seção de Opções do Produto - apenas quando estiver editando */}
                {editingProduct && (
                  <>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <h4 style={{ margin: 0 }}>Opções do Produto</h4>
                        <button
                          type="button"
                          onClick={() => handleOpenOptionsModal()}
                          style={{
                            backgroundColor: "#EA1D2C",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
                        >
                          + Adicionar Opção
                        </button>
                      </div>

                      {isLoadingProductDetails ? (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#666",
                          }}
                        >
                          Carregando opções do produto...
                        </div>
                      ) : productDetails ? (
                        <ProductOptions
                          productId={editingProduct.id}
                          options={productDetails.options || []}
                          onEditOption={handleEditOption}
                          onDeleteOption={handleDetachOption}
                          onEditValue={handleEditValue}
                        />
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#666",
                          }}
                        >
                          Erro ao carregar opções do produto
                        </div>
                      )}
                    </div>

                    {/* Seção de Addons do Produto */}
                    <div style={{ marginTop: 32 }}>
                      <ProductAddons
                        productId={editingProduct.id}
                        onAddAddonClick={() => setIsAddonModalOpen(true)}
                        key={addonRefetchKey}
                      />
                    </div>
                  </>
                )}

                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

                <S.ModalButtons>
                  <S.Button type="submit" className="primary">
                    {editingProduct ? "Atualizar" : "Criar"}
                  </S.Button>
                  <S.Button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormData({
                        name: "",
                        description: "",
                        price: "",
                        stock_quantity: "",
                        category_id: "",
                        images: [],
                      });
                      setImagePreviews([]);
                      setExistingImages([]);
                      setEditingProduct(null);
                    }}
                  >
                    Cancelar
                  </S.Button>
                </S.ModalButtons>
              </S.Form>
            )}
          </S.ModalContent>
        </S.Modal>
      )}

      {/* Modal de Opções */}
      <ProductOptionsModal
        isOpen={isOptionsModalOpen}
        onClose={handleCloseOptionsModal}
        productId={editingProduct?.id || 0}
        onSuccess={handleOptionsSuccess}
      />

      {/* Modal de Edição de Valores */}
      {editingValue && (
        <ValueEditModal
          isOpen={isValueEditModalOpen}
          onClose={handleCloseValueEditModal}
          optionId={editingValue.optionId}
          value={editingValue.value}
          onSuccess={handleValueEditSuccess}
        />
      )}

      {/* Modal de Edição de Opção Principal */}
      {editingOptionMain && (
        <OptionEditModal
          isOpen={isOptionEditModalOpen}
          onClose={handleCloseOptionEditModal}
          option={editingOptionMain}
          onSuccess={handleOptionEditSuccess}
        />
      )}

      {/* Modal de criar addon (fora de qualquer outro modal) */}
      {editingProduct && (
        <ProductAddonCreateModal
          productId={editingProduct.id}
          isOpen={isAddonModalOpen}
          onClose={() => {
            setIsAddonModalOpen(false);
            setAddonRefetchKey((k) => k + 1); // força refetch do ProductAddons
          }}
        />
      )}
    </S.Container>
  );
}
