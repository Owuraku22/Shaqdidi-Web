import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrderHistoryEmpty() {
    const navigate = useNavigate();
    
    return(
    <div className="flex flex-col justify-center items-center gap-4 py-10">
        <img src={'/no-history.png'} alt="no order history" width={200} height={200} />
        <p className="mb-2 text-sm text-center">You have no order. <span className="text-slate-800 font-bold">Go Home</span> and make an Order</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
    )
}