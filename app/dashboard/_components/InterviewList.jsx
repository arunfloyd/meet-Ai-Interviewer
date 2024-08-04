"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
    console.log(result);
  };
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-gray-800 mb-6 border-b pb-3">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewList && interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">No previous interviews found.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
