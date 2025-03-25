"use client";

import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "@/components/auth/auth-form";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { login } from "@/server/actions/login-action";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { status, result, execute } = useAction(login);
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    //console.log(values);
    const { email, password } = values;
    execute({ email, password });
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      showProvider={true}
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="youremail@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
              <Link href={"/auth/reset"}>Forgot password?</Link>
            </Button>
          </div>
          <Button
            className={cn(
              "w-full mb-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
