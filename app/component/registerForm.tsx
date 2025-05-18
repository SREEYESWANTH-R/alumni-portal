"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Mobile must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async(data: unknown) => {
    try {
      const res = await axios.post("/api/register",data);

      if (res.status === 201) {
        localStorage.setItem("userToken",res.data.token);
        toast("Registration successful! Redirecting...");
        router.push("/home/feed");
      } else {
        toast(res.data.message);
      }
      
    } catch (error : unknown) {
      console.log((error as Error).message);

    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {["name", "email", "mobile", "address", "city", "state", "pincode", "password"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof typeof formSchema.shape}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      type={field.name === "password" ? "password" : "text"}
                      placeholder={`Enter your ${field.name}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="w-full">
            Join Now
          </Button>
        </form>
      </Form>
    </div>
  );
}
