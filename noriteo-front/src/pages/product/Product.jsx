import { Routes, Route } from "react-router-dom";
import Container from "@/layouts/container/Container.jsx";

import ProductDetail from "@/components/product/ProductDetail.jsx";
import ProductList from "@/components/product/ProductList.jsx";
import ProductPage from "@/components/product/ProductPage.jsx";
import ProductUpdate from "@/components/product/ProductUpdate.jsx";
import ProductWrite from "@/components/product/ProductWrite.jsx";

const Product = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route element={<Container />}>
        {/* 기본 경로 /product일 때 productList 렌더링 */}
        <Route index element={<ProductList />} />

        <Route path="write" element={<ProductWrite />} />
        <Route path="detail/:productId" element={<ProductDetail />} />
        <Route path="update/:productId" element={<ProductUpdate />} />
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Product;
