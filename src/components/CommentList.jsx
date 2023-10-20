import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TimeAgo from "react-timeago";

function CommentList({ comments }) {
  // console.log(comments);

  return (
    <div className="border-b pb-5 flex gap-3">
      <img
        className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
        src={
          comments?.userAvatar
            ? comments?.userAvatar
            : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
        }
        alt=""
      />

      <div className="w-full flex justify-between px-2">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold">{comments?.username}</h3>
          <p className="break-all text-lg">{comments?.comment}</p>
        </div>

        <TimeAgo className="text-md " date={comments?.createdAt} />
      </div>
    </div>
  );
}

export default CommentList;
