
const items = [
    {
        label: "Anasayfa",
        icon: "pi pi-home",
        path: "/" // Sadece path tanımlandı
    },
    {
        label: "Ürün",
        icon: "pi pi-box",
        items: [
            [
                {
                    // label: "Tüm Ürünler",
                    items: [{ label: "Ürün Listesi", path: "/urun-katalogu" }]
                },
                {
                    // label: "Ürün Ekle",
                    items: [{ label: "Yeni Ürün Ekle", path: "/products/add" }]
                }
            ]
        ]
    },
    {
        label: "Stok Takibi",
        icon: "pi pi-clock",
        items: [
            [
                {
                    // label: "Stok Raporu",
                    items: [{ label: "Stok Görüntüle", path: "/stock" }]
                }
            ]
        ]
    }
];

export default items;
