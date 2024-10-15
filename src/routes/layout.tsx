import { Outlet } from "react-router-dom";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";


export default function Layout() {
    return(
    <section className="flex w-full h-full">
        {/* SIDE BAR*/}
        <div className="hidden lg:block flex-1 px-4">
            <div className="py-10"></div>
            <Menu />
        </div>
        <div className="lg:hidden bg-green-900 fixed z-50 left-0 top-0"></div>
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