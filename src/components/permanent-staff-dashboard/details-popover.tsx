import React, { useState } from "react";
import { Button } from "../ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";

type JointData = {
  name: string;
  address: string;
  id: number;
};
const formSchema = z.object({
  amount: z.string().min(2).max(50),
  note: z.string().min(2).max(500),
  personnel: z.string().min(2).max(500),
  phone: z.string().min(2).max(500),
  date: z.string().min(2).max(500),
  status: z.string().min(2).max(500),
});

const DetailsPopover = ({
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
      phone: "",
      date: "",
      status: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="border-none p-0">
          {/* background image for food joint */}
          <div
            className="relative w-auto h-[12em] md:h-[15em] flex  bg-no-repeat bg-cover rounded-t-none  md:rounded-t-[0.5em]"
            style={{
              backgroundImage: `url('/wakye.jpg')`,
            }}
          >
            {/* Name of food joint and address for larger screen */}
            <div className="hidden md:flex flex-col absolute bottom-0 py-3 px-8 w-full bg-black bg-opacity-50 text-white">
              <h2 className=" text-3xl lg:text-3xl  text-white">
                {value.name}
              </h2>
              <span className="pt-2 w-[17rem] lg:w-[22em] text-slate-200 text-xl font-roboto font-light">
                {value.address}
              </span>
            </div>
          </div>
          {/* Name of food joint and address for mobile screen */}
          <div className=" md:hidden pt-3 px-4  text-black">
            <h2 className="text-xl lg:text-3xl  ">{value.name}</h2>
            <span className="pt-6 text-slate-600 text-sm">{value.address}</span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 m-8 "
            >
              {/* In put amount fied */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
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
              {/* Leave a Note */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
                      Leave a Note
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Buy Waakye 15gh, Fish 20gh, Salad 4gh, Gari 2gh, Wele 6gh, I want more shito. "
                        {...field}
                        className="h-[7em] text-start bg-white"
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
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
                      Assigned Personnel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Hayford Oduro Antobre"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Phone Number input field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0547016492"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* status input field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
                      Status
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pending"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* date input field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary text-lg px-0 md:px-4 font-normal font-roboto">
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="03/10/2024"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse md:flex-row gap-2 w-full md:justify-end font-roboto">
                <DialogClose asChild>
                  <Button className=" bg-transparent text-primary border border-primary mb-2 md:mr-2 md:right-0 hover:bg-primary-foreground">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="hover:opacity-85">
                  Cancel Order
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsPopover;
