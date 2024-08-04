import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };
  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
      <div className="mb-4">
        <h2 className="font-bold text-xl text-blue-900 mb-2">{interview?.jobPostition}</h2>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {interview?.jobExperience} Years Experience
          </span>
          <span className="text-gray-500">
            {new Date(interview?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button 
          size="sm" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={onStart}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
