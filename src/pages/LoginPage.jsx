import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleLogin()) {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        {
          username,
          password,
        }
      );

      // console.log(res);

      if (res.data.status === false) {
        toast.error(res.data.msg);
      }
      if (res.data.status === true) {
        // console.log(res.data);
        localStorage.setItem(
          import.meta.env.VITE_TOKEN,
          JSON.stringify(res.data.userWithoutPassword)
        );
        toast.success("Register Success!");
        navigate("/");
      }
    } else {
      toast.error("Please enter your username and password!");
    }
  };

  return (
    <div className="w-full bg-gray-100 h-screen flex items-center justify-center bg-login bg-no-repeat bg-cover bg-center bg-fixed relative">
      <a href="/register">
        <div className=" absolute top-10 right-10 py-3  px-4 rounded-lg text-white ml-10 font-bold bg-green-600 hover:bg-green-500 active:bg-green-400">
          Register
        </div>
      </a>
      <div className="max-w-7xl mx-auto w-full p-4 flex flex-col items-center">
        <div className="w-full  ">
          <h1 className="text-[60px]  font-semibold font-serif text-center">
            Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full md:w-[40%] px-4 gap-5 font-serif"
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="outline-none  border rounded-lg p-3 placeholder:text-lg text-lg"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="outline-none  border rounded-lg p-3 placeholder:text-lg text-lg"
            />
          </div>

          <button
            type="submit"
            className="py-3 w-full md:w-[50%] mr-10 mt-5 px-4 rounded-lg text-white ml-10 font-bold bg-red-400 hover:bg-red-500 active:bg-red-600 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
