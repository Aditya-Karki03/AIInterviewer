import { BotMessageSquare } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../Schema/schema.login";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    //api request
    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("Login Failed");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="bg-gray-800 text-gray-100 rounded-md border border-white/20 p-3 w-full max-w-sm shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Welcome To AI Interviewer
      </h2>
      <BotMessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-400" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              {...register("email")}
              placeholder="Email Address"
              className={`bg-gray-700 text-gray-100 rounded-md border  p-2 outline-none ${
                errors.email ? "border-red-500" : "border-white/20"
              }`}
            />
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`bg-gray-700 text-gray-100 rounded-md border p-2 outline-none ${
                errors.password ? "border-red-500" : "border-white/20"
              }`}
            />
            <span className="text-red-500 text-sm ">
              {errors.password?.message}
            </span>
          </div>
          <button className="bg-blue-500 text-white rounded-md p-2 mt-3 cursor-pointer hover:bg-blue-600 transition">
            Login
          </button>
          <span className="mx-auto">
            New User?{" "}
            <Link className="text-blue-500" to="/register">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
