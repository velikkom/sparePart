"use client";

import React, { useEffect, useState } from "react";
import { MegaMenu } from "primereact/megamenu";
import { useRouter } from "next/navigation";
import getMenuItems from "@/helpers/data/menuItem";
import useAuth from "@/helpers/hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { role: userRole, email } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  const menuItems = getMenuItems(isLoggedIn, handleLogout, userRole, email);

  const updatedItems = menuItems.map((item) => ({
    ...item,
    command: item.path ? () => router.push(item.path) : item.command,
    items: item.items?.map((column) =>
      column.map((menu) => ({
        ...menu,
        items: menu.items?.map((subMenu) => ({
          ...subMenu,
          command: subMenu.path
            ? () => router.push(subMenu.path)
            : subMenu.command,
        })),
      }))
    ),
  }));

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
        {/* Sol taraf - Başlık */}
        <h1
          className="text-2xl font-bold text-red-500 cursor-pointer"
          onClick={() => router.push("/")}
        >
         
        </h1>

        {/* Orta - Menü */}
        <MegaMenu
          model={updatedItems}
          breakpoint="960px"
          className="bg-smoke-600 text-yellow-500"
        />

        {/* Sağ taraf - Kullanıcı ve Logout */}
        {isLoggedIn && email && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">👤 {email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
