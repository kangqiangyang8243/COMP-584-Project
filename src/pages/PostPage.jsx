import React from "react";
import Header from "../components/header";
import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import PostContent from "../components/PostContent";

function PostPage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col ">
      <div className="flex flex-col   lg:grid grid-cols-6 gap-5">
        <div className="col-span-4 ">
          <PostContent />
        </div>
        <div className="col-span-2 mt-5">
          <div className="gap-5 flex flex-col lg:gap-10 sticky top-[10px]">
            <RecentPost />

            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
