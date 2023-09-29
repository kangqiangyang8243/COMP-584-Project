import React, { useEffect, useState } from "react";
import Header from "../components/header";
import H_Post from "../components/H_Post";

import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import CardView from "../components/cardView";
import axios from "axios";
import { Link } from "react-router-dom";

function Homepage() {
  const [posts, SetPosts] = useState();
  const [Cuser, setCUser] = useState();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem(import.meta.env.VITE_TOKEN));

    const fetchPost = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/posts/");

      // console.log(res);
      SetPosts(res.data);
    };
    setCUser(users);

    fetchPost();
  }, []);

  // console.log(Cuser);

  // console.log(posts);
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      <CardView />

      <div className="flex flex-col-reverse   lg:grid grid-cols-5 gap-5 m-2">
        <div className="col-span-4 lg:col-span-3 overflow-hidden ">
          {posts
            ?.sort((a, b) => b.createdAt - a.createdAt)
            ?.map((post) => (
              <H_Post key={post?._id} posts={post} user={Cuser} />
            ))}
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
