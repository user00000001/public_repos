import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Post } from "./postsSlice";
import './posts.css';

export const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  const renderedPosts = posts.map((post: Post) => {
    return (
    <article className="post-excerpt bg-amber-400 text-3xl font-bold underline" key={post.id}>
    <h3>{post.title}</h3>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  )
})

  return (
    <section className="posts-list flex flex-col items-center pt-3 space-y-8">
    <h2>Posts</h2>
    {renderedPosts}
    </section>
  )
}