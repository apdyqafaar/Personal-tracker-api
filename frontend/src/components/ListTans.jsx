import { Calendar, ArrowUpCircle, ArrowDownCircle, Tag, Search, Trash2, Edit2, Edit } from "lucide-react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card"; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMemo, useState } from "react";
import useTransEditStore from "../store/EditingTransiction";
import { toast } from "sonner"
import { DeleteMutation } from "../apis/mutations/DeleteTrans";

export const ListTans = ({ Trans = [], setTransEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [showDeleteCom, setShowDeleteCom] = useState(false);
    const {setIsEditMode}=useTransEditStore()
    const {isPending, error,mutateAsync, data}=DeleteMutation()


  const filteredTrans = useMemo(() => {
    let filtered = Trans.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "latest") {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "older") {
      filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filtered;
  }, [searchTerm, sortOption, Trans]);

 
  const handleToDelete=async()=>{

   const result= await mutateAsync(showDeleteCom._id)
    if (result) {
       toast.success("Transaction deleted successfully ✅")
    setShowDrower(false) // close drawer if applicable

    }else{
        toast.error("Failed to delete transaction ❌")
    }
   

 
  }


  return (
    <div className="p-3 h-full">
      <div className="flex flex-col space-y-4 h-full">
        {/* search and filter */}
        <div className="flex space-x-2 relative items-center">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-lg w-full pl-8"
            placeholder="Search trans here"
          />
          <span className="absolute left-2 top-1.5">
            <Search className="w-4 text-gray-500" />
          </span>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="older">Older</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Empty state */}
        {Trans.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center my-12">
             <Card className="max-w-md w-full mx-auto text-center text-gray-600 my-auto">
            <CardHeader>
              <CardTitle>No Transactions Found</CardTitle>
              <CardDescription>Start by adding your first transaction.</CardDescription>
            </CardHeader>
          </Card>
          </div>
         
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrans.map((tran, idx) => (
            <Card
  key={idx}
  className="hover:shadow-lg transition-shadow duration-300"
>
  <CardHeader>
    <CardTitle>{tran.title}</CardTitle>
    <CardDescription>{tran.description}</CardDescription>
  </CardHeader>

  <CardContent>
    {/* Category */}
    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
      <span className="flex items-center gap-1">
        <Tag className="w-4 h-4 text-gray-400" />
        {tran.category}
      </span>

      {/* Amount with type icon */}
      <span
        className={`flex items-center gap-1 font-semibold ${
          tran.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {tran.type === "income" ? (
          <ArrowUpCircle className="w-4 h-4" />
        ) : (
          <ArrowDownCircle className="w-4 h-4" />
        )}
        {tran.type === "income" ? "+" : "-"}${tran.amount}
      </span>
    </div>

    {/* Transaction type label */}
    <div className="flex items-center gap-1 text-xs text-gray-500">
      {tran.type === "income" ? "Income" : "Expense"}
    </div>
  </CardContent>

  <CardFooter className={"flex items-center justify-between"}>
    <div className="flex items-center gap-1 text-xs text-gray-400">
      <Calendar className="w-4 h-4" />
      {new Date(tran.date).toLocaleDateString()}
    </div>

    <div className="flex items-center gap-2">
        <Edit onClick={()=>{setTransEdit(tran)}}  className="text-gray-600 cursor-pointer w-5"/>
     <Trash2 onClick={()=>{setShowDeleteCom(tran)}} className="text-destructive cursor-pointer w-5"/>
    </div>
  </CardFooter>
</Card>
            ))}
          </div>
        )}
      </div>

       <AlertDialog open={showDeleteCom} onOpenChange={setShowDeleteCom}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Comfirm to delete it
            </AlertDialogTitle>
            <AlertDialogDescription>
         Are you sure you want to delete this transaction?  
This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variants={"destructive"}
              className="bg-destructive/80 hover:bg-destructive/100 text-gray-200 cursor-pointer"
              onClick={handleToDelete}
            >
            {isPending?"Deleting..." :"Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};
