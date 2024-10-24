"use client"
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

const Feedback = ({params}) => {

    // useEffect(()=>{
    // GetFeedback()
    // },[])

    const GetFeedback=async()=>{
      const result=await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, params.interviewId))
      .orderBy(UserAnswer.id);

      console.log(result)
    }
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Cong</h2>
      <h2 className="font-bold text-2xl">Here is Your Interview Feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview question with correct Answer, Your answer and
        feedback for improvement
      </h2>
    </div>
  );
};

export default Feedback;
