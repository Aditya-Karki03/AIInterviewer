import { useForm, type SubmitHandler } from "react-hook-form";
import { jobs, interviewTypes } from "../utils/jsons";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ProfileSetupSchema } from "../Schema/schema.profile-setup";

interface FormValues {
  job: string;
  experience: "Entry" | "Mid" | "Senior";
  skills: string[];
  interviewType: string;
}

const ProfileSetup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ProfileSetupSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert("hello world");
    console.log(data);
  };
  console.log(errors);
  return (
    <div className="min-h-screen text-white flex items-center mt-2 shadow-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-16 border border-white/50 min-w-2xl h-full px-3.5  bg-gray-950 shadow-2xl rounded-xl mx-auto"
      >
        <h1 className="text-4xl h-full  font-semibold text-neutral-300 my-4">
          User Profile Setup
        </h1>
        <p className="text-neutral-300  text-lg">
          Provide Information to set up your profile in the AI Interview
          Preparation App.
        </p>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-bold text-xl" htmlFor="job">
            Job Role/Title
          </label>
          <select
            className={`border  px-2 py-3 rounded-md outline-none ${
              errors.job ? "border-red-500" : "border-white/40"
            }`}
            {...register("job")}
          >
            {jobs.map((job) => (
              <option key={job.value} value={job.value}>
                {job.label}
              </option>
            ))}
          </select>
          <p className="text-red-500">{errors.job?.message}</p>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <label className="font-bold text-xl" htmlFor="experience">
            Experience Level
          </label>
          <div className="flex gap-4 justify-around">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("experience")}
                name="experience"
                value="Entry"
              />
              Entry
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("experience")}
                name="experience"
                value="Mid"
              />
              Mid
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                {...register("experience")}
                name="experience"
                value="Senior"
              />
              Senior
            </label>
          </div>
          <p className="text-red-500 block">{errors.experience?.message}</p>
        </div>

        <div className="flex flex-col gap-2 my-3">
          <label className="font-bold text-xl" htmlFor="skills">
            Skills
          </label>
          <input
            type="text"
            className={`border px-2 py-3 rounded-md outline-none ${
              errors.skills ? "border-red-500" : "border-white/40"
            }`}
            {...register("skills", {
              setValueAs: (val: string) =>
                val
                  .split(",")
                  .map((skill: string) => skill.trim())
                  .filter((s) => s.length > 0),
            })}
            placeholder="Enter your skills (e.g. React, Node, SQL)"
          />

          <p className="text-red-500">{errors.skills?.message}</p>
        </div>

        <div className="flex flex-col gap-2 my-3">
          <label className="font-bold text-xl" htmlFor="interviewType">
            Interview Type
          </label>
          <select
            className={`border  px-2 py-3 rounded-md outline-none ${
              errors.interviewType ? "border-red-500" : "border-white/40"
            }`}
            {...register("interviewType")}
          >
            {interviewTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="text-red-500">{errors.interviewType?.message}</p>
        </div>
        <button className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 my-3 text-white hover:bg-blue-500 transition text-md tracking-wide">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
