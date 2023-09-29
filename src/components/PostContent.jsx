import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";

function PostContent({ posts }) {
  const [user, setUser] = useState();

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
  return (
    <div className=" flex flex-col gap-10 p-5 cursor-pointer ">
      <img src={posts?.img} className="w-full  object-cover  " alt="" />

      <div className="flex flex-col  gap-10">
        <h3 className="font-semibold text-3xl  lg:text-[30px]">
          {posts?.title}
        </h3>
        <div className="text-[20px] flex gap-10">
          <div className="flex items-center gap-2">
            <img className="w-7 h-7 rounded-full" src={user?.avatar} alt="" />
            <span>{user?.username}</span>
          </div>

          <div className="flex items-center gap-2">
            <AiFillCalendar className="text-red-300" />
            <span> {moment(posts?.createdAt).format("DD/MM/YYYY")}</span>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-xl md:text-3xl">{posts?.content}</p>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
