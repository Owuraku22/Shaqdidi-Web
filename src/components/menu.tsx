import { Link } from "react-router-dom";
import { Icons } from "@/components/icons/icons";
import { useLocation } from "react-router-dom";

const menu = [
    {
        label: "Home",
        url: "/ps",
        icon: <Icons.Home /> ,
        active: true
    },
    {
        label: "Order History",
        url: "/ps/order-history",
        icon: <Icons.Time /> ,
        active: false,
    },
]

export default function Menu() {
    let { pathname } = useLocation();

    return(
        <ul className="flex flex-col gap-2">
        {
            menu.map(menu => (
            <Link to={menu.url}>
                <li className={`${ pathname === menu.url
                 ? "bg-primary-foreground text-primary" 
                 : "text-slate-900 hover:bg-gray-200"
                 } flex items-center gap-2 px-2 rounded py-3 text-[.9em]`}
                 >
                    <span className="size-6 block"> { menu.icon } </span>
                    <span> { menu.label } </span>
                </li>
            </Link>
            ))
        }
            <li 
                className={`text-slate-900 hover:bg-gray-200 flex items-center gap-2 cursor-pointer px-2 rounded py-3 text-[.9em]`}>
                <span className="size-6 block"> <Icons.Logout /> </span>
                Logout
            </li>
        </ul>
    )
}