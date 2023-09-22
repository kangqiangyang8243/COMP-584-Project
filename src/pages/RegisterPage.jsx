import axios from "axios";
import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterPage() {
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleValidation = () => {
    if (username.length === 0 || password.length === 0) {
      toast.error("Please fill all fields");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sxct3o1ycomp584");

      const pic = await axios.post(
        `https://api.cloudinary.com/v1_1/dj5qwihzu/upload`,
        formData
      );

      const { url } = pic.data;

      // console.log(url);

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/register",
        {
          username,
          password,
          avatar: url,
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
      toast.error("Some fields are not in required.");
    }
  };

  return (
    <div className="w-full bg-gray-100 h-screen relative flex flex-col items-center justify-center bg-register bg-no-repeat bg-cover bg-center bg-fixed gap-5">
      <a href="/login">
        <div className=" absolute top-10 right-10 py-3  px-4 rounded-lg text-white ml-10 font-bold bg-red-600 hover:bg-red-500 active:bg-red-400">
          Login
        </div>
      </a>

      <div className="max-w-7xl mx-auto w-full p-4 flex flex-col items-center">
        <div className="w-full  ">
          <h1 className="text-[60px]  font-semibold font-serif text-center">
            Register
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col  w-full md:w-[40%] px-4 gap-5"
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">UserName</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="outline-none  border rounded-lg  p-3 placeholder:text-lg text-lg"
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

          <label>Avatar Image:</label>
          {file ? (
            <img
              onClick={() => setFile()}
              src={URL.createObjectURL(file)}
              alt=""
              className="w-20 h-20 rounded-lg  cursor-pointer bg-gray-300"
            />
          ) : (
            <label
              htmlFor="file"
              className="w-20 h-20 rounded-lg flex items-center cursor-pointer justify-center bg-gray-300"
            >
              <AiFillPicture className="w-7 h-7 text-gray-500" />
              <input
                id="file"
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
              />
            </label>
          )}

          <button
            type="submit"
            className="py-3 w-full mr-10 mt-5 px-4 rounded-lg text-white  font-bold bg-green-600 hover:bg-green-500 active:bg-green-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
