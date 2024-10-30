import * as React from "react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHandle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FoodJoints from "./food-joints";
import { ScrollArea } from "../ui/scroll-area";
import { FoodJoint, Personnel, PersonnelResponse, Staff } from "@/lib/api";


export function DrawerForm({
  foodJoint,
  personnels,
  children,
}: {
  foodJoint: FoodJoint;
  personnels: PersonnelResponse;
  children: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[calc(100vh-6rem)] border-none">
        <DrawerHandle className="w-16 h-3 rounded-full bg-gray-300 mb-2"></DrawerHandle>
        <ScrollArea className="overflow-y-auto">
          <FoodJoints
            foodJoint={foodJoint}
            personnels={personnels}
          />
        </ScrollArea>
        <DrawerFooter>
          {/* <Button>Submit</Button> */}
          <DrawerClose asChild>
            <Button className=" bg-transparent text-primary border border-primary mb-2 md:mr-2 md:right-0 hover:bg-primary-foreground">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
