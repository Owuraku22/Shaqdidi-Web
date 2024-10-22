import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
// import ConfirmPopoverForm from "./confirm-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import FoodJoints from "./food-joints";
type JointData = {
  name: string;
  address: string;
  id: number;
};

const PopoverForm = ({
  value,
  children,
}: {
  value: JointData;
  children: React.ReactNode;
}) => {
  const [openModel, setOpenModel] = useState(false);
  return (
    <div>
      <Dialog open={openModel} onOpenChange={setOpenModel}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="border-none p-0">
          <FoodJoints value={value} setOpenModel={setOpenModel} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopoverForm;
