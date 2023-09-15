import React from "react";

function LoginPage() {
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

        <form className="flex flex-col items-center w-full md:w-[40%] px-4 gap-5 font-serif">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-xl pl-2">Username</label>
            <input
              //   value={username}
              //   onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="outline-none  border rounded-lg p-3 placeholder:text-lg text-lg"
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
