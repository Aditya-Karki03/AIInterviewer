import { useState } from "react";
import Sidebar from "./Sidebar";
import usePractice from "../hooks/usePractice";
import Loader from "./loader";

const Practice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { questions, error, loading } = usePractice();
  if (error) {
    alert(error);
    return;
  }
  if (loading) {
    return <Loader />;
  }

  const handleBtn = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex < 9 ? currentQuestionIndex + 1 : currentQuestionIndex
    );
  };
  return (
    <div className="flex flex-1 min-h-screen ">
      <Sidebar />
      <div className="py-5 my-auto  border border-white/50 min-w-4xl h-full px-3.5 text-white bg-gray-950 shadow-2xl rounded-xl ">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">PRACTICE SESSION</h2>
          <h2>
            <span className="font-bold">{currentQuestionIndex + 1}</span> /{" "}
            <span className="text-2xl">{questions?.length}</span>
          </h2>
        </div>
        <div className="mt-20 max-w-3xl mx-auto">
          <p className="QUESTION  text-center text-3xl my-5 text-wrap">
            {questions?.[currentQuestionIndex]}
          </p>
          <textarea
            name="answer"
            id="answer"
            className="border border-white/50 bg-gray-800 text-white rounded-md p-2 w-full h-32 outline-none"
          ></textarea>
          <div className="flex justify-between    ">
            <button
              onClick={handleBtn}
              className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
            <button className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200">
              Skip Question
            </button>
            <button className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200">
              Mark for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
