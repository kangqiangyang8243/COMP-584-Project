import React, { useEffect, useState } from "react";
import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import CardView from "../components/cardView";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MainPosts from "../components/MainPost";

function Homepage() {
  const [posts, SetPosts] = useState();

  const [searchParams] = useSearchParams();

  let catQuery = searchParams.get("catName");
  let searchQuery = searchParams.get("search");

  // console.log(searchParams.get("catName"));
  // console.log(searchParams.get("search"));

  // console.log(search);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/posts/");

      // console.log(res);
      SetPosts(res.data);
    };

    fetchPost();
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      <div className="flex flex-row items-center gap-3 overflow-x-scroll px-5 py-3 pb-10 border-b-2">
        {!posts ? (
          <div className="font-semibold font-serif text-gray-500 mx-auto">
            Loading.....
          </div>
        ) : (
          <>
            {posts
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((post) => (
                <CardView key={post?._id} posts={post} />
              ))}
          </>
        )}
      </div>

      <div className="lg:grid grid-cols-5">
        <div className="col-span-3">
          <h3 className=" text-2xl md:text-4xl px-5 py-10 font-serif">
            Search:{" "}
            <span className="font-semibold underline underline-offset-8 text-3xl md:text-5xl">
              {catQuery ? catQuery : searchQuery ? searchQuery : `Newest`}
            </span>
          </h3>

          <div className="flex flex-col-reverse    gap-5 m-2">
            <div className="col-span-4 lg:col-span-3 overflow-hidden ">
              <MainPosts />
            </div>
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="gap-5 flex flex-col lg:gap-10 sticky top-[10px]">
            <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
              <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b ">
                Recent Post
              </h3>

              {!posts ? (
                <div className="font-semibold font-serif text-gray-500 text-center">
                  Loading.....
                </div>
              ) : (
                <>
                  {posts
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(0, 3)
                    ?.map((post) => (
                      <RecentPost key={post?._id} posts={post} />
                    ))}
                </>
              )}
            </div>

            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
