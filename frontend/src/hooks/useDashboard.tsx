import { useEffect, useState } from "react";

interface ProfileDetails {
  id: number;
  job: string;
  experience: string;
  interviewType: string;
}

interface Skill {
  skillName: string;
}

interface Data {
  ok: boolean;
  data: {
    profileDetails: ProfileDetails;
    skills: Skill[];
  };
}

const useDashboard = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/v1/dashboard/get-dashboard`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Network error");
        const result = (await response.json()) as Data;
        setData(result);
        console.log(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as string);
        setLoading(false);
        throw new Error("Something went wrong please try again");
      }
    };
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useDashboard;
