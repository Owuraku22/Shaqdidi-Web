import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrderHistory() {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState('current');
    const isCurrentOrderEmpty = true;

    return (
      <>
        <div className="my-6 p-2 flex text-md font-bold">
          <span
            onClick={() => setIsActive("current")}
            className={`${
              isActive === "current"
                ? "bg-primary-foreground text-primary"
                : "bg-inherit shadow-sm"
            } block  py-2 px-4 rounded-full cursor-pointer`}
          >
            Current Order
          </span>
          <span
            onClick={() => setIsActive("previous")}
            className={`${
              isActive === "previous"
                ? "bg-primary-foreground text-primary"
                : "bg-inherit shadow-sm"
            } block py-2 px-4 rounded-full cursor-pointer`}
          >
            Previous Orders
          </span>
        </div>
        {isCurrentOrderEmpty ? (
          <div className="flex flex-col justify-center items-center gap-4 py-10">
            <img
              src={"/no-history.png"}
              alt="no order history"
              width={200}
              height={200}
            />
            <p className="mb-2 text-sm text-center">
              You have no order.{" "}
              <span className="text-slate-800 font-bold">Go Home</span> and make
              an Order
            </p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        ) : (
          <div className="w-1/3 shadow-md rounded-l-2xl rounded-r-2xl">
            <div className="object-cover rounded-l-2xl rounded-r-2xl">
              <img
                src="/food.png"
                className="w-full object-fit object-center "
              />
            </div>
            <div className="p-4 space-y-1">
              <h1 className="text-xl">Daavi's Special Gob3</h1>
              <p className="text-gray-500 text-sm flex justify-between">
                <span>Haatso Station</span>
                <span>
                  Status: <span className="text-yellow-600">Pending</span>
                </span>
              </p>
              <p className="text-gray-500 text-sm flex justify-between">
                <span className="font-bold">GHC 43.00</span>
                <span>03/10/2024</span>
              </p>
            </div>
          </div>
        )}
      </>
    );
}