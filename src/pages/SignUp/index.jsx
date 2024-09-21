import { useState } from "react";
import { loginWithGoogle, loginWithEmail, registerWithEmail } from "./auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 items-center justify-center bg-white p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {isLogin ? "Welcome back!" : "Create your account"}
            </h1>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              </div>
              <div>
                {isLogin ? (
                  <button
                    type="button"
                    onClick={() => loginWithEmail(email, password)}
                    className="w-full rounded-lg bg-slate-300 py-3 text-white hover:bg-slate-500"
                  >
                    Log in
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => registerWithEmail(email, password)}
                    className="w-full rounded-lg bg-gray-300 py-3 text-white hover:bg-gray-500"
                  >
                    Sign up
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="space-y-4">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-gray-100 py-3 hover:bg-gray-200"
            >
              {isLogin ? "Continue with Google" : "Sign up with Google"}
            </button>
          </div>

          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">
                    Don't have an account?
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <span className="text-sm text-gray-600">
                  Already have an account?
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Log in
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isLogin ? (
        <div className="hidden flex-1 items-center justify-center bg-slate-300 md:flex">
          <div className="relative flex h-full w-full items-center justify-center p-10">
            <p className="text-2xl text-white">登入</p>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center bg-gray-300 md:flex">
          <div className="relative flex h-full w-full items-center justify-center p-10">
            <p className="text-2xl text-white">註冊</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
