import React from 'react';
import Post from './Post';

const Homepage = ({blogs}) => {
  return (
    <div className='mx-[5%] mt-8 min-h-screen'>
      <h1 className='text-xl md:text-4xl font-semibold'>Recent Blogs</h1>
      {blogs.map((blog)=>(
        <Post blog={blog} key={blog.id}></Post>
      ))}
    </div>
  );
}

export default Homepage;
