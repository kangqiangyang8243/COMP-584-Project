import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AiFillPicture } from "react-icons/ai";
import { toast } from "react-toastify";

function CreatePostPage() {
  const [cats, setCats] = useState();
  const [catTitle, setCatTitle] = useState("Web Project");
  const [user, setUser] = useState();
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      navigate("/login");
    } else {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );

      const fetchCategories = async () => {
        const category = await axios
          .get(import.meta.env.VITE_API_URL + "/category/getCat")
          .then((res) => setCats(res.data.category));

        return category;
      };

      setUser(users);
      fetchCategories();
    }
  }, []);

  //   console.log(cats);
  //   console.log(user);
  //   console.log(catTitle);
  //   console.log(content);
  //   console.log(title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sxct3o1ycomp584");
      const pic = await axios.post(
        `https://api.cloudinary.com/v1_1/dj5qwihzu/upload`,
        formData
      );

      const { url } = pic.data;

      // console.log(url);

      try {
        const newPost = {
          title: title,
          content: content,
          img: url,
          userId: user._id,
          categories: catTitle,
        };

        await axios
          .post(import.meta.env.VITE_API_URL + "/posts/", newPost)
          .then((res) => {
            toast.success("Post created successfully!");
            navigate("/");
          });
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      toast.error("Picture is Required");
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent element
  };

  return (
    <div className="max-w-7xl p-4 mx-auto w-full h-screen flex flex-col gap-3 pt-28">
      {file ? (
        <img
          onClick={() => setFile()}
          src={URL.createObjectURL(file)}
          alt=""
          className="cursor-pointer w-full object-cover h-[50%] rounded-lg hover:scale-105 transform ease-out duration-150"
        />
      ) : (
        <label
          htmlFor="file"
          className="cursor-pointer bg-slate-300 flex items-center w-full object-cover h-[100%] rounded-lg hover:scale-105 transform ease-out duration-150"
        >
          <AiFillPicture className="w-[60px] h-[60px] mx-auto  text-gray-500" />
          <input
            id="file"
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg "
          />
        </label>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-screen gap-5 items-center justify-between"
      >
        <div className="flex items-center w-full">
          <label htmlFor="InputFile">
            <GrAddCircle className="cursor-pointer  text-3xl" />
          </label>
          <input
            type="file"
            id="InputFile"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className=" bg-transparent px-3 w-full py-4 outline-none border-b text-3xl placeholder:text-3xl mx-3"
          />
        </div>

        <div className="flex items-center w-full">
          <div className="flex flex-col space-y-2 w-full flex-grow">
            <select
              onChange={(e) => setCatTitle(e.target.value)}
              className="border-2 border-gray-200 text-black p-2 rounded-md"
            >
              {cats?.map((cat) => (
                <option key={cat._id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <button
            type="reset"
            onClick={() => {
              setFile(null);
              setCatTitle("Web Project");
              setTitle(null);
              setContent("");
            }}
            className="py-2 px-8 rounded-lg text-white ml-10 font-bold bg-red-600 hover:bg-red-500 active:bg-red-400"
          >
            Discard
          </button>
          <button
            type="submit"
            className="py-2 px-8 rounded-lg text-white ml-10 font-bold bg-green-600 hover:bg-green-500 active:bg-green-400"
          >
            Publish
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Input You Descrition"
          className="h-full w-full bg-transparent rounded-lg shadow-sm pb-[200px] placeholder:text-xl text-xl outline-none border p-4 mb-20"
        />
      </form>
    </div>
  );
}

export default CreatePostPage;
