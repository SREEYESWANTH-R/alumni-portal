import LoginForm from "@/app/component/loginForm"
import hero from "@/public/hero.png"
import Image from "next/image"
import PublicRoute from "../lib/PublicRoute"


export default function loginPage(){
  return (
    <div className="flex flex-col md:flex-row h-screen justify-center">
    {/* Image Section */}
    <div className="hidden md:block md:w-1/2 md:h-full">
      <Image
        src={hero}
        alt="img"
        className="object-cover w-full h-full"
      />
    </div>

    {/* Form Section */}
    <div className="w-full md:w-1/2 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <PublicRoute>
          <LoginForm/>
        </PublicRoute>
        
      </div>
    </div>
  </div>
  )
}
