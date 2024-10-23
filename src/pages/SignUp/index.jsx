import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sealinkLogo from "../../assets/images/logo.png";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  saveUserToFirestore,
} from "../../features/auth/api/auth";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleRegister = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      await saveUserToFirestore({
        uid: user.uid,
        email: user.email,
        authProvider: user.providerData
          ? user.providerData[0]?.providerId
          : "email",
      });

      login(user);
      setUserId(user.uid);
      setIsNewUser(true);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setFormError(error.message);
    }
  };

  const handleSaveDisplayName = async (data) => {
    const { displayName } = data;

    if (!userId) {
      console.error("User ID is undefined. Cannot save display name.");
      alert("User ID is not defined. Please register or log in first.");
      return;
    }

    try {
      await saveUserToFirestore({
        uid: userId,
        displayName: displayName,
      });

      const updatedUser = { uid: userId, displayName };
      login(updatedUser);
      setIsNewUser(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving display name:", error.message);
      setFormError(error.message);
    }
  };

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await loginWithEmail(email, password);
      const user = userCredential.user;

      await user.reload();
      const updatedUser = user;

      await login({
        uid: updatedUser.uid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
      });

      const redirectTo = location.state?.from
        ? `/${location.state.from}`
        : "/dashboard";
      navigate(redirectTo);
    } catch (error) {
      console.error("Login failed:", error.message);
      setFormError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      login(user);
      const redirectTo = location.state?.from
        ? `/${location.state.from}`
        : "/dashboard";
      navigate(redirectTo);
    } catch (error) {
      console.error("Google Sign-in failed:", error.message);
      setFormError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="absolute left-0 top-0 ml-9 mt-8">
        <Link to="/">
          <img src={sealinkLogo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {isNewUser
                ? "Please Enter User Name"
                : isLogin
                  ? "Welcome back!"
                  : "Create your account"}
            </h1>
          </div>

          {isNewUser ? (
            <form
              onSubmit={handleSubmit(handleSaveDisplayName)}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm">
                <input
                  type="text"
                  name="text"
                  placeholder="Enter your display name"
                  {...register("displayName", { required: true })}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
                {errors.displayName && (
                  <p className="text-red-500">User name is required</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-button hover:bg-button-hover"
              >
                Save User Name
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm">
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    defaultValue="admin@mail.com"
                    placeholder="Email"
                    autoComplete="current-password"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 p-3"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    defaultValue="111111"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 p-3"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {formError && <p className="mb-3 text-red-500">{formError}</p>}
                <p className="my-2 text-sm text-gray-500">
                  Welcome to log in with our test account and explore!
                </p>
                <Button
                  type="submit"
                  className="w-full bg-button hover:bg-button-hover"
                >
                  {isLogin ? "Log in" : "Sign up"}
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center"
                >
                  <FaGoogle className="mr-2" />
                  {isLogin ? "Log in with Google" : "Sign up with Google"}
                </Button>
              </div>
            </form>
          )}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="ml-2 text-sea hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
