import { Outlet } from "react-router-dom";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import { ScrollArea } from "../ui/scroll-area";

export default function Layout() {
  return (
    <section className="fixed flex w-full h-screen">
      {/* SIDE BAR*/}
      <div className="hidden lg:block flex-1 px-4">
        <div className="py-10"></div>
        <Menu />
      </div>
      <div className=" lg:flex-[5] xl:flex-[6] 2xl:flex-[7] w-full bg-white">
        {/** NAV BAR */}
        <Navbar />

        {/** MAIN CONTENT */}
        <main className="w-full h-screen p-4 text-slate-900">
          <ScrollArea className="w-auto h-screen whitespace-nowrap rounded-md pb-24">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </section>
  );
}
