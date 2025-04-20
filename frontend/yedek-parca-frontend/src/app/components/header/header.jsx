"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { MegaMenu } from "primereact/megamenu";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import getMenuItems from "@/helpers/data/menuItem";
import { checkNewUserAlert } from "@/service/userService";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [hasNewUsers, setHasNewUsers] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const menuRef = useRef(null);

  const email = session?.user?.email || "";
  const roleList = session?.user?.roles || [];
  const isAdmin = roleList.includes("ROLE_ADMIN");
  const userRole = roleList.length > 0 ? roleList[0].replace("ROLE_", "") : "";
  const isLoggedIn = status === "authenticated";

  // ✅ Sonsuz döngüyü önlemek için useCallback ile sabit referanslı logout
  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/auth/login" });
  }, []);

  // 🔔 Yeni kullanıcı kontrolü
  useEffect(() => {
    const fetchNewUserStatus = async () => {
      if (!isAdmin) return;
      try {
        const result = await checkNewUserAlert();
        console.log("🚨 Yeni kullanıcı var mı:", result);
        setHasNewUsers(result);
      } catch (e) {
        console.log("Yeni kullanıcı sorgusu başarısız");
      }
    };

    fetchNewUserStatus();
  }, [isAdmin]);

  // 📦 Menü verisini güncelle
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

  // 🔧 Menüde focus problemi varsa blur et
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

  // 🔁 Menüde path varsa router.push olarak setle
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
        <h1
          className="text-2xl font-bold text-red-500 cursor-pointer"
          onClick={() => router.push("/")}
        >
          {/* Logo veya başlık yeri */}
        </h1>

        <MegaMenu
          ref={menuRef}
          model={updatedItems}
          breakpoint="960px"
          className="bg-smoke-600 text-yellow-500"
        />
      </div>
    </header>
  );
};

export default Header;
