"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";

const RecordAnsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const SaveUserAnswer =async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast("Error while saving the Answer, Please record again");
        return;
      }

      const feedbackPrompt =`Question: ${mockInterviewQuestions[activeQuestionIndex]?.question},
      User Answer: ${userAnswer}, Depends on the question and user answer for given interview question 
      please give us rating for answer and feedback as area of improvment if any 
      in just 3 to 5 line to improve it in JSON formate with rating field and feedback field`
    
    const result =await chatSession.sendMessage(feedbackPrompt);
    console.log(result.response.text())
    
    } else {
      startSpeechToText();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center p-5 rounded-lg bg-black">
        <Image
          src="/web.png"
          alt="webcam"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button variant="outline" className="my-10" onClick={SaveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>show answer</Button>
    </div>
  );
};

export default RecordAnsSection;
