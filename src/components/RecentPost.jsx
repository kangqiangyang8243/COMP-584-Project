import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecentPost({ posts }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/users/${posts?.userId}`
      );

      // console.log(res.data);
      setUser(res.data);
    };

    fetchUser();
  }, [posts]);

  // console.log(user);
  // console.log(posts);
  const handleChange = () => {
    window.location.replace(
      import.meta.env.VITE_BASIC_URL + `post/${posts?._id}`
    );
  };
  return (
    <div onClick={handleChange} className="flex flex-col gap-4 cursor-pointer ">
      <div className="flex items-center gap-3 hover:shadow-md rounded-lg p-2 transform duration-100 ease-linear">
        <img
          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
          src={
            user?.avatar
              ? user?.avatar
              : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
          }
          alt=""
        />
        <div>
          <p className="font-semibold lg:text-lg">{user?.username}</p>
          <p className="line-clamp-2 ">{posts?.title}</p>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
