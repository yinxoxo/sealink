import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  saveUserToFirestore,
} from "./auth";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userId, setUserId] = useState(null);

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
      console.log("User registered successfully with UID:", user.uid);
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
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
      console.log("Display name saved successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving display name:", error.message);
      alert("Error saving display name: " + error.message);
    }
  };

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await loginWithEmail(email, password);
      const user = userCredential.user;

      login(user);
      console.log("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      login(user);
      console.log("Google Sign-in successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-in failed:", error.message);
      alert("Google Sign-in failed: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 items-center justify-center bg-white p-10">
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
                  placeholder="Enter your display name"
                  {...register("displayName", { required: true })}
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
                {errors.displayName && (
                  <p className="text-red-500">User name is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-300 py-3 text-white"
              >
                Save User Name
              </button>
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
                    placeholder="Email"
                    autoComplete="current-password"
                    {...register("email", { required: "Email is required" })}
                    className="w-full rounded-lg border border-gray-300 p-3"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full rounded-lg border border-gray-300 p-3"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-300 py-3 text-white hover:bg-gray-500"
                >
                  {isLogin ? "Log in" : "Sign up"}
                </button>
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex w-full justify-center rounded-lg border border-gray-300 bg-gray-100 py-3 hover:bg-gray-200"
                >
                  {isLogin ? "Log in with Google" : "Sign up with Google"}
                </button>
              </div>
            </form>
          )}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="ml-2 text-blue-600 hover:underline"
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
