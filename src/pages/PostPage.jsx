import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
} from "react-icons/ai";
import Moment from "react-moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { removePost } from "../redux/features/post/postSlice";
import {
  createComment,
  getPostComments,
} from "../redux/features/comment/commentSlice";
import { CommentItem } from "../components/CommentItem";
import { toast } from "react-toastify";

export const PostPage = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("Пост був видалений");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Назад
        </Link>
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`https://backend-for-posts-production.up.railway.app}/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye />
                  <span>{post.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {user?._id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 text-white opacity-50"
                    onClick={removePostHandler}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
            >
              Отправить
            </button>
          </form>

          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  );
};
