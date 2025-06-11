import FirmaDetayPage from "@/app/components/plasiyer/firm-detail-page/firm-detail-page";


const FirmaDetayRoutePage = async ({ params }) => {
  const firmId = params.firmId;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Firma Detay Sayfası</h2>
      <FirmaDetayPage firmId={firmId} />
    </div>
  );
};

export default FirmaDetayRoutePage;
