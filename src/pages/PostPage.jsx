import React from "react";
import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import PostContent from "../components/PostContent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function PostPage() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["single_post"],
    queryFn: () =>
      axios.get(import.meta.env.VITE_API_URL + `/posts/${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get(import.meta.env.VITE_API_URL + "/posts/").then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col ">
      <div className="flex flex-col mt-28  lg:grid grid-cols-6 gap-5">
        <div className="col-span-4 ">
          {isLoading ? (
            <div className="font-semibold font-serif text-gray-500 mx-auto">
              Loading.....
            </div>
          ) : error ? (
            "Something went wrong!"
          ) : (
            <PostContent
              posts={data}
              postId={data?._id}
              userId={data?.userId}
            />
          )}
        </div>
        <div className="col-span-2 mt-5">
          <div className="gap-5 flex flex-col lg:gap-10 sticky top-[120px]">
            <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
              <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b ">
                Recent Post
              </h3>

              {postsLoading ? (
                <div className="font-semibold font-serif text-gray-500 mx-auto">
                  Loading.....
                </div>
              ) : postsError ? (
                "Something went wrong!"
              ) : (
                postsData
                  ?.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .slice(0, 3)
                  ?.map((post) => <RecentPost key={post?._id} posts={post} />)
              )}
            </div>

            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
