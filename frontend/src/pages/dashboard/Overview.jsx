import { useState } from "react"
import { IncomeExpenseCards } from "../../components/Income-Expense-Cards"
import { ListTans } from "../../components/ListTans"
import {Button} from "../../components/ui/button"
import {
  Drawer,
  DrawerContent,
 
} from "@/components/ui/drawer"
import { CreateTransForm } from "../../components/CreateTransForm"
import { getAllTrans } from "../../apis/useQuers/getAllTrans"
import { FileWarning, LoaderCircle } from "lucide-react"
import { ExtractErrorMessage } from "../../errors/golobalErrorHandling"
import { CalculateTotals } from "../../apis/CalculateTheMone"

export const Overview = () => {
  const[showDrower, setShowDrower]=useState(false)
  const[isEditMode, setIsEditMode]=useState(false)
  const[transEdit, setTransEdit]=useState(null)


  const {isPending, isError, error ,data,}=getAllTrans()


   if(isPending){
        return <div className="flex items-center justify-center min-h-screen w-full">
             <LoaderCircle className="h-8 w-8 animate-spin text-primary"/>
        </div>
     } 


 if(isError || error){

        return <div className="flex items-center justify-center min-h-screen w-full">
          <div className="flex flex-col">
             <FileWarning className="h-8 w-8  text-primary"/>
             <p className="leading-7 mt-6 text-red-600 font-medium rounded-lg p-4">
    Oops! There was a problem loading your transactions: {ExtractErrorMessage(error)}
  </p>
          </div>
            
        </div>
     }

     const handleClose=()=>{
      setShowDrower(false)
      setTransEdit(null)
     }
 
const { total, income, expense } = CalculateTotals(data.data);
  return (
    
    <>
      <div className='min-h-screen w-full'>
      <div className="flex flex-col space-y-6">

        {/* welcoming */}
        <div className='min-h-[200px] sm:min-h-[250px] p-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded-md flex flex-wrap items-center justify-between'>
  <h1
  className="scroll-m-20 text-start text-2xl md:text-4xl font-extrabold tracking-tight text-balance 
  bg-gradient-to-r from-[oklch(0.795_0.184_86.047)] via-[oklch(0.88_0.10_86.047)] to-[oklch(0.65_0.20_86.047)]
  bg-clip-text text-transparent leading-tight"
>
  Welcome to Your Finance <br /> Tracker — Manage Your Money Smarter
</h1>
      <Button className={"cursor-pointer"} onClick={()=>{setShowDrower(!showDrower)}}>Create New trans</Button>
        </div>

        {/* cards */}
        <IncomeExpenseCards total={total} income={income} expense={expense}  />

        {/* list */}
        <ListTans  Trans={data.data} setTransEdit={setTransEdit}/>
      </div>
    </div>
      <Drawer open={showDrower || transEdit} onOpenChange={handleClose}>
  <DrawerContent className='min-h-[250px] m-0' >
    <div className="mx-auto w-full max-w-xl my-2 py-1 px-2 m-x-30 h-full overflow-y-auto ">
      <CreateTransForm setShowDrower={setShowDrower} Trans={transEdit} setTransEdit={setTransEdit}/>
    </div>
  </DrawerContent>
</Drawer>
    </>
  )
}
