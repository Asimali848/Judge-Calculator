import { useState } from "react";

import { Chrome, LogIn, Mail } from "lucide-react";

import LoginEffect from "@/assets/img/logo.jpeg";
import Logo from "@/assets/img/logo.jpeg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">(
    "login"
  );

  const isLogin = authMode === "login";
  const isRegister = authMode === "register";
  const isForgot = authMode === "forgot";

  return (
    <div className="grid h-screen w-full grid-cols-2 overflow-hidden">
      <div className="relative col-span-1 flex h-screen w-full items-center justify-center bg-primary">
        <img className="w-full" src={LoginEffect} alt="login-effect" />
      </div>
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>
        <form className="flex w-1/2 flex-col items-center justify-center">
          <img src={Logo} alt="logo" className="w-16 rounded-xl" />
          <div className="my-10 flex w-full flex-col items-center justify-center gap-2.5">
            <span className="w-full text-center text-[30px] font-bold leading-[30px]">
              {isLogin ? "Login" : isRegister ? "Register" : "Forgot Password"}
            </span>
            <span className="w-full text-center text-[12px] leading-[12px] text-muted-foreground">
              {isForgot
                ? "Enter your email to receive reset instructions."
                : "Enter your details below to proceed."}
            </span>
          </div>

          <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="email" className="w-full text-left">
              Email
            </Label>
            <Input
              type="email"
              className="w-full"
              placeholder="johndoe@example.com"
            />
          </div>

          {!isForgot && (
            <div className="mb-5 flex w-full flex-col items-center justify-center gap-2">
              <Label htmlFor="password" className="w-full text-left">
                Password
              </Label>
              <Input
                type="password"
                className="w-full"
                placeholder="Enter your password"
              />
            </div>
          )}

          {isLogin && (
            <div className="w-full pb-4 text-right text-xs">
              <span></span>
              <span
                className="mb-2 cursor-pointer text-primary underline"
                onClick={() => setAuthMode("forgot")}
              >
                Forgot Password?
              </span>
            </div>
          )}

          <Button className="w-full" variant="default" size="lg">
            {isForgot ? <Mail /> : <LogIn />}
            {isLogin ? "Login" : isRegister ? "Register" : "Send Reset Link"}
          </Button>

          {!isForgot && (
            <>
              <fieldset className="my-3 w-full border-t">
                <legend className="px-5 text-center font-semibold">or</legend>
              </fieldset>
              <Button className="w-full gap-2.5" variant="secondary" size="lg">
                <Chrome />
                Google
              </Button>
            </>
          )}

          <div className="mt-5 flex w-full flex-col items-center text-center text-[12px] leading-[12px] text-muted-foreground">
            {isLogin && (
              <>
                <span>
                  Don’t have an account?&nbsp;
                  <span
                    className="cursor-pointer text-primary underline"
                    onClick={() => setAuthMode("register")}
                  >
                    Register
                  </span>
                </span>
              </>
            )}

            {isRegister && (
              <span>
                Already have an account?&nbsp;
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setAuthMode("login")}
                >
                  Login
                </span>
              </span>
            )}

            {isForgot && (
              <span>
                Back to&nbsp;
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setAuthMode("login")}
                >
                  Login
                </span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
