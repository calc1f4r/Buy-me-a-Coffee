"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Image from "next/image";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/Consants/Constants";
import ShowCoffee from "./Components/ShowCoffee";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "ethers/utils";

import { Coffeeitem } from "@/types/types";
export default function Page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(1);
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const [coffee, setCoffees] = useState([]) as any;
  const { address, isConnecting } = useAccount();
  let { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCoffees",
  });

  const buyCoffee = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "buyCoffee",
      args: [name, message, price],
      value: parseEther((0.01 * price).toString()),
    });
  };

  if (data == undefined) {
    data = [];
  }

  useEffect(() => {
    if (data) {
      setCoffees(data);
    }
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirming) {
      toast.success("Transcation is getting executed.", {
        style: {
          border: `1px solid #FFC07F`,
          padding: "16px",
          color: `#FFD7AA`,
        },
        iconTheme: {
          primary: `#FFC07F`,
          secondary: `#FFEDD5`,
        },
      });
    } else if (isConfirmed) {
      toast.success("Transaction has been confirmed!");
    }
  }, [isConfirming, isConfirmed]);
  return (
    <main className="blur-bg w-full min-h-screen max-h-full">
      <div>
        <Toaster />
      </div>
      <div className="w-2/3 mx-auto">
        <Navbar />
        <section className="mt-5">
          <div className="flex items-center justify-center">
            <div className="mt-5">
              <p className="text-center text-3xl text-orange-100/70 italic text-semibold">
                Buy Me A Coffee!
              </p>
            </div>
            <Image
              src={"/coffeeMug.png"}
              alt="coffee mug"
              height={50}
              width={50}></Image>
          </div>
          <div className="flex items-center justify-center px-4 py-2 ">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="Name"
                    className="text-base font-medium text-orange-100/70 text-center italic">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="I would love to know your name!"></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-base font-medium text-orange-100/70 items-center italic">
                    {" "}
                    Message
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 
                        rounded-md disabled:cursor-not-allowed disabled:opacity-50 shadow-lg"
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="send me a message along with coffee! "></input>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Image
                    src={"/latte.png"}
                    alt="latte"
                    width={35}
                    height={35}></Image>

                  <span className="text-sm font-extrabold	 text-white/50">
                    X
                  </span>
                  <button
                    className="rounded-full bg-white w-8 h-8 flex items-center justify-center border-1 border-orange-500 border-solid font-semibold transition duration-200 ease-in-out hover:bg-orange-500 hover:text-white hover:scale-105 hover:border-2  "
                    onClick={(e) => {
                      e.preventDefault();
                      setPrice(1);
                    }}>
                    1
                  </button>
                  <button
                    className="rounded-full bg-white w-8 h-8 flex items-center justify-center border-1 border-orange-500 border-solid font-semibold transition duration-200 ease-in-out hover:bg-orange-500 hover:text-white hover:scale-105 hover:border-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      setPrice(2);
                    }}>
                    2
                  </button>
                  <button
                    className="rounded-full bg-white w-8 h-8 flex items-center justify-center border-1 border-orange-500 border-solid font-semibold transition duration-200 ease-in-out hover:bg-orange-500 hover:text-white hover:scale-105 hover:border-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setPrice(5);
                    }}>
                    5
                  </button>
                  <button
                    className="rounded-full bg-white w-8 h-8 flex items-center justify-center border-1 border-orange-500 border-solid font-semibold transition duration-200 ease-in-out hover:bg-orange-500 hover:text-white hover:scale-105 hover:border-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setPrice(10);
                    }}>
                    10
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (address) {
                        buyCoffee();
                      } else {
                        toast.error("Connect to a wallet to buy a coffee!");
                      }
                    }}
                    disabled={isPending}
                    className="inline-flex w-full items-center justify-center px-3.5 py-2.5 font-semibold leading-7 text-white rounded-3xl bg-gradient-to-r from-orange-400 to-orange-500 transition duration-200 ease-in-out hover:bg-orange-600">
                    Buy Me A Coffee for {price} Matics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-3 flex fled-col gap-5 justify-around flex-wrap w-3/4 mx-auto">
          {coffee.map((_coffee: Coffeeitem) => (
            <ShowCoffee
              key={_coffee.id}
              id={_coffee.id}
              from={_coffee.from}
              name={_coffee.name}
              coffeecount={_coffee.coffeecount}
              message={_coffee.message}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
