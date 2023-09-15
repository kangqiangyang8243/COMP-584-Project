import React from "react";

function cardView() {
  return (
    <div className="w-full font-serif ">
      <div className="max-w-7xl mx-auto flex flex-row items-center gap-3 overflow-x-scroll p-2 ">
        <div className="p-4 min-w-[400px] lg:w-[400px] relative cursor-pointer transform duration-100 shadow-md rounded-lg  hover:shadow-xl group">
          <img
            src="../../public/1321.jpg"
            className="cursor-pointer h-[300px] object-cover w-full rounded-lg group-hover:scale-110 duration-150 transform ease-linear"
            alt=""
          />
          <div className="absolute m-auto left-0 right-0 top-0 w-52 h-48 bottom-0 gap-5 flex flex-col items-center justify-between  text-white">
            <h3 className="text-xl">Sep 03 2023</h3>
            <h2 className="text-2xl font-bold">Nice Wwork</h2>
            <div className="flex items-center gap-2">
              <div className="rounded-full border-2 p-1">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="../../public/1321.jpg"
                  alt=""
                />
              </div>
              <p>Soga Compus</p>
            </div>
          </div>
        </div>

        <div className="p-4 min-w-[400px] lg:w-[400px] relative cursor-pointer transform duration-100 shadow-md rounded-lg  hover:shadow-xl group">
          <img
            src="../../public/1321.jpg"
            className="cursor-pointer h-[300px] object-cover w-full rounded-lg group-hover:scale-110 duration-150 transform ease-linear"
            alt=""
          />
          <div className="absolute m-auto left-0 right-0 top-0 w-52 h-48 bottom-0 gap-5 flex flex-col items-center justify-between  text-white">
            <h3 className="text-xl">Sep 03 2023</h3>
            <h2 className="text-2xl font-bold">Nice Wwork</h2>
            <div className="flex items-center gap-2">
              <div className="rounded-full border-2 p-1">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="../../public/1321.jpg"
                  alt=""
                />
              </div>
              <p>Soga Compus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cardView;
