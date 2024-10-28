import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  console.log(interview, "this is data");
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>

      <h2 className="text-sm text-gray-600">{interview?.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview?.createdAt} 
      </h2>
      <div className="flex justify-between mt-2 gap-5">
          {/* <Link href={"/dashboard/interview/"+ interview?.mockId} */}
        <Button size="sm" variant="outline" className="">
        Feedback
        </Button>
        <Button size="sm" className="w-full">Start</Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
