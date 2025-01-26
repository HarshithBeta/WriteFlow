import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-emerald-400 flex justify-between items-center p-4'>
      <h1 className='text-xl text-white font-semibold'>MyBlogger</h1>
      <div className='flex gap-6'>
        <Link to="/" className='text-black'>Home</Link>
        <Link to="/new" className='text-black'>Add New Blog</Link>
        <Link to="/" className='text-black'>All Blogs</Link>
      </div>
    </div>
  )
}

export default Navbar
