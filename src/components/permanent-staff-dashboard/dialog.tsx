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
import { toast } from "@/hooks/use-toast";
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
type JointData = {
  name: string;
  address: string;
  id: number;
};
const formSchema = z.object({
  amount: z.string().min(2).max(50),
  note: z.string().min(2).max(500),
  personnel: z.string().min(1),
});

const PopoverForm = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: JointData;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      note: "",
      personnel: "",
    },
  });

 const [confirm, setConfirm] = useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if(confirm){
       toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    }
    setConfirm(true)
   
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="border-none p-0">
          <div
            className="relative w-auto h-[12em] md:h-[15em] flex  bg-no-repeat bg-cover rounded-t-none  md:rounded-t-[0.5em]"
            style={{
              backgroundImage: `url('/wakye.jpg')`,
            }}
          >
            <div className="hidden md:flex flex-col absolute bottom-0 py-3 px-8 w-full bg-black bg-opacity-50 text-white">
              <h2 className="font-extrabold text-3xl lg:text-3xl  text-white">
                {value.name}
              </h2>
              <span className="pt-2 w-[17rem] lg:w-[22em] text-slate-200 text-xl font-roboto font-light">
                {value.address}
              </span>
            </div>
          </div>
          <div className=" md:hidden pt-3 px-4  text-black">
            <h2 className="font-extrabold text-xl lg:text-3xl  ">
              {value.name}
            </h2>
            <span className="pt-6 text-slate-600 text-sm">{value.address}</span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 m-4 "
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-xl px-0 md:px-4">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the Amount you want to buy"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-xl px-0 md:px-4">
                      Leave a Note
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any Special instructions or requests"
                        {...field}
                        className="h-[10em] text-start bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personnel"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-primary text-xl px-0 md:px-4">
                      Select available Personnel
                    </FormLabel>
                    <FormLabel className="text-[1em] px-0 md:px-4">
                      Select available Personnel
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-white text-black">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse md:flex-row gap-2 w-full md:justify-end">
                <DialogClose asChild> 
                  <Button className=" bg-transparent text-primary border border-primary mb-2 md:mr-2 md:right-0 hover:text-white">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {confirm ? "Confirm" : "Order Now"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default PopoverForm;
