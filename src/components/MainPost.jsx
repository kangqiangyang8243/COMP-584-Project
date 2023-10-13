import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import H_Post from "./H_Post";
import { useQuery } from "@tanstack/react-query";

function MainPosts() {
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Search_posts"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/posts/" + search)
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [search]);

  // console.log(data);

  // console.log(import.meta.env.VITE_API_URL + `/posts${search}`);

  return (
    <div>
      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Something Went Wrong!
        </div>
      ) : (
        data
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          ?.map((post) => <H_Post key={post?._id} posts={post} />)
      )}
    </div>
  );
}

export default MainPosts;
