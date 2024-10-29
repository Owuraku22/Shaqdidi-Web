import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import FormAuth from "./auth";
import { AuthResponse } from "@/lib/api";
import { useEffect, useState } from "react";
import { useStoreData } from "@/store/state";

import { ToastAction } from "../ui/toast";
import { requestPermission } from "../protected-route";

// interface ActionData {
//   error?: string;
// }

const FormSchema = z.object({
  email: z.string().email("Email must contain @ or '.' "),
  password: z.string().min(7, {
    message: "Password must be more than 7 characters",
  }),
});

export function SignInForm() {
  // display an error message on the UI
  const submit = useSubmit();

  const actionData = useActionData() as {
    data: AuthResponse | { error: { message: string } };
  };
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { setUser, isAuth, user, setAuthToken, fbToken } = useStoreData();

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        variant: "destructive",
        title: "Notification Error",
        description: `All notifications will be disabled, please enable notifications for Shaqdidi`,
        action: (
          <ToastAction
            altText="Try again"
            onClick={async () => await requestPermission()}
          >
            Try again
          </ToastAction>
        ),
      });
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submit(data, { action: "/", method: "post" });
  }

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
    <FormAuth>
      <Card className=" shadow-none border-none w-full md:w-[30em] ">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-bold-md text-2xl md:text-5xl">
            User Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 w-full "
            >
              {/* displaying error message */}
              {/* {actionData?.error && (
                <div className="text-red-500">{actionData.error}</div>
              )} */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-[18px] bg-transparent py-6 font-roboto"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        className="text-[18px] bg-transparent py-6 font-roboto"
                        placeholder="enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center text-center lg:hidden ">
                <small className="pr-2">Not Registered? </small>
                <Link to={"/sign-up"} className="text-rose-700 ">
                  {" "}
                  Sign up
                </Link>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white text-[24px] py-6 font-roboto"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
        <CardFooter className="lg:flex justify-center items-center text-center hidden ">
          <small className="pr-2">Not Registered? </small>
          <Link to={"/sign-up"} className="text-rose-700">
            {" "}
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </FormAuth>
  );
}
