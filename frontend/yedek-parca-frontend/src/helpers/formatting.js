// ₺ sembollü TL formatı
export const formatCurrencyWithSymbol = (value) => {
    return value?.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  };
  
  // Sadece sayısal TL formatı (örneğin 1.500,00)
  export const formatCurrencyPlain = (value) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(value);
  };
  
  