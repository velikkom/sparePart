import React from "react";
import ProductItem from "./ProductItem";


const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return <p>Hiç ürün bulunamadı.</p>;
    }

    return (
        <div className="grid">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
