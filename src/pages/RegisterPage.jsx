import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";

function RegisterPage() {
  const [file, setFile] = useState("");
  return (
    <div className="w-full bg-gray-100 h-screen relative flex flex-col items-center justify-center bg-register bg-no-repeat bg-cover bg-center bg-fixed gap-5">
      <a href="/login">
        <button className="absolute top-0 right-0 py-3  mr-10 mt-5 px-4 rounded-lg text-white ml-10 font-bold bg-red-400 hover:bg-red-500 active:bg-red-600">
          Login
        </button>
      </a>

      <div className="max-w-7xl mx-auto w-full p-4 flex flex-col items-center">
        <div className="w-full  ">
          <h1 className="text-[60px]  font-semibold font-serif text-center">
            Register
          </h1>
        </div>

        <form
          //   onSubmit={handleSubmit}
          className="flex flex-col  w-full md:w-[40%] px-4 gap-5"
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">UserName</label>
            <input
              //   value={username}
              //   onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="outline-none  border rounded-lg  p-3 placeholder:text-lg text-lg"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">Password</label>
            <input
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
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
