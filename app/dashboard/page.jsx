import React from "react";
import AddNewInterview from "./_component/AddNewInterview";
import PreviousInterview from "./_component/PreviousInterview";

const page = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your interviw</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      <PreviousInterview />
    </div>
  );
};

export default page;
