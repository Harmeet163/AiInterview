"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";
import React, { useEffect, useState } from "react";
import QuestionsSections from "./_components/QuestionsSections";
import RecordAnsSection from "./_components/RecordAnsSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    console.log(params);
    GetInterviewDetails();
  }, []);
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Question */}
        <QuestionsSections
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video Audio Rec */}
        <RecordAnsSection
         mockInterviewQuestions={mockInterviewQuestions}
         activeQuestionIndex={activeQuestionIndex}
         interviewData={interviewData}
        />
      </div>
    </div>
  );
};

export default StartInterview;
