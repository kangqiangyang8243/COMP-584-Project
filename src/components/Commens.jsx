import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function Comments({ postId }) {
  // console.log(postId);
  const { id } = useParams();

  // console.log(id);

  const [comment, SetComment] = useState();
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );
      // console.log(user);
      setUsername(users.username);
      setUserAvatar(users.avatar);
    } else {
      setUsername(null);
      setUserAvatar(null);
    }

    refetch();
  }, [id]);

  // console.log(username, userAvatar);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["comment_post"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/comments/${id}`)
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(data);

  const mutation = useMutation({
    mutationFn: async (commentPost) => {
      return await axios
        .post(import.meta.env.VITE_API_URL + "/comments", commentPost)
        .then((res) => {
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comment_post"]);
      toast.success("Comment posted successfully!");
      SetComment(null);
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      postId: postId,
      username: username,
      userAvatar: userAvatar,
      comment: comment,
    });
    refetch();
  };
  return (
    <div className="lg:mb-20 max-w-7xl space-y-5 w-full mx-auto">
      <h3 className="text-xl font-bold border-b pb-2">Comment</h3>

      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Something Went Wrong!
        </div>
      ) : (
        data
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          ?.map((comments) => (
            <CommentList key={comments?._id} comments={comments} />
          ))
      )}

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full flex items-center border-2 rounded-md"
      >
        <input
          value={comment || ""}
          onChange={(e) => SetComment(e.target.value)}
          type="text"
          placeholder="Input your Comment.."
          className="outline-none border-none w-full pl-4"
        />
        <button
          type="submit"
          className="p-3 bg-slate-400 rounded-tr-md rounded-br-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
