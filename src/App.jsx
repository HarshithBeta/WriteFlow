import React, { useEffect,useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes, UNSAFE_deserializeErrors } from 'react-router-dom'
import Homepage from "./components/Homepage"
import Newblog from "./components/Newblog"
import Edit from "./components/Edit"
import { BlogProvider } from './contexts/AppContext'
import Footer from './components/Footer'

function App() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (blog) =>{
    setBlogs((prev)=>[{id:Date.now(),...blog},...prev]);
  }
  const editBlog = (id,blog) =>{
    setBlogs((prev)=>prev.map((currBlog)=>currBlog.id===id?blog:currBlog));
  }
  const deleteBlog = (id) =>{
    setBlogs((prev)=>prev.filter((currBlog)=>currBlog.id!==id));
  }

  useEffect(()=>{
    const Blogs = JSON.parse(localStorage.getItem("blogs"));
    if(Blogs && Blogs.length>0){
      setBlogs(Blogs);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("blogs",JSON.stringify(blogs));
  },[blogs])

  return (
    <BlogProvider value={{blogs,addBlog,editBlog,deleteBlog}}>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Homepage blogs={blogs} />} />
            <Route path="/new" element={<Newblog />} />  
            <Route path='/edit/:id' element = {<Edit/>}></Route>
          </Routes>
          <Footer/>
      </Router>
    </BlogProvider>
    
  )
}

export default App
