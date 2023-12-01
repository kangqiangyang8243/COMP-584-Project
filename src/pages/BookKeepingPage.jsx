import React, { useEffect, useState } from "react";
import BookKeepForm from "../components/BookKeepForm";
import BookKeepShow from "../components/BookKeepShow";
import { useNavigate } from "react-router-dom";

function BookKeepingPage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      navigate("/login");
    } else {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );

      setUser(users);
    }
  }, []);
  // console.log(user?._id);
  return (
    <div className="pt-[100px] bg-slate-50 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 p-10">
        {/* record form */}
        <BookKeepForm userId={user?._id} />
        {/* record show */}
        <BookKeepShow userId={user?._id} />
      </div>
    </div>
  );
}

export default BookKeepingPage;
