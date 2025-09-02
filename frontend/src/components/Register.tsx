import { registerSchema } from "../Schema/schema.login";
import { BotMessageSquare } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    //make api call
    fetch("http://localhost:3001/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
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
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className={`bg-gray-700 text-gray-100 rounded-md border p-2 outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-white/20"
              }`}
            />
            <span className="text-red-500 text-sm ">
              {errors.confirmPassword?.message}
            </span>
          </div>
          <button className="bg-blue-500 text-white rounded-md p-2 mt-3 cursor-pointer hover:bg-blue-600 transition">
            Register
          </button>
          <span className="mx-auto">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
