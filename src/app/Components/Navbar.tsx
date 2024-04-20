"use Client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="flex items-center justify-between p-2">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/coffee_icon.png"}
            alt="coffee icon"
            height={30}
            width={30}
          />
          <span className="italic font-medium text-orange-100/70">
            Buy me a coffee
          </span>
        </Link>
      </div>
      <w3m-button />
    </nav>
  );
}

export default Navbar;
