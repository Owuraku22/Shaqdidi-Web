import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, redirect } from "react-router-dom";
import FormAuth from "./auth";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    email: z.string().email("Email must contain @ or '.' "),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(7, {
      message: "Password must be more than 7 characters",
    }),
    mobile: z
      .string()
      .min(10, { message: "Mobile number must be 10 digits." })
      .max(10, { message: "Mobile number must be 10 digits." })
      .regex(/^\d+$/, { message: "Mobile number must only contain digits." }),
    account_type: z.string().min(1, {
      message: "Please slect one",
    }),
  })
  .partial();
const formSchema1 = formSchema.required();

export default function RegisterAccount() {
  const form = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      account_type: "ps",
      mobile: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Toast should appear");
    toast({
      title: "You have submitted th following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    console.log(values);
  }

  return (
    <FormAuth isSignIn>
      <Card className="w-full md:w-[30rem] border-none shadow-none">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="hidden md:flex font-bold text-3xl md:text-4xl">
            Let’s Get Started
          </CardTitle>
          <CardDescription
            className="font-bold text-3xl md:text-2xl text-black
           md:text-gray-400"
          >
            Create an Account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem className="flex  justify-center">
                    <RadioGroup
                      className="flex "
                      onValueChange={field.onChange}
                      // defaultValue={"ps"}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ps" id="ps" />
                        <Label htmlFor="ps">PS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nsp" id="nsp" />
                        <Label htmlFor="nsp">NSP</Label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="john@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="************" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="0266784556" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center md:hidden">
          <small className="pr-2">Already have an account ?</small>
          <Link to={"/"} className="text-rose-700">
            {""} Log In
          </Link>
        </CardFooter>
      </Card>
    </FormAuth>
  );
}
