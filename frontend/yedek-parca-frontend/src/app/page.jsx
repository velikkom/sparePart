import Caraousel from "./components/home-page/caraaousel";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-300">
      <p className="text-3xl font-bold text-center p-6">Ana Sayfa</p>
      <div className="max-w-6xl mx-auto">
        <Caraousel />
      </div>
    </div>
  );
}
