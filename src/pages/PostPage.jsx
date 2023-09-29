import React, { useEffect, useState } from "react";
import RecentPost from "../components/RecentPost";
import Categories from "../components/Categories";
import PostContent from "../components/PostContent";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/posts/${id}`
      );

      // console.log(res.data);
      setPost(res.data);
    };

    fetchPosts();
  }, [id]);
  // console.log(post);
  return (
    <div className="max-w-7xl mx-auto flex flex-col ">
      <div className="flex flex-col   lg:grid grid-cols-6 gap-5">
        <div className="col-span-4 ">
          <PostContent posts={post} />
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
