// import UI components
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductList } from "../components/ProductList";
import { useAuthContext } from "../utils/AuthContext";
import { useMerchantContext } from "../utils/MerchantContext";

export function ProductsPage() {
  const { loggedInUser } = useAuthContext();
  const { merchant } = useMerchantContext();
  const [products, setProducts] = useState("");
  useEffect(() => {
    if (!loggedInUser) {
      axios
        .get("/products")
        .then((res) => res.data.data)
        .then((data) => {
          setProducts(data);
        });
    } else {
      axios
        .get(`/merchants/${merchant._id}/stock/products`)
        .then((res) => res.data.data)
        .then((data) => {
          console.log(data);
          setProducts(data);
        });
    }
  }, []);
  return (
    <>
      <h1>PRODUCTS</h1>
      <ProductList products={products} />
    </>
  );
}
