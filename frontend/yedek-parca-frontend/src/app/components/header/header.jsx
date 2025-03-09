"use client";

import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { useRouter } from "next/navigation";
import items from "@/helpers/data/menuItem";


const Header = () => {
  const router = useRouter();

  // Menü öğelerine dinamik olarak command ekle
  const updatedItems = items.map((item) => ({
    ...item,
    command: item.path ? () => router.push(item.path) : undefined, // Ana menü için yönlendirme
    items: item.items?.map((column) =>
      column.map((menu) => ({
        ...menu,
        items: menu.items?.map((subMenu) => ({
          ...subMenu,
          command: subMenu.path ? () => router.push(subMenu.path) : undefined, // Alt menü için yönlendirme
        })),
      }))
    ),
  }));

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <h1
          className="text-2xl  font-bold text-red-500 cursor-pointer mb-4 lg:mb-0"
          onClick={() => router.push("/")}
        >
          Plasiyer Paneli
        </h1>

        <MegaMenu
          model={updatedItems}
          breakpoint="960px"
          className="bg-smoke-600 text-yellow-500"
         
        />
      </div>
    </header>
  );
};

export default Header;
