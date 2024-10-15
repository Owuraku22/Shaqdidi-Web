import { useLocation } from "react-router-dom"
import { Icons } from "./icons/icons";


export default function Navbar() {
    let { pathname } = useLocation();

    return(
    <nav className="flex justify-between items-center p-4 shadow-sm">
        <h1 className="text-primary text-xl">
            { pathname === "/" && "Home"}
            { pathname === "/order-history" && "Order History"}
            { pathname === "/nsps" && "NSPs"}
        </h1>
        <div className="flex gap-4 items-center">
            <span> <Icons.Notification /> </span>
            <div className="w-8 h-8 bg-primary rounded-full text-center pt-1 cursor-pointer">IA</div>
            <span className="lg:hidden text-black text-xl"> &#9776; </span>
        </div>
    </nav>
    )
}