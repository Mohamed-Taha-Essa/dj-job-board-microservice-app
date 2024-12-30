import { SignupForm } from "@/components/account/signup-form"
function SignUpPage(){


    return(
        <div className="container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm">
                 <SignupForm/>
            </div>
        </div>
    )
}
export default SignUpPage