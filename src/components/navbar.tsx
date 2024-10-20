import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Icons } from "./icons/icons";

export default function Navbar() {
  let { pathname } = useLocation();

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      <h1 className="text-primary text-xl">
        {pathname === "/ps" && "Home"}
        {pathname === "/ps/order-history" && "Order History"}
      </h1>
      <div className="flex gap-2 items-center">
        <span>
          {" "}
          <Icons.Notification />{" "}
        </span>
        <div className="w-10 h-10 bg-primary rounded-full text-center pt-2 cursor-pointer">
          IA
        </div>
      </div>
    </nav>
  );
  );
}

