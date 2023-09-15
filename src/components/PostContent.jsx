import React from "react";
import { AiFillCalendar } from "react-icons/ai";

function PostContent() {
  return (
    <div className="shadow-md  rounded-lg flex flex-col gap-10 p-5 cursor-pointer ">
      <img
        src="../../public/1321.jpg"
        className="w-full  object-cover  "
        alt=""
      />

      <div className="flex flex-col  gap-10">
        <h3 className="font-semibold text-xl  lg:text-[30px]">
          Useful Chrome Extensions that you shouldn't Miss Out
        </h3>
        <div className="text-[20px] flex gap-10">
          <div className="flex items-center gap-2">
            <img
              className="w-7 h-7 rounded-full"
              src="../../public/1321.jpg"
              alt=""
            />
            <span>Poster name</span>
          </div>

          <div className="flex items-center gap-2">
            <AiFillCalendar className="text-red-300" />
            <span> 9/15/2023</span>
          </div>
        </div>

        <div>
          <p className="text-gray-600 ">
            Nulla dolor velit adipisicing duis excepteur esse in duis nostrud
            occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex
            occaecatNulla dolor velit adipisicing duis excepteur esse in duis
            nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum
            ex occaecatNulla dolor velit adipisicing duis excepteur esse in duis
            nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum
            ex occaecat
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
