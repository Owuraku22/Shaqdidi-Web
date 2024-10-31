import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import ConfirmPopoverForm from "./confirm-dialog";
import { FoodJoint, Personnel, PersonnelResponse } from "@/lib/api";
import FoodJoints from "./order-food";

const PopoverForm = ({
  foodJoint,
  personnels,
  children,
}: {
  foodJoint: FoodJoint;
  personnels: PersonnelResponse;
  children: React.ReactNode;
}) => {
  const [openModel, setOpenModel] = useState(false);
  console.log(foodJoint)

  return (
    <Dialog open={openModel} onOpenChange={setOpenModel}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="border-none p-0">
        <FoodJoints
          foodJoint={foodJoint}
          personnels={personnels}
          setOpenModel={setOpenModel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PopoverForm;
