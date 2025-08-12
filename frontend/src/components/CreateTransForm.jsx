

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link} from "react-router"
import { Controller, useForm } from "react-hook-form"
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from "react"
import { ExtractErrorMessage } from "../errors/golobalErrorHandling"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "./darePicker"
import { Textarea } from "@/components/ui/textarea"
import { CreateTransMutation } from "../apis/mutations/CreateTranistionMutation"
import { UpdateTranisMutation } from "../apis/mutations/UpdateTranisctionMutaion"

export function CreateTransForm({
  setTransEdit,
  setShowDrower,
  isEditMode=false, Trans={}
}) {
  const [Err, setErr]=useState(null)
    // react hook form
   const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
     defaultValues: {
      type: "",
    },
  })

 useEffect(() => {
  if (isEditMode || Trans) {
    reset({
      title: Trans.title || "",
      description: Trans.description || "",
      amount: Trans.amount || "",
      type: Trans.type?.toLowerCase() || "",
      category: Trans.category || "",
      date: Trans.date ? new Date(Trans.date) : null, 
    });
  }
}, [isEditMode, Trans, reset]);
  // mutation Fun:
  const createTransi=CreateTransMutation()
  const updateTransi=UpdateTranisMutation()
 

const onSubmit = async (formData) => {
  console.log(Trans)
  try {
     if(Trans){
             const updatedResul = await updateTransi.mutateAsync({
      title: formData.title,
      description: formData.description,
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      date: formData.date,
    id:Trans._id
  
     })
   toast('Your finance trans to day was updated successfully', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})
reset()
setTransEdit(null)
setShowDrower(false)
  }else{

       const result = await createTransi.mutateAsync({
      title: formData.title,
      description: formData.description,
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      date: formData.date
  
    })
   toast('Your finance trans to day was create successfully', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  },
})
reset()
setShowDrower(false)
  }

 
    
  } catch (err) {
    setErr(ExtractErrorMessage(err))
  }
}


// handleEdit
const handleEdit=(tran)=>{
  setTransEdit(tran)
}
  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit(onSubmit)}>
       <div className="flex flex-col items-center gap-2 text-center mb-3">
  <h1 className="text-2xl font-bold">
    {isEditMode || Trans ? "Edit the Transaction" : "Create New Transaction"}
  </h1>
  <p className="text-muted-foreground text-sm text-balance">
    We are really glad to join us😍
    <br />
    Let’s take control of your finances — starting today.🚀
  </p>
</div>

           <div className="grid gap-6">
            {Err&& (
              <p className="p-2 bg-destructive/13 text-destructive rounded-md text-sm">{Err}</p>
            )}
        {/* title */}
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            className={`${errors?.title?.message&& "border-red-400"}`}
            id="title"
            type="text"
            placeholder="break fast..."
            required
            {...register("title", { required: "title is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        
  {/* amount and  type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="amount">Amount</Label>
          </div>
          <Input
            className={`${errors?.amount?.message&& "border-red-400"}`}
            id="amount"
            type="number"
            required
            placeholder="$433"
            {...register("amount", {
              required: "Amount is required"
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

           <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="type">Type</Label>
          </div>
       <Controller
  name="type"
  control={control}
  rules={{ required: "Please select an option" }}
  render={({ field, fieldState }) => (
    <div>
      <Select value={Trans?Trans.type :field.value } onValueChange={field.onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose the type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="income">Income</SelectItem>
        </SelectContent>
      </Select>
      {fieldState.error && (
        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
      )}
    </div>
  )}
/>
        </div>
        </div>


        {/* amount and  type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="category">Category</Label>
          </div>
          <Input
            className={`${errors?.category?.message&& "border-red-400"}`}
            id="category"
            type="text"
            required
            placeholder="Food.."
            {...register("category", {
              required: "category is required"
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

           <div className="grid gap-3 ">
          <div className="flex items-center">
            <Label htmlFor="type">Date</Label>
          </div>
          <DatePickerDemo control={control} Controller={Controller}/>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
        </div>


      
     

        {/* description*/}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="description">Description</Label>
          </div>
          <Textarea 
            id="description"
            type="password"
            {...register("description"
            )}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer">
        {
          Trans?
          <>
            { createTransi.isPending? <span className="flex items-center gap-1"><LoaderCircle className="animate-spin h-2 w-2"/></span>:"Update Transiction"}
          </>
          :<>
             { createTransi.isPending? <span className="flex items-center gap-1"><LoaderCircle className="animate-spin h-2 w-2"/></span>:"Create Transiction"}
          </>
        }
        </Button>
      </div>
      
    </form>
  );
}
