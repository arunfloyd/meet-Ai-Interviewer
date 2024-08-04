import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl m-2">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 m-2">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  );
};

export default Dashboard;
