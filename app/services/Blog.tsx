"use client"

import { div } from 'framer-motion/client'
import React, {useState } from 'react'


const blog = () => {
    const [posts,setPosts] = useState([{title: 'My First Post', content: 'This is the content of my first post.'}])
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        const newPost = { title, content }
        setPosts([...posts, newPost])
        setTitle('')
        setContent('')
    }

    const handleChange = (e:any)=>{
        setTitle(e.target.value)
    }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>Blog</h1>
      <p className='mt-4 text-lg'>Welcome to our blog! Here you will find the latest news and updates.</p>
      <hr />
      <div className='w-full flex flex-col items-center justify-between'>
        <h2 className='text-2xl font-semibold mt-6'>Latest Posts</h2>
        <div className='flex flex-col gap-4'>
            {
                posts && posts.length > 0 && (
                    <div className='w-full mt-6 flex flex-col'>
                        {posts.map((post, index) => (
                            <div key={index} className='w-full flex flex-col gap-5 border-b border-gray-300 py-4'>
                                <h3 className='text-xl font-semibold'>{post.title}</h3>
                                <p className='mt-2'>{post.content}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
      </div>
      <div className='w-full mt-10 flex flex-col items-center justify-center'>
        <form action="" onSubmit={handleSubmit} className='w-full flex flex-col gap-5 mt-6'>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className='w-full p-2 border text-dark-500 border-gray-300 rounded' placeholder='Post Title' />
          <textarea onChange={(e) => setContent(e.target.value)} value={content} className='w-full h-32 p-2 border text-dark-500 border-gray-300 rounded' placeholder='Write your post here...'></textarea>
          <button type='submit' className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>Publish</button>
        </form>
      </div>

    </div>
  )
}

export default blog