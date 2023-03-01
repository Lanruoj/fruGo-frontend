// import UI components
import axios from "axios";
import { useEffect, useState } from "react";
import NotLoggedInNavBar from "../NavBar/NotLoggedInNavBar";
import { ProductList } from "./ProductList";

export function ProductsPage() {
  const [products, setProducts] = useState("");
  useEffect(() => {
    axios
      .get("/products")
      .then((res) => res.data.data)
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <>
      <NotLoggedInNavBar />
      <h1>PRODUCTS</h1>
      <ProductList products={products} />
    </>
  );
}
