import React from "react";

function RecentPost() {
  return (
    <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
      <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b ">
        Recent Post
      </h3>

      <div className="flex flex-col gap-4 cursor-pointer ">
        <div className="flex items-center gap-1 hover:shadow-md rounded-lg p-2 transform duration-100 ease-linear">
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
            src="../../public/1321.jpg"
            alt=""
          />
          <div>
            <p className="font-semibold lg:text-lg">Kangqiang Yang</p>
            <p className="line-clamp-2 ">
              Useful Chrome Extensions that you shouldn't Miss Out
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:shadow-md rounded-lg p-2 transform duration-100 ease-linear">
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
            src="../../public/1321.jpg"
            alt=""
          />
          <div>
            <p className="font-semibold lg:text-lg">Kangqiang Yang</p>
            <p className="line-clamp-2 ">
              Useful Chrome Extensions that you shouldn't Miss Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
