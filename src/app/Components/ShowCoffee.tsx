"use client";
import React from "react";
import { Coffeeitem } from "@/types/types";
function ShowCoffee({ id, from, name, coffeecount, message }: Coffeeitem) {
  return (
    <div className="bg-orange-100 shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between ">
        <h2 className="text-sm ml-3 font-bold mb-2 block">Admirer : {name} </h2>
        <p className="text-sm ml-3 font-bold mb-2 block">{from}</p>
        <p className="text-gray-700 mr-3text-sm block font-bold mb-2">
          Coffees:{Number(coffeecount)}
        </p>
      </div>
      <div className="rounded-md border-l-4 border-orange-500 bg-orange-200 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium text-orange-600/80">
              Message: {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCoffee;
