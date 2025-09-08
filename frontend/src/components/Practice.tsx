import { useState } from "react";
import Sidebar from "./Sidebar";
import usePractice from "../hooks/usePractice";
import Loader from "./loader";

interface Data {
  answer: string | null;
  skip?: number; // sqlite cannot handle booleans hence 0's and 1's will be used
  review?: number;
  submit?: number;
}

const Practice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
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

  // TODO: handle submit
  // TODO: handle Mark For Review
  // TODO: handle skip

  async function APICall(data: Data) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/question/send-answer/${questions?.[currentQuestionIndex].id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Network error");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = () => {
    APICall({
      answer: answer.length == 0 ? null : answer,
      review: 0,
      skip: 0,
      submit: 1,
    });
    setAnswer("");
    handleBtn();
  };

  const handleMarkForReview = () => {
    APICall({
      answer: answer.length == 0 ? null : answer,
      review: 1,
      skip: 0,
      submit: 0,
    });
    setAnswer("");
    handleBtn();
  };

  const handleSkip = () => {
    APICall({
      answer: answer.length == 0 ? null : answer,
      review: 0,
      skip: 1,
      submit: 0,
    });
    setAnswer("");
    handleBtn();
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
            {questions?.[currentQuestionIndex].question}
          </p>
          <textarea
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border border-white/50 bg-gray-800 text-white rounded-md p-2 w-full h-32 outline-none"
          ></textarea>
          <div className="flex justify-between    ">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
            <button
              onClick={handleSkip}
              className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Skip Question
            </button>
            <button
              onClick={handleMarkForReview}
              className="bg-blue-500 text-white rounded-sm px-4 py-2 mt-4 w-40 cursor-pointer hover:bg-blue-600 transition duration-200"
            >
              Mark for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
