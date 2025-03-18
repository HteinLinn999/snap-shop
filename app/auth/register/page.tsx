"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
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
import { registerSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { register } from "@/server/actions/register-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { status, result, execute } = useAction(register, {
    onSuccess({ data }) {
      form.reset();
      toast.success(data?.success, {
        action: {
          label: "Open Gmail",
          onClick: () => {
            window.open("https://mail.google.com", "_blank");
          },
        },
      });
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { name, email, password } = values;
    execute({ name, email, password });
  };

  return (
    <AuthForm
      formTitle="Register New account"
      footerHref="/auth/login" // account ရှိပြီးသာဆို  login page  သွားမယ်
      footerLabel="Already have an account?"
      //showProvider={true}
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {/*  <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
              <Link href={"/auth/reset"}>Forgot password?</Link>
          </Button> */}
          </div>
          <Button
            className={cn(
              "w-full my-4 bg-primary",
              status === "executing" && "animate-pulse"
            )}
          >
            Register
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
