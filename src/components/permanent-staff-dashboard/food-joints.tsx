import React, { Children, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

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

const FoodJoints = ({
  value,
  setOpenModel,
}: {
  value: JointData;
  setOpenModel?: (open: boolean) => void;
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
    if (confirm) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
    setConfirm(true);
  }

  return (
    <>
      {/* background image for food joint */}
      <div
        className="relative w-full h-[12em] md:h-[15em] flex  bg-no-repeat bg-cover rounded-t-none  md:rounded-t-[0.5em]"
        style={{
          backgroundImage: `url('/wakye.jpg')`,
        }}
      >
        {/* Name of food joint and address for larger screen */}
        <div className="hidden md:flex flex-col absolute bottom-0 py-3 px-8 w-full bg-black bg-opacity-50 text-white">
          <h2 className=" text-3xl lg:text-3xl  text-white">{value.name}</h2>
          <span className="pt-2 w-[17rem] lg:w-[22em] text-slate-200 text-xl font-roboto font-light">
            {value.address}
          </span>
        </div>
      </div>
      {/* Name of food joint and address for mobile screen */}
      <div className=" md:hidden pt-3 px-4  text-black">
        <h2 className="xtrabold text-xl lg:text-3xl  ">{value.name}</h2>
        <span className="pt-6 text-slate-600 text-sm">{value.address}</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4 ">
          {/* In put amount fied */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-xl px-0 md:px-4 font-roboto">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the Amount you want to buy"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Leave a Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-xl px-0 md:px-4 font-roboto">
                  Leave a Note
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any Special instructions or requests"
                    {...field}
                    className="text-start bg-white font-roboto"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Assigned Personnel input field */}
          <FormField
            control={form.control}
            name="personnel"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-primary text-xl px-0 md:px-4 font-roboto">
                  Select available Personnel
                </FormLabel>
                <FormLabel className="text-[1em] px-0 md:px-4 font-roboto">
                  Select available Personnel
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full bg-white text-black font-roboto">
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
          <div className="md:flex md:justify-end md:w-full gap-4">
            <Button
              onClick={() => setOpenModel!(false)}
              className="hidden md:block w-[6.5em] bg-transparent text-primary border border-primary hover:bg-primary-foreground"
            >
              Cancel
            </Button>

            <Button type="submit" className="w-full md:w-[6.5em] font-roboto">
              {confirm ? "Confirm" : "Order Now"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FoodJoints;
