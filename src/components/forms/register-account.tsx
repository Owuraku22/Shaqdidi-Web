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
import {
  Link,
  Navigate,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import FormAuth from "./auth";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { AuthResponse } from "@/lib/api";
import { useStoreData } from "@/store/state";


const formSchema = z
  .object({
    email: z.string().email("Email must contain @ or '.' "),
    full_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(7, {
      message: "Password must be more than 7 characters",
    }),
    phone_number: z
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
  // const actionData = useActionData();
  const submit = useSubmit();
  const actionData = useActionData() as AuthResponse;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { setUser, isAuth, user } = useStoreData();
  const form = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      account_type: "staff",
      phone_number: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Toast should appear");
    submit(values, { action: "/sign-up", method: "post" });
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

  useEffect(() => {
    if (actionData) {
      // setUser Data
      setUser!(actionData.user);
      // Redirect based on the account type
      console.log("Sign Up action data: ", actionData);
      const accountType = actionData?.user.account_type;
      if (accountType === "personnel") {
        navigate("/nsp");
      } else if (accountType === "staff") {
        navigate("/ps");
      }
    }
  }, [actionData, setUser]);

  // Redirect authenticated users trying to access sign-up or login pages
  if (isAuth && (location.pathname === '/sign-up' || location.pathname === '/')) {
    return <Navigate to={user?.account_type === 'staff' ? '/ps' : '/nsp'} replace />;
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
                        <RadioGroupItem value="staff" id="staff" />
                        <Label htmlFor="ps">PS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personnel" id="personnel" />
                        <Label htmlFor="nsp">NSP</Label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="John" type="text" {...field} />
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
                      <Input
                        placeholder="john@gmail.com"
                        type="email"
                        {...field}
                      />
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
                      <Input
                        placeholder="************"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="0266784556"
                        type="number"
                        {...field}
                      />
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
