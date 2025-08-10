import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { ExtractErrorMessage } from "../errors/golobalErrorHandling"
import { useLoginMuta } from "../apis/mutations/LogingMutation"
import { LoaderCircle } from "lucide-react"

export function LoginForm({ className}) {
 const [err, setErr]=useState(null)
 const navigate=useNavigate()

 const {isError, error , isPending, data, mutateAsync}=useLoginMuta()
     

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async({email, password}) => {
    try {
      // we will call mutation fun
      const res= await mutateAsync({
         email,
         password
      })

      if(res.token) navigate('/')
    } catch (error) {
        setErr(ExtractErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center mb-3 ">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

    {
      err&&(
        <p className="p-2 rounded-md bg-destructive/10 text-destructive text-sm">{err}</p>
      )
    }

      <div className="grid gap-6">
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
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
          className={`${errors?.password?.message&& "border-red-400"}`}
            id="password"
            type="password"
            required
            placeholder="***********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          {isPending?<><LoaderCircle className="animate-spin"/> Login..</> :"Login"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
