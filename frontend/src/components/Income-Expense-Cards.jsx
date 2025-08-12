import {Card, CardDescription, CardHeader, CardTitle} from "../components/ui/card"
   
export const IncomeExpenseCards = ({ total, income, expense }) => {
  return (
    <div className='p-0 sm:p-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {/* card 1 */}
         <Card className={""}>
          <div className="grid grid-cols-3 gap-2">
             <CardHeader className={"bg-red-3000 col-span-2"}>
               <CardTitle className={"text-red-700 mb-3"}>Expenses</CardTitle>
              <CardDescription>
                Your total expense is
              </CardDescription>
           </CardHeader>

           <div className="justify-end flex pr-4" >
           <div className="flex flex-col">
             <h1>-${expense}</h1>
           </div>
           </div>
           
          </div>
        </Card>


        {/* card 2 */}
        <Card className={""}>
          <div className="grid grid-cols-3 gap-2">
             <CardHeader className={"bg-red-3000 col-span-2"}>
              <CardTitle className={"text-green-700 mb-3"}>Income</CardTitle>
              <CardDescription>
                Your total income is
              </CardDescription>
           </CardHeader>

           <div className="justify-end flex pr-4" >
           <div className="flex flex-col">
             <h1>${income}</h1>
           </div>
           </div>
           
          </div>
        </Card>

           {/* card 3 */}
        <Card className={""}>
          <div className="grid grid-cols-3 gap-2">
             <CardHeader className={"bg-red-3000 col-span-2"}>
              <CardTitle className={"text-gray-600 mb-3"}>Total Expenses/Income</CardTitle>
              <CardDescription>
                Your total spend 
              </CardDescription>
           </CardHeader>

           <div className="justify-end flex pr-4" >
           <div className="flex flex-col">
             <h1>${total}</h1>
           </div>
           </div>
           
          </div>
        </Card>
    </div>
  )
}
