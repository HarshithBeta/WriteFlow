import {React,useState} from 'react';
import { useBlog } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Newblog = () => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [images, setImages] = useState([]);
  
  const {addBlog} = useBlog();
  const navigate  = useNavigate();

  const add = (e) =>{
    e.preventDefault();
    if(!message||!author||!title) return;
    addBlog({author,title,message,images});
    setMessage("");
    navigate("/");
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readerPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((newImages) => {
      setImages((prevImages) => [...prevImages, ...newImages]);
    });
  };

  return (
    <div className='flex flex-col items-center mt-10 w-full h-auto min-h-screen'>
      <h1 className='md:text-3xl text-xl mb-4'>Create a new Blog</h1>
      <form onSubmit={add} className='w-full h-auto flex flex-col items-center '>
        <input onChange={(e)=>setAuthor(e.target.value)} placeholder='Author name' className='border border-gray-400 rounded h-12 w-[70%] p-4 mx-[3%] mb-4'></input>
        <input onChange={(e)=>setTitle(e.target.value)} placeholder='Title' className='border border-gray-400 rounded h-12 w-[70%] p-4 mx-[3%] mb-4'></input>
        <textarea onChange={(e)=>setMessage(e.target.value)} value={message} placeholder='Type Here' className='border border-gray-400 rounded h-96 w-[70%] p-4 mx-[3%] mb-4'></textarea>
        <input onChange={handleImageChange} type='file' accept="image/*" multiple className='border border-gray-400 rounded h-12 w-[70%] p-4 mx-[3%] mb-10 pb-12'></input>
        <button className='border border-black bg-red-500 text-white p-3 rounded w-24 mb-10'>Submit</button>
      </form>
    </div>
  );
}

export default Newblog;
