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
import { Link } from "react-router-dom";
import FormAuth from "./auth";

const FormSchema = z.object({
  email: z.string().email("Email must contain @ or '.' "),
  password: z.string().min(7, {
    message: "Password must be more than 7 characters",
  }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
    <FormAuth>
      <Card className=" shadow-none border-none w-full md:w-[30em] ">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-bold text-2xl md:text-5xl">
            User Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-6 w-full "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
                      <Input placeholder="enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center text-center lg:hidden ">
                <small className="pr-2">Not Registered? </small>
                <Link to={"/register"} className="text-rose-700">
                  {" "}
                  Sign up
                </Link>
              </div>
              <Button type="submit" className="w-full text-white ">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
        <CardFooter className="lg:flex justify-center items-center text-center hidden ">
          <small className="pr-2">Not Registered? </small>
          <Link to={"/register"} className="text-rose-700">
            {" "}
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </FormAuth>
  );
}
