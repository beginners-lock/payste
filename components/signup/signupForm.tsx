"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().nonempty("First name is required").min(2, "Minimum of 2 characters"),
  lastName: z.string().nonempty("Last name is required").min(2, "inimum oft 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupForm(){
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    console.log(data);
    // Handle signup logic here
  };
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            First name
          </Label>
          <Input id="firstName" type="text" placeholder="John" {...register("firstName")}
            className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
          />
          {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            Last name
          </Label>
          <Input id="lastName" type="text" placeholder="Doe" {...register("lastName")}
            className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
          />
          {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input id="email" type="email" placeholder="johndoe@email.com" {...register("email")}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
        {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Sign Up
      </Button>
    </form>
  )
}