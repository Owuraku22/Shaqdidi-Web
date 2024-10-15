import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OrderHistory() {
    const [isActive, setIsActive] = useState('current');
    const isCurrentOrderEmpty = true;

    return(
    <>
        <div className="my-6 p-2 flex text-md font-bold">
            <span onClick={() => setIsActive('current') } className={`${ isActive === 'current' ? "bg-primary-foreground text-primary" : "bg-inherit shadow-sm"} block  py-2 px-4 rounded-full cursor-pointer`}>Current Order</span>
            <span onClick={() => setIsActive('previous') } className={`${ isActive === 'current' ? "bg-inherit shadow-sm" : "bg-primary-foreground text-primary"} block py-2 px-4 rounded-full cursor-pointer`}>Previous Orders</span>
        </div>
        {
            isCurrentOrderEmpty ? (
                <div className="flex flex-col justify-center items-center gap-4 py-10">
                    <img src={'/no-history.png'} alt="no order history" width={200} height={200} />
                    <p className="mb-2 text-sm w-[200px] text-center">You have no order. <span className="text-slate-800 font-bold">Go Home</span> and make an Order</p>
                    <Button>Go Home</Button>
                </div>
            ) : (
                <p>order card</p>
            )
        }
    </>
    )
}