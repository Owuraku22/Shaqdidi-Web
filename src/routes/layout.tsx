import { Outlet } from "react-router-dom";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";


export default function Layout() {
    return(
    <section className="flex w-full h-full">
        {/* SIDE BAR*/}
        <div className="flex-1 px-4">
            <div className="py-10"></div>
            <Menu />
        </div>
        <div className="flex-[5] w-full bg-foreground">
            {/** NAV BAR */}
            <Navbar />

            {/** MAIN CONTENT */}
            <main className="w-full h-screen p-4 text-slate-900">
                <Outlet />
            </main>
        </div>
    </section>
    )
}