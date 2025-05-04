import Swal from "sweetalert2";
import { deleteCollection } from "@/service/collectionService";

export const handleDeleteCollection = async (id, refreshList) => {
  const result = await Swal.fire({
    title: "Silmek istediğinize emin misiniz?",
    text: "Bu işlem geri alınamaz!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet, sil!",
    cancelButtonText: "Vazgeç",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteCollection(id);

    await Swal.fire({
      title: "Silindi!",
      text: "Tahsilat başarıyla silindi.",
      icon: "success",
    });

    if (typeof refreshList === "function") {
      refreshList();
    }
  } catch (error) {
    console.error("Silme hatası:", error);
    await Swal.fire({
      title: "Hata!",
      text: "Silme işlemi başarısız oldu.",
      icon: "error",
    });
  }
};
