import Swal from "sweetalert2";
import { addCollection, updateCollection } from "@/service/collectionService";

export const resetFormState = () => ({
  firmId: "",
  amount: "",
  collectionDate: "",
  paymentMethod: "",
  receiptNumber: "",
  checkBankName: "",
  checkDueDate: "",
  noteDueDate: "",
});

export const handleChange = (e, setForm) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

export const fillFormWithSelectedCollection = (selectedCollection, setForm, setFirmSearch, setSelectedFirm) => {
  setForm({
    firmId: selectedCollection.firmId || "",
    amount: selectedCollection.amount || "",
    collectionDate: selectedCollection.collectionDate || "",
    paymentMethod: selectedCollection.paymentMethod || "",
    receiptNumber: selectedCollection.receiptNumber || "",
    checkBankName: selectedCollection.checkBankName || "",
    noteDueDate: selectedCollection.noteDueDate || "",
    checkDueDate: selectedCollection.checkDueDate || "",
  });

  if (selectedCollection.firmName) {
    setFirmSearch(selectedCollection.firmName);
    setSelectedFirm({
      id: selectedCollection.firmId,
      name: selectedCollection.firmName,
    });
  }
};

export const handleSubmit = async ({ form, selectedCollection, clearSelection, triggerRefresh, setForm, setFirmSearch, setSelectedFirm }) => {
  if (!form.paymentMethod) {
    return Swal.fire("Hata", "Lütfen ödeme tipini seçin!", "error");
  }

  try {
    if (selectedCollection) {
      await updateCollection(selectedCollection.id, form);
      Swal.fire("Güncellendi", "Tahsilat başarıyla güncellendi", "success");
      clearSelection?.();
    } else {
      await addCollection(form);
      Swal.fire("Eklendi", "Tahsilat başarıyla eklendi", "success");
    }

    triggerRefresh?.();
    setForm(resetFormState());
    setFirmSearch("");
    setSelectedFirm(null);
  } catch (err) {
    let backendMessage = err?.response?.data?.message;

    if (!backendMessage && err?.message?.includes("{")) {
      try {
        const parsed = JSON.parse(err.message.substring(err.message.indexOf("{")));
        backendMessage = parsed.message;
      } catch (parseErr) {
        console.error("JSON parse hatası:", parseErr);
      }
    }

    if (backendMessage) {
      Swal.fire("Hata", backendMessage, "error");
    } else {
      Swal.fire("Hata", "İşlem başarısız oldu. Lütfen tekrar deneyin.", "error");
    }
  }
};
