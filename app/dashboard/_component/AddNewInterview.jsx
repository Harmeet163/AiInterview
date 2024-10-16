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
import { v4 as uuidv4} from 'uuid';
import { useUser } from "@clerk/nextjs";

const AddNewInterview = () => {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponce, setJsonResponce]= useState([])
  const {user}=useUser

  const formSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobDesc, jobPosition, jobExperience, "yht9gtr");

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Depends on the Job Position, Job Description and the Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT +
      " interview questions along with the answers in JSON format. Provide a 'question' and 'answer' field in the JSON.";

    // try {
    //   const result = await chatSession.sendMessage(InputPrompt);

    //   console.log("Full response:", result);

    //   if (result.response.candidates && result.response.candidates.length > 0) {
    //     console.log("First candidate:", result.response.candidates[0]);

    //     const primaryResponse = result.response.candidates[0].text;
    //     console.log("Primary Response:", primaryResponse);
    //   } else {
    //     console.warn("No candidates found in the response.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching interview questions:", error);
    // }
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp,"this is on");
    console.log(JSON.parse(MockJsonResp))
    setJsonResponce(MockJsonResp);

    const resp =await db.insert(MockInterview)
    .values({
      mockId: uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience
      

    })

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
      hover:scale-105 hover:shadow-md cursor-pointer transition-all "
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us More About Your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={formSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job Description
                    and Years of Experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className=" my-3">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="Ex. React,NodeJs, Nextjs, Angular,Java"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Exp. 5"
                      max="40"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating From Ai '
                      </>
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
