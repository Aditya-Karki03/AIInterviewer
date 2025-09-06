import React from "react";
import Sidebar from "./Sidebar";
import useDashboard from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const practiceSessions = [
    {
      id: 1,
      session: "Session 1",
      date: "2023-01-01",
      role: "Software Engineer",
    },
    {
      id: 2,
      session: "Session 2",
      date: "2023-01-10",
      role: "Frontend Developer",
    },
    {
      id: 3,
      session: "Session 3",
      date: "2023-02-05",
      role: "Backend Engineer",
    },
    {
      id: 4,
      session: "Session 4",
      date: "2023-02-20",
      role: "Full Stack Developer",
    },
  ];

  const handlePractice = () => {
    navigate("/practice");
  };

  const { data, error, loading } = useDashboard();
  if (error) {
    alert("error");
    return;
  }
  if (loading) {
    return (
      <div className="h-screen w-screen absolute z-30 bg-white/20 text-red-400">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-1 min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 w-full p-6">
        {/* for dashboard and user profile */}
        <div className="min-h-30 flex my-auto items-center justify-between ">
          <h1 className="text-4xl h-full my-auto font-bold text-neutral-300">
            Dashboard
          </h1>
          {/* user icon */}
          <div className="w-12 h-12 rounded-full bg-green-500"></div>
        </div>
        {/* Card About job role expertise level Assesment type skills */}
        <div className="border border-white/20 mt-2 shadow-2xl bg-gray-950 min-h-30 rounded-xl">
          <div className="flex justify-between p-4">
            <div className="w-1/2 text-center">
              <p className="text-gray-400">Job Role</p>
              <p className="text-2xl font-bold text-neutral-300 ">
                {data?.data?.profileDetails?.job}
              </p>
            </div>
            <div className="w-1/2 text-center">
              <p className="text-gray-400">Expertise Level</p>
              <p className="text-2xl font-bold text-neutral-300 ">
                {data?.data?.profileDetails?.experience}
              </p>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <div className="w-1/2 text-center">
              <p className="text-gray-400">Skill</p>
              <div className="flex gap-2 justify-center overflow-x-auto">
                {data?.data?.skills?.map((skill) => (
                  <p
                    key={skill.skillName}
                    className="text-2xl font-bold text-neutral-300 "
                  >
                    {skill.skillName}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-1/2 text-center">
              <p className="text-gray-400">Interview Type</p>
              <p className="text-2xl font-bold text-neutral-300 ">
                {data?.data?.profileDetails?.interviewType}
              </p>
            </div>
          </div>
        </div>
        {/* start practice session btn */}
        <div className="mt-4">
          <button
            onClick={handlePractice}
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-2 text-white hover:bg-blue-500 transition text-lg tracking-wider"
          >
            Start Practice Session
          </button>
        </div>
        {/* Past Practice sessions */}
        <div className="">
          <h2 className="text-3xl my-7 h-full  font-bold text-neutral-300">
            Past Practice Sessions
          </h2>
          <div className="h-44 overflow-y-auto">
            <ul className="flex flex-col gap-4">
              {practiceSessions.map((session) => (
                <li
                  key={session.id}
                  className="border border-white/20 px-6 py-4 flex justify-between rounded-lg"
                >
                  <div className="">
                    <p className="text-gray-400">
                      {session.session} - {session.date}
                    </p>
                    <p className="text-2xl font-bold text-neutral-300">
                      {session.role}
                    </p>
                  </div>
                  <button className=" cursor-pointer rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 px-4  text-white hover:bg-blue-500 transition text-lg tracking-wider">
                    View Feedback
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
