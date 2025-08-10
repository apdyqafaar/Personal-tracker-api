import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link, useNavigate} from "react-router"
import { useForm } from "react-hook-form"
import { useRegisterUser } from "../apis/mutations/RegisterMutation"
import { LoaderCircle } from 'lucide-react';
import { useState } from "react"
import { ExtractErrorMessage } from "../errors/golobalErrorHandling"
import { toast } from "sonner"

export function RegisterForm({
  className,
}) {
  const [Err, setErr]=useState(null)
   const navigate=useNavigate()

    // react hook form
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch("password")

  // mutation Fun:
   const {isError, error, isPending, data, mutate, mutateAsync}=useRegisterUser()
 

const onSubmit = async (formData) => {
  try {
    const result = await mutateAsync({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
   toast('Your account has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})
    if(result.token) navigate('/')
  } catch (err) {
    setErr(ExtractErrorMessage(err))
  }
}

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center mb-3">
        <h1 className="text-2xl font-bold">Create New Account</h1>
        <p className="text-muted-foreground text-sm text-balance">
        We are really glad to join us😍
  <br />
     Let’s take control of your finances —starting today.🚀
        </p>
      </div>
           <div className="grid gap-6">
            {isError&& (
              <p className="p-2 bg-destructive/13 text-destructive rounded-md text-sm">{Err}</p>
            )}
        {/* Name */}
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            className={`${errors?.name?.message&& "border-red-400"}`}
            id="name"
            type="text"
            placeholder="jondoh"
            required
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className={`${errors?.email?.message&& "border-red-400"}`}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            className={`${errors?.password?.message&& "border-red-400"}`}
            id="password"
            type="password"
            required
            placeholder="**********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="comfirm">Comfirm</Label>
          </div>
          <Input
            className={`${errors?.comfirm?.message&& "border-red-400"}`}
            id="comfirm"
            type="password"
            required
            placeholder="**********"
            {...register("comfirm", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.comfirm && (
            <p className="text-sm text-red-400">{errors.comfirm.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
         { isPending? <span className="flex items-center gap-1"><LoaderCircle className="animate-spin h-2 w-2"/></span>:"Create account"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
