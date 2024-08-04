"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesc, jobExperience, jobPosition);

    const InputPrompt =
      "Job Position:" +
      jobPosition +
      " , Job Experience in years:" +
      jobExperience +
      " , Job Description: " +
      jobDesc +
      " .Depends on the job position .job description & job expreience in years give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions along with answer in json format. Give me questions and answer on json format";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // console.log(JSON.parse(MockJsonResponse));
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const response = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPostition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });
      console.log("12", response);
      if (response) {
        setOpenDailog(false);
        router.push("/dashboard/interview/" + response[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <div
        className="p-12 border-2 border-dashed border-primary/50 rounded-xl bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="font-bold text-2xl text-center text-primary">
          + Add New Interview
        </h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary mb-4">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="bg-secondary/30  rounded-lg">
                  <h2 className="text-md font-semibold mb-4">
                    Add details about your Job Position/Role, Job description &
                    Years of Experience
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Job Position / Role
                      </label>
                      <Input
                        placeholder="Eg:- Full Stack Developer"
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Job Description
                      </label>
                      <Textarea
                        placeholder="Eg:- React, NodeJS, ExpressJS, MongoDB, etc..."
                        onChange={(e) => setJobDesc(e.target.value)}
                        required
                        className="w-full min-h-[100px]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Years of Experience
                      </label>
                      <Input
                        placeholder="Eg:- 5"
                        type="number"
                        max="50"
                        required
                        onChange={(e) => setJobExperience(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDailog(false)}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="px-6">
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <LoaderCircle className="animate-spin" />
                        <span>Generating Questions</span>
                      </div>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
