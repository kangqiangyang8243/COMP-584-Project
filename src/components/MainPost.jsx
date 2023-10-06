import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import H_Post from "./H_Post";

function MainPosts() {
  const [catposts, SetCatPosts] = useState();
  const { search } = useLocation();
  //   console.log(search);

  useEffect(() => {
    const fetchCatPost = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/posts/" + search
      );

      // console.log(res);
      SetCatPosts(res.data);
    };

    fetchCatPost();
  }, [search]);
  return (
    <div>
      {!catposts ? (
        <div className="font-semibold font-serif text-gray-500 text-center">
          Loading.....
        </div>
      ) : (
        <>
          {catposts
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.map((post) => (
              <H_Post key={post?._id} posts={post} />
            ))}
        </>
      )}
    </div>
  );
}

export default MainPosts;
