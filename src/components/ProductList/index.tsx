import { useGetProductsQuery } from "@/services/api/productsApi";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div>Carregando Produtos</div>;
  }
  return (
    <>
      {data?.map((product, index) => (
        <div key={index}>{product.name}</div>
      ))}
      <div>ProduactList</div>
    </>
  );
};

export default ProductList;
