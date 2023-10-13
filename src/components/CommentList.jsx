import React from "react";

function CommentList() {
  return (
    <div className="border-b pb-5 flex gap-3">
      {/* <img
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
          src={
            user?.avatar
              ? user?.avatar
              : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
          }
          alt=""
        /> */}

      <img
        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
        src={
          "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
        }
        alt=""
      />

      <div className="w-full space-y-2">
        <h3 className="text-xl font-semibold">Yang</h3>
        <p className="break-all">assssssssssssssss</p>
      </div>
    </div>
  );
}

export default CommentList;
