import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/AppContext';

const Post = ({blog}) => {
  const navigate  = useNavigate();
  const timestamp = blog.id;
  const date = new Date(timestamp);
  const id = parseInt(blog.id);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
 
  const goToEdit = () =>{
    navigate(`/edit/${blog.id}`);
  }
  
  const {deleteBlog} = useBlog(); 
 
  const removeBlog = () =>{
    deleteBlog(id);
  }

  return (
    <div className='border border-gray-600 rounded p-8 mt-8 mb-4'>
      <h2 className='text-xl font-semibold '>Author: {blog.author}</h2>
      <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
      <p className='mb-4 break-words whitespace-pre-wrap'>{blog.message}</p>
      <div className='flex flex-wrap gap-8 '>
      {blog.images.map((image,index) => (
            <img className="h-48 w-auto mb-4" key={index} src={image} alt={`image-${index}`}  />
        ))}
      </div>
      <h1>Posted at: {formattedDate}</h1>
      <div className='flex gap-4 mt-2'>
        <button onClick={goToEdit} className='bg-red-600 text-white rounded p-2 px-4'>Edit</button>
        <button onClick={removeBlog} className='bg-black text-white rounded p-2 px-4'>Delete</button>
      </div>
    </div>
  )
}

export default Post
