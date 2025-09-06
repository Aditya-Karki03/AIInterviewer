import { useEffect, useState } from "react";

interface Questions {
  id: number;
  question: string;
}

interface Data {
  ok: boolean;
  data: Questions[];
}

const usePractice = () => {
  const [questions, setQuestions] = useState<Questions[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // create side effect whenever component mounts api call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/question/generate-questions",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) return new Error("Network error");
        const result = (await response.json()) as Data;
        setQuestions(result?.data);
        setLoading(false);
      } catch (err) {
        setError(err as string);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    questions,
    loading,
    error,
  };
};

export default usePractice;
