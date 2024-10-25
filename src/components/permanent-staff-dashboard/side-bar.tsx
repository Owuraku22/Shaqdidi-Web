import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Menu from "@/components/menu";

export function SheetSide() {
  return (
    <aside className="lg:hidden grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="border-none p-0 text-xl">
            &#9776;
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <div className="p-4 flex justify-between md:justify-center items-center w-full">
              <div className="flex items-center space-x-4">
                <img src={"/logo.svg"} alt="ShaQ D|D" className="h-24" />
              </div>
            </div>
          </SheetHeader>

          <Menu />
        </SheetContent>
      </Sheet>
    </aside>
  );
}
