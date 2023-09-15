import React from "react";
import Header from "../components/header";
import H_Post from "../components/H_Post";

import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import CardView from "../components/cardView";

function Homepage() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      <CardView />

      <div className="flex flex-col-reverse   lg:grid grid-cols-5 gap-5 m-2">
        <div className="col-span-4 lg:col-span-3 ">
          <H_Post />
          <H_Post />
        </div>
        <div className="col-span-2 ">
          <div className="gap-5 flex flex-col lg:gap-10 sticky top-[10px]">
            <RecentPost />

            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
