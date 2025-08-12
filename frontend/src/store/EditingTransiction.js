import { create } from "zustand";

 
 const useTransEditStore=create((set)=>({
   transiction:null,
    isEditMode:false,

    setTrans:(trans)=> set({trans}),
    setIsEditMode:(mode)=> set({mode}),
 }))


 export default useTransEditStore