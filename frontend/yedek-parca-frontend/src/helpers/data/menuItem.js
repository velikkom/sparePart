const getMenuItems = (
  isLoggedIn,
  handleLogout,
  userRole,
  email,
  hasNewUsers = false
) => {
  const items = [
    { label: "Anasayfa", icon: "pi pi-home", path: "/" },
  ];

  // 📦 Ürün işlemleri (herkes erişebilir)
  items.push({
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
  });

  // 🧾 Stok Takibi
  items.push({
    label: "Stok Takibi",
    icon: "pi pi-clock",
    items: [[{ items: [{ label: "Stok Görüntüle", path: "/stock" }] }]],
  });

  // 👤 PLASIYER MENÜLERİ
  if (isLoggedIn && userRole === "PLASIYER") {
    items.push({
      label: "Plasiyer İşlemleri",
      icon: "pi pi-users",
      items: [
        [
          {
            items: [
              { label: "Tahsilat Ekle/Listesi", path: "/plasiyer/tahsilat" },
              { label: "Firma Listesi", path: "/plasiyer/firmalar" },
              { label: "Harcama Takibi", path: "/plasiyer/harcamalar" }, // ✅
            ],
          },
        ],
      ],
    });
  }

  // 🛠️ ADMIN MENÜLERİ
  if (isLoggedIn && userRole === "ADMIN") {
    items.push(
      {
        label: "Tahsilatlar",
        icon: "pi pi-wallet",
        items: [
          [
            {
              items: [
                { label: "Tahsilat Listesi", path: "/admin/tahsilatlar" },
              ],
            },
          ],
        ],
      },
      {
        label: "Harcamalar",
        icon: "pi pi-money-bill",
        items: [
          [
            {
              items: [
                { label: "Harcama Listesi", path: "/admin/harcamalar" },
              ],
            },
          ],
        ],
      },
      {
        label: "Firma",
        icon: "pi pi-briefcase",
        items: [
          [
            {
              items: [
                { label: "Firma Ekle-Güncelle", path: "/firms" },
                { label: "Firma Yükle", path: "/admin/firma-yukle" },
              ],
            },
          ],
        ],
      }
    );

    const adminPanelLabel = hasNewUsers ? "Admin Paneli 🔔" : "Admin Paneli";
    items.push({
      label: adminPanelLabel,
      icon: "pi pi-cog",
      path: "/admin/users",
      style: hasNewUsers ? { fontWeight: "bold", color: "#ff4444" } : undefined,
    });
  }

  // 👤 Kullanıcı oturum menüsü
  if (isLoggedIn && email) {
    items.push({
      label: `${email}`,
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
    // Giriş yapılmamışsa
    items.push({
      label: "Giriş Yap",
      icon: "pi pi-sign-in",
      path: "/auth/login",
    });
  }

  return items;
};

export default getMenuItems;
