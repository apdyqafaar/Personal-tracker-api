
import { Routes, Route } from "react-router";
import { Singnin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Overview } from "./pages/dashboard/Overview";
import { Transactions } from "./pages/dashboard/Tarnsictions/Transactions";
import { Profile } from "./pages/dashboard/profile/Profile";
import { Analytics } from "./pages/dashboard/analytics/Analytics";
import { Expense } from "./pages/dashboard/expense/Expense";
import { Income } from "./pages/dashboard/income/Income";
import { ProtectedRoutes } from "./pages/auth/ProtectedRoutes";
import { UnprotectedRoutes } from "./pages/auth/UnprotectedRoutes";


function App() {

  return (
 <Routes >

   <Route path="/login" element={<UnprotectedRoutes><Singnin/></UnprotectedRoutes> } />
   <Route path="/register" element={ <UnprotectedRoutes><Signup/></UnprotectedRoutes> } />
    <Route path="/" element={ <ProtectedRoutes><Dashboard /></ProtectedRoutes> }>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="profile" element={<Profile />} />
   </Route>
 </Routes>
 


    
  )
}

export default App
