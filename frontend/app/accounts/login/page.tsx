import { LoginForm } from "@/components/account/login-form"
function LogInPage(){


    return(
        <div className="container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
export default LogInPage