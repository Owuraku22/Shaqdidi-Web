import { Outlet } from "react-router-dom";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import { ScrollArea } from "../ui/scroll-area";

export default function Layout() {
  return (
    <section className="fixed flex w-full h-screen">
        {/* SIDE BAR*/}
        <aside className="hidden lg:block flex-1 px-4">
            <div className="p-4 flex justify-between md:justify-center items-center w-full">
                <h2 className="text-xl font-bold md:hidden block text-left">ShaQ D|D|</h2>
                <div className="lg:flex items-center space-x-4 md:block hidden">
                    <img src="/logo.svg" alt="ShaQ D|D" className="h-24" />
                </div>
            </div>
            <Menu /> {/* SIDE MENU */}
        </aside>
        <div className="lg:flex-[5] xl:flex-[6] 2xl:flex-[7] w-full bg-white">
            {/** NAV BAR */}
            <Navbar />

            {/** MAIN CONTENT */}
            <main className="w-full h-screen p-4 lg:px-8 text-slate-900">
                <ScrollArea className="w-auto h-screen whitespace-nowrap pb-24">
                    <Outlet />
                </ScrollArea>
            </main>
        </div>
    </section>
  );
}
