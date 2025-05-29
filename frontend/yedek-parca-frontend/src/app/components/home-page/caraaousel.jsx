"use client";
import React from "react";
import { Carousel } from "primereact/carousel";

const firmalar = [
  { name: "Atak", image: "/img/atak.png" },
  { name: "Ayd", image: "/img/ayd.png" },
  { name: "Oto conta", image: "/img/otoconta.png" }, 
  { name: "Karland", image: "/img/karland.jpeg" },
  { name: "Mospart", image: "/img/mospart.png" },
  { name: "Opar", image: "/img/opar.png" },
  { name: "ESTAŞ", image: "/img/estaş.png" },
  { name: "Sodsan", image: "/img/sodsan.png" },
];

const responsiveOptions = [
  { breakpoint: "1400px", numVisible: 3, numScroll: 1 },
  { breakpoint: "1199px", numVisible: 2, numScroll: 1 },
  { breakpoint: "767px", numVisible: 1, numScroll: 1 },
];

const carouselTemplate = (firma) => {
  return (
    <div className="border-1 surface-border border-round m-2 py-4 px-3 text-center shadow-md bg-white bg-opacity-80 rounded-lg">
      <img
        src={firma.image}
        alt={firma.name}
        className="w-32 h-32 object-contain mx-auto mb-2"
      />
      <p className="font-semibold">{firma.name}</p>
    </div>
  );
};

const Caraousel = () => {
  return (
    <div    
      style={{
        //backgroundImage: "url('/img/homepage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white-100 bg-opacity-80 p-4 rounded-lg w-full mx-auto">
        <Carousel
          value={firmalar}
          numScroll={1}
          numVisible={5}
          responsiveOptions={responsiveOptions}
          itemTemplate={carouselTemplate}
          autoplayInterval={5000}
          circular     
        />
      </div>
    </div>
  );
};

export default Caraousel;
