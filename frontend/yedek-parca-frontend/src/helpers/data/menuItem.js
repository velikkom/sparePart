const getMenuItems = (
  isLoggedIn,
  handleLogout,
  userRole,
  email,
  hasNewUsers = false
) => {
  const items = [
    { label: "Anasayfa", icon: "pi pi-home", path: "/" },

    {
      label: "Ürün",
      icon: "pi pi-box",
      items: [
        [
          { items: [{ label: "Ürün Listesi", path: "/products" }] },
          {
            items:
              userRole === "ADMIN"
                ? [{ label: "Yeni Ürün Ekle", path: "/products/add" }]
                : [],
          },
        ],
      ],
    },

    {
      label: "Stok Takibi",
      icon: "pi pi-clock",
      items: [[{ items: [{ label: "Stok Görüntüle", path: "/stock" }] }]],
    },

    {
      label: "Plasiyer",
      icon: "pi pi-users",
      items: [
        [
          {
            items: [
              { label: "Tahsilat Ekle/Listesi", path: "/plasiyer/tahsilat" },
            ],
          },
        ],
      ],
    },
  ];

  // 🔐 Sadece ADMIN için Firma ve Admin Paneli menüsü
  if (isLoggedIn && userRole === "ADMIN") {
    items.push({
      label: "Firma",
      icon: "pi pi-briefcase",
      items: [
        [
          {
            items: [
              { label: "Tüm Firmalar", path: "/firms" },
              
            ],
          },
        ],
      ],
    });

    const adminPanelLabel = hasNewUsers ? "Admin Paneli 🔔" : "Admin Paneli";

    items.push({
      label: adminPanelLabel,
      icon: "pi pi-cog",
      path: "/admin/users",
      style: hasNewUsers ? { fontWeight: "bold", color: "#ff4444" } : undefined,
    });
  }

  // 👤 Giriş yapıldıysa kullanıcı bilgisi ve çıkış
  if (isLoggedIn && email) {
    items.push({
      label: ` ${email}`,
      icon: "pi pi-user",
      items: [
        [
          {
            items: [
              {
                label: "Çıkış Yap",
                icon: "pi pi-sign-out",
                command: handleLogout,
              },
            ],
          },
        ],
      ],
    });
  } else {
    items.push({
      label: "Giriş Yap",
      icon: "pi pi-sign-in",
      path: "/auth/login",
    });
  }

  return items;
};

export default getMenuItems;
