import React, { useState } from "react";
import CommentList from "./CommentList";

function Comments() {
  const [comment, SetComment] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="lg:mb-20 max-w-7xl space-y-5 w-full mx-auto">
      <h3 className="text-xl font-bold border-b pb-2">Comment</h3>
      <CommentList />

      <CommentList />

      <CommentList />

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full flex items-center border-2 rounded-md"
      >
        <input
          value={comment || ""}
          onChange={(e) => SetComment(e.target.value)}
          type="text"
          placeholder="Input your Comment.."
          className="outline-none border-none w-full pl-4"
        />
        <button
          type="submit"
          className="p-3 bg-slate-400 rounded-tr-md rounded-br-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
