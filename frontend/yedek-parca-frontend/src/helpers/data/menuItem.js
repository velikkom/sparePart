const getMenuItems = (isLoggedIn, handleLogout, userRole, email) => {
  const items = [
    {
      label: "Anasayfa",
      icon: "pi pi-home",
      path: "/",
    },
    {
      label: "Ürün",
      icon: "pi pi-box",
      items: [
        [
          {
            items: [{ label: "Ürün Listesi", path: "/products" }],
          },
          {
            items: userRole === "ADMIN" ? [{ label: "Yeni Ürün Ekle", path: "/products/add" }] : [],
          },
        ],
      ],
    },
    {
      label: "Stok Takibi",
      icon: "pi pi-clock",
      items: [
        [
          {
            items: [{ label: "Stok Görüntüle", path: "/stock" }],
          },
        ],
      ],
    },
    {
      label: "Plasiyer",
      icon: "pi pi-users",
      items: [
        [
          {
            items: [{ label: "Tahsilat Ekle/Listesi", path: "/plasiyer/tahsilat" }],
          },
        ],
      ],
    },
  ];

  // 👤 Giriş yapıldıysa kullanıcı menüsü
  // if (isLoggedIn && email) {
  //   items.push({
  //     label: ` ${email}`,
  //     icon: "pi pi-user",
  //     items: [
  //       [
  //         {
  //           items: [
  //             {
  //               label: "Çıkış Yap",
  //               icon: "pi pi-sign-out",
  //               command: handleLogout,
  //             },
  //           ],
  //         },
  //       ],
  //     ],
  //   });
  // } else {
  //   // Giriş yapılmadıysa
  //   items.push({
  //     label: "Giriş Yap",
  //     icon: "pi pi-sign-in",
  //     path: "/auth/login",
  //   });
  // }

  return items;
};

export default getMenuItems;
