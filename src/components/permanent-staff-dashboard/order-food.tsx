import { useEffect, useState } from "react";
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
import { boolean, z } from "zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useSubmit } from "react-router-dom";
import { FoodJoint, Personnel, PersonnelResponse } from "@/lib/api";
import { useStoreData } from "@/store/state";

const formSchema = z.object({
  amount: z.string().min(2).max(50),
  note: z.string().min(2).max(500),
  personnel_id: z.string().min(1),
});

const FoodJoints = ({
  foodJoint,
  personnels,
  setOpenModel,
}: {
  foodJoint: FoodJoint;
  personnels: PersonnelResponse;
  setOpenModel?: (open: boolean) => void;
}) => {
  const submit = useSubmit();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      note: "",
      personnel_id: "",
    },
  });
  const user = useStoreData((state) => state.user);
  const staff_id = user?.id;

  const [confirm, setConfirm] = useState(false);
  const [isFormData, setIsFormData] = useState(false);

  const formValues = form.watch();
  useEffect(() => {
    const allFieldsFilled =
      Boolean(form.watch("amount")) &&
      Boolean(form.watch("note")) &&
      Boolean(form.watch("personnel_id"));
    setIsFormData(allFieldsFilled);
  }, [formValues]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const jointData = {
      joint_id: foodJoint.id,
      address: foodJoint.address,
      joint_name: foodJoint.name,
      staff_id: staff_id!,
      // joint_image: foodJoint.image_url,
      ...data,
    };
    console.log("Order data", jointData);
    if (confirm) {
      submit(jointData, { action: "/ps/order-history", method: "POST" });
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(jointData, null, 2)}
            </code>
          </pre>
        ),
      });
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  }
  return (
    <>
      {/* background image for food joint */}
      <div className="relative w-full h-[12em] md:h-[15em] flex  bg-no-repeat  rounded-t-none  md:rounded-t-[0.5em]">
        <img
          src={foodJoint.image_url}
          className=" w-full rounded-t-lg object-cover object-center"
        />
        {/* Name of food joint and address for larger screen */}
        <div className="hidden md:flex flex-col absolute bottom-0 py-3 px-8 w-full bg-black bg-opacity-60 text-white">
          <h2 className=" text-3xl lg:text-3xl  text-white font-poppins">
            {foodJoint.name}
          </h2>
          <span className="pt-2 w-[17rem] lg:w-[22em] text-slate-200 text-xl font-roboto font-light">
            {foodJoint.address}
          </span>
        </div>
      </div>
      {/* Name of food joint and address for mobile screen */}
      <div className=" md:hidden pt-3 px-4  text-black">
        <h2 className="text-[20px] font-[700] font-roboto ">
          {foodJoint.name}
        </h2>
        <span className="pt-6 text-[14px] font-[400] text-[#212121] font-roboto">
          {foodJoint.address}
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4 ">
          {/* In put amount fied */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary text-[0.875rem] font-[600] px-0 md:px-4 font-roboto">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the Amount you want to buy"
                    {...field}
                    className="bg-white text-[0.875rem] font-[400]"
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
                <FormLabel className="text-primary text-[0.875rem] font-[600] px-0 md:px-4 font-roboto">
                  Leave a Note
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any Special instructions or requests"
                    {...field}
                    className="text-start bg-white font-roboto text-[0.875rem] font-[400]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Assigned Personnel input field */}
          <FormField
            control={form.control}
            name="personnel_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-primary text-[0.875rem] font-[600] px-0 md:px-4 font-roboto">
                  Select available Personnel
                </FormLabel>
                <FormLabel className="text-[0.875rem] font-[400] text-[#212121] px-0 md:px-4 font-roboto">
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
                      {personnels.personnels.map((personnel) => (
                        <SelectItem
                          key={personnel.id}
                          value={personnel.id.toString()}
                        >
                          {personnel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="md:flex md:justify-end md:w-full gap-4">
            <Button
              onClick={() => {
                setConfirm(false);
                setOpenModel!(false);
              }}
              className="hidden md:block w-[6.5em] bg-transparent text-primary border border-primary hover:bg-primary-foreground"
            >
              Cancel
            </Button>

            {/* {confirm ? (
              <Button
                type="submit"
                className="w-full md:w-[6.5rem] rounded-full md:rounded-lg font-roboto"
              >
                Confirm
              </Button>
            ) : (
              <Button
                onClick={() => setConfirm(true)}
                type="button"
                className="w-full md:w-[6.5rem] rounded-full md:rounded-lg font-roboto"
                disabled={!isFormData}
              >
                Order Now
              </Button>
            )} */}
            <Button
              type="submit"
              className="w-full md:w-[6.5rem]"
              disabled={!isFormData}
            >
              {confirm ? "Confirm" : "Order Now"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FoodJoints;
