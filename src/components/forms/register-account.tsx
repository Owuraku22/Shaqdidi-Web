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
  useSubmit,
} from "react-router-dom";
import FormAuth from "./auth";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { AuthResponse } from "@/lib/api";
import { useStoreData } from "@/store/state";
import { ToastAction } from "../ui/toast";
import { requestPermission } from "../protected-route";

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
  const submit = useSubmit();
  const actionData = useActionData() as {
    data: AuthResponse | { error: { message: string } };
  };

  // const navigation = useNavigation();
  const navigate = useNavigate();
  const setUser = useStoreData((state) => state.setUser);
  const setAuthToken = useStoreData((state) => state.setAuthToken);
  const { isAuth, user, fbToken } = useStoreData();

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

  }
  useEffect(() => {
    if (actionData && "data" in actionData) {
      if ("error" in actionData.data) {
        toast({
          variant: "destructive",
          title: "Sign In Error",
          description: actionData.data.error.message,
        });
      } else {
        setUser(actionData?.data.user);
        console.log(actionData?.data.authorization.token);
        setAuthToken(actionData?.data.authorization.token);
        // setUser!(actionData);
        // window.localStorage.setItem(
        //   "token",
        //   actionData?.data.authorization.token
        // );
        toast({
          title: "Sign In Successful",
          description: `Welcome back, ${actionData.data.user.name}!`,
        });
        const accountType = actionData.data.user.account_type;
        if (accountType === "personnel") {
          navigate("/nsp");
        } else if (accountType === "staff") {
          navigate("/ps");
        }
      }
    }
  }, [actionData, setUser, navigate, toast]);

  useEffect(() => {
    if (!fbToken)
      toast({
        // variant: "destructive",
        title: "Notification Request",
        description: `All notifications will be disabled, please enable notifications for Shaqdidi`,
        action: (
          <ToastAction
          className="border border-primary hover:text-primary"
            altText="Enable Notification"
            onClick={async () => await requestPermission()}
          >
            Enable Notification
          </ToastAction>
        ),
      });
  }, []);

  // Redirect authenticated users trying to access sign-up or login pages
  if (
    isAuth &&
    (location.pathname === "/sign-up" || location.pathname === "/")
  ) {
    return (
      <Navigate to={user?.account_type === "staff" ? "/ps" : "/nsp"} replace />
    );
  }

  return (
    <FormAuth isSignIn>
      <Card className="w-full md:w-[30rem] border-none shadow-none">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="hidden md:flex text-[24px] md:text-[44px] font-[700] md:font-[600] text-HeadersText ">
            Let’s Get Started
          </CardTitle>
          <CardDescription
            className="text-[24px] md:text-[44px] font-[700] md:font-[600] text-HeadersText 
           md:text-gray-400"
          >
            Create an Account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-8 md:px-0 space-y-8"
            >
              <FormField
                control={form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem className="flex  justify-center">
                    <RadioGroup
                      className="flex  "
                      onValueChange={field.onChange}
                      // defaultValue={"ps"}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="staff"
                          id="staff"
                          className={`${
                            field.value === "staff" && "border-primary"
                          }`}
                        />
                        <Label htmlFor="ps">PS</Label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="personnel"
                          id="personnel"
                          className={`${
                            field.value === "personnel" && "border-primary"
                          }`}
                        />
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
                      <Input
                        className="text-[14px] md:text-[18px] bg-transparent py-4 md:py-6 font-roboto focus-visible:outline-[#212121]/40 focus-visible:right-0 focus-visible:ring-transparent"
                        placeholder="Full Name"
                        type="text"
                        {...field}
                      />
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
                        className="text-[14px] md:text-[18px] bg-transparent py-4 md:py-6 font-roboto focus-visible:outline-[#212121]/40 focus-visible:right-0 focus-visible:ring-transparent"
                        placeholder="Email Address"
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
                        className="text-[14px] md:text-[18px] bg-transparent py-4 md:py-6 font-roboto focus-visible:outline-[#212121]/40 focus-visible:right-0 focus-visible:ring-transparent"
                        placeholder="Password"
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
                        className="text-[14px] md:text-[18px] bg-transparent py-4 md:py-6 font-roboto focus-visible:outline-[#212121]/40 focus-visible:right-0 focus-visible:ring-transparent"
                        placeholder="Phone Number"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-white text-[14px] py-4 rounded-full md:rounded-xl md:text-[24px] md:py-6 font-[500] font-roboto focus-visible:outline-[#212121]/40 focus-visible:right-0 focus-visible:ring-transparent"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center md:hidden">
          <small className="pr-2  text-[12px] text-secondaryText">
            Already have an account ?
          </small>
          <Link to={"/"} className="text-linkText text-[12px] font-roboto">
            {""} Sign In
          </Link>
        </CardFooter>
      </Card>
    </FormAuth>
  );
}
