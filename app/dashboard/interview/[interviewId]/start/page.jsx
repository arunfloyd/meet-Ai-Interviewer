"use client";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useRecordStore from "@/store/store";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const isRecording = useRecordStore((state) => state.isRecording);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
  
      console.log("Raw result:", result[0]);
  
      if (result[0]?.jsonMockResp) {
        try {
          // Clean up the JSON string
          let cleanJsonString = result[0].jsonMockResp.trim();
          
          // Find the start and end of the JSON array
          const startIndex = cleanJsonString.indexOf('[');
          const endIndex = cleanJsonString.lastIndexOf(']');
          
          if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            // Extract only the JSON array part
            cleanJsonString = cleanJsonString.substring(startIndex, endIndex + 1);
            
            const jsonMockResp = JSON.parse(cleanJsonString);
            console.log("Parsed JSON:", jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
          } else {
            console.error("Invalid JSON structure");
            setMockInterviewQuestion(null);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          console.log("Problematic JSON string:", result[0].jsonMockResp);
          setMockInterviewQuestion(null);
        }
      } else {
        console.log("No JSON data found");
        setMockInterviewQuestion(null);
      }
  
      setInterviewData(result[0]);
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Handle database errors
    }
  };

  const NextQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
    useRecordStore.getState().stopRecording();
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video / Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {isRecording &&
          activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button onClick={NextQuestion}>Next Question</Button>
          )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
