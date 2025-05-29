import Caraousel from "./components/home-page/caraaousel";

export default function HomePage() {
return (
  <div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/img/homepage.jpg')" }} // arka plan görseli
>
  {/* Hafif karartma için şeffaf katman */}
  <div className="bg-black/30 min-h-screen flex flex-col justify-between">
    {/* İçerik kısmı */}
    <main className="p-6 text-center">
      <p className="text-3xl font-bold text-white">Ana Sayfa</p>
    </main>

    {/* Tüm genişlikte Carousel alanı */}
    <footer className="w-ful ">
      <div className="w-full p-8">
        <div className="bg-white bg-opacity-80 p-4 rounded-lg w-full">
          <Caraousel />
        </div>
      </div>
    </footer>
  </div>
</div>
  );
}
