"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { MegaMenu } from "primereact/megamenu";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import getMenuItems from "@/helpers/data/menuItem";
import { checkNewUserAlert } from "@/service/userService";
import { InputText } from "primereact/inputtext";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [hasNewUsers, setHasNewUsers] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const menuRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const email = session?.user?.email || "";
  const roleList = session?.user?.roles || [];
  const isAdmin = roleList.includes("ROLE_ADMIN");
  const userRole = roleList.length > 0 ? roleList[0].replace("ROLE_", "") : "";
  const isLoggedIn = status === "authenticated";

  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/auth/login" });
  }, []);

  useEffect(() => {
    const fetchNewUserStatus = async () => {
      if (!isAdmin) return;
      try {
        const result = await checkNewUserAlert();
        setHasNewUsers(result);
      } catch (e) {
        console.log("Yeni kullanıcı sorgusu başarısız");
      }
    };

    fetchNewUserStatus();
  }, [isAdmin]);

  useEffect(() => {
    const items = getMenuItems(
      isLoggedIn,
      handleLogout,
      userRole,
      email,
      hasNewUsers
    );
    setMenuItems(items);
  }, [isLoggedIn, handleLogout, userRole, email, hasNewUsers]);

  useEffect(() => {
    const fixMenuFocus = () => {
      const active = document.activeElement;
      if (active && active.closest(".p-megamenu")) {
        active.blur();
      }
    };

    const timer = setTimeout(fixMenuFocus, 300);
    return () => clearTimeout(timer);
  }, [hasNewUsers]);

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
    <header className="bg-blue-300 text-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-9">
          {/* <div className="bg-white p-1  shadow-md">
            <Image
              src="/img/denoto-logo.webp"
              alt="Den Oto Logo"
              fill
              className="cursor-pointer"
              priority
              onClick={() => router.push("/")}
            />
          </div> */}

          {/* Search bar */}
          <span className="p-input-icon-left">
            <i className="  rounded-md align-items-left " />
            <InputText
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Arama..."
              className="w-72 h-10 border-none rounded-md shadow-md px-3 text-color-red-600"
              type="text"
              style={{ color: "black" }}
            />
          </span>
        </div>

        {/* Menü */}
        <MegaMenu
          ref={menuRef}
          model={updatedItems}
          breakpoint="960px"
          className="bg-blue-300 text-white"
        />
      </div>
    </header>
  );
};

export default Header;
