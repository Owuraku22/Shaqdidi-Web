import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import ConfirmPopoverForm from "./confirm-dialog";
<<<<<<< HEAD
import { FoodJoint, Personnel } from "@/lib/api";
=======
>>>>>>> 2a816a8 (Changes to layouts of food others)
import FoodJoints from "./food-joints";

const PopoverForm = ({
  foodJoint,
  personnels,
  children,
}: {
  foodJoint: FoodJoint;
  personnels: Personnel[];
  children: React.ReactNode;
}) => {
  const [openModel, setOpenModel] = useState(false);
  return (
      <Dialog open={openModel} onOpenChange={setOpenModel}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="border-none p-0">
          <FoodJoints foodJoint={foodJoint} personnels={personnels} setOpenModel={setOpenModel} />
        </DialogContent>
      </Dialog>
  );
};


export default PopoverForm;
