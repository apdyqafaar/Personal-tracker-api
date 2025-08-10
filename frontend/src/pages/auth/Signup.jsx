import React from 'react'
import { RegisterForm } from '../../components/Register-form'

export const Signup = () => {
  return (
     <div className="grid min-h-svh ">
         <div className="flex flex-col gap-4 p-6 md:p-10">
           <div className="flex justify-start gap-2 ">
             <a href="#" className="flex items-center gap-2 font-medium">
               <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
                 {/* <GalleryVerticalEnd className="size-4" /> */}
                 <img src="/logo.svg" alt="" />
               </div>
               Personal finance tracker
             </a>
           </div>
           <div className="flex flex-1 items-center justify-center">
             <div className="w-full max-w-xs">
               <RegisterForm />
             </div>
           </div>
         </div>
        
       </div>
  )
}
