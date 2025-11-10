"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserEmailSignin } from "@/service/user-auth.service";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginSchemaType = z.infer<typeof loginSchema>

export default function LoginForm(){
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = handleSubmit(async ({ email, password, rememberMe }) => {
    const response = await UserEmailSignin(email, password, rememberMe)

    if(response.success){
      toast.success('User signin successful')
    }else{
      toast.error(response.message)
    }
  });

  return(
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">
          Email
        </Label>
        <Input id="email" type="email" placeholder="johndoe@email.com" {...register("email")}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">
          Password
        </Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")}
          className="bg-input/30 border-input/50 placeholder:text-muted-foreground/60"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="rememberMe" {...register("rememberMe")} />
        <Label htmlFor="rememberMe" className="text-foreground">
          Remember me
        </Label>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        {
          isSubmitting ?
            <Spinner />
          : 'Login'
        }
      </Button>
    </form>
  )
}