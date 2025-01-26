import {React,useEffect,useState} from 'react';
import { useBlog } from '../contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const {blogs,editBlog} = useBlog();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const currBlog = blogs.find((blog) => blog.id === parseInt(id));
    if(currBlog){
        setAuthor(currBlog.author);
        setTitle(currBlog.title);
        setMessage(currBlog.message);
        setImages(currBlog.images||[]);
    }
  },[blogs,id]);
  
  const change = (e) =>{
    e.preventDefault();
    const currBlog = {
        id:parseInt(id),
        author,
        title,
        message,
        images,
    }
    editBlog(parseInt(id),currBlog);
    navigate("/");
  }

  return (
    <div className='flex flex-col items-center mt-10 w-full h-auto min-h-screen'>
      <h1 className='md:text-3xl text-xl mb-4'>Edit your Blog</h1>
      <form onSubmit={change} className='w-full h-auto flex flex-col items-center '>
        <input value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder='Author name' className='border border-gray-400 rounded h-12 w-[70%] p-4 mx-[3%] mb-4'></input>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' className='border border-gray-400 rounded h-12 w-[70%] p-4 mx-[3%] mb-4'></input>
        <textarea onChange={(e)=>setMessage(e.target.value)} value={message} placeholder='Type Here' className='border border-gray-400 rounded h-96 w-[70%] p-4 mx-[3%] mb-4'></textarea>
        <h1 className='mb-2'>*Images once added can't be changed</h1>
        <button className='border border-black bg-red-500 text-white p-3 rounded w-24 mb-10'>Save</button>
      </form>
    </div>
  );
}

export default Edit;
