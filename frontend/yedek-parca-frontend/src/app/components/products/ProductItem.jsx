import React from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";

const ProductItem = ({ product }) => {
    const getSeverity = () => {
        if (product.stock > 10) {
            return "success";
        } else if (product.stock > 0) {
            return "warning";
        } else {
            return "danger";
        }
    };

    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 border-bottom-1 surface-border">
                <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                    <div className="text-2xl font-bold text-900">{product.name}</div>
                    <Rating value={product.rating} readOnly cancel={false}></Rating>
                    <div className="flex align-items-center gap-3">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </span>
                        <Tag value={product.stock > 0 ? "Mevcut" : "Tükenmiş"} severity={getSeverity()}></Tag>
                    </div>
                </div>
                <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                    <span className="text-2xl font-semibold">{product.price} ₺</span>
                    <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.stock === 0}></Button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
