import React from "react";
import Card from "../components/BlogCard/Card";
import { useBlogContext } from "../context/ContextProvider";

function ExploreBlogs() {
  const { context } = useBlogContext();
  console.log(context.exploreBlogs);
  return (
    <div className="w-full p-10 min-h-screen h-auto  bg-slate-950">
      {context.exploreBlogs.length === 0 ? (
        <h2 className="text-center text-white">
          Blogs are not available please <br /> refresh
        </h2>
      ) : (
        <div className="w-full min-h-screen h-auto display-grid">
          {context.exploreBlogs.map((blog) => (
            <Card
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              description={blog.description}
              blogImage={blog.blogImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreBlogs;
