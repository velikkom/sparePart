import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-9">
      <Image
        src="/img/denoto-logo.webp"
        alt="Den Oto Logo"
        width={120}
        height={400}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  );
}

export default Logo;
