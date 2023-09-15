import React from "react";
import { AiFillCalendar } from "react-icons/ai";

function H_Post() {
  return (
    <div className="shadow-md   group hover:shadow-xl overflow-hidden rounded-lg flex flex-col gap-5 p-5 cursor-pointer ">
      <img
        src="../../public/1321.jpg"
        className="w-full h-[300px] object-cover group-hover:scale-110 transform duration-150 ease-linear "
        alt=""
      />

      <div className="flex flex-col items-center gap-4">
        <h3 className="font-semibold text-xl text-center lg:text-[30px]">
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

        <div className="w-[60%]">
          <p className="text-gray-600 text-center line-clamp-2 lg:line-clamp-3">
            Nulla dolor velit adipisicing duis excepteur esse in duis nostrud
            occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex
            occaecatNulla dolor velit adipisicing duis excepteur esse in duis
            nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum
            ex occaecatNulla dolor velit adipisicing duis excepteur esse in duis
            nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum
            ex occaecat
          </p>
        </div>

        <button className="bg-blue-300 font-semibold p-2 rounded-lg shadow-md hover:shadow-lg  transform duration-100 ease-linear hover:bg-blue-400 text-white">
          Continue Reading
        </button>
      </div>
    </div>
  );
}

export default H_Post;
