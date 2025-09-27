"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BlogPage() {
    const [title, setTitle] =useState('');
    const [content,setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [posts,setPosts] = useState('' as any);

    useEffect(()=>{
      const getPost = async ()=>{
      try{
        await axios.get('/api/blog')
        .then((response)=>{
          setPosts(response.data);
          console.log(response.data);
        });
      }catch(error){
        console.log("Sorry was not successful", error);
      }
    }
      getPost();
    },[])

    const handleDeletePost = async (id:any)=>{
      console.log(id)
        try{
            await axios.delete(`/api/blog/${id}`);
            setPosts(posts.filter((post: { _id: string })=> post._id !== id));
            alert('Blog post deleted successfully!');
        }catch(error){
            console.log("Sorry was not successful", error);
        }
    }
    
    
   const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here

    setPosts([...posts, { title, content, author, createdAt: new Date().toISOString(), _id: Math.random().toString(36).substr(2, 9) }]);
    try{
        const response = await axios.post('/api/blog', { author, title, content });
        alert('Blog post created successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
    } catch (error) {
        console.error('Error creating blog post:', error);
    }
  }
  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4 dark:text-gray-400 ">Blog Page</h1>
      <p className="text-lg dark:text-gray-500">Welcome to the blog page!</p>
    
      <div className="w-full max-w-2xl mt-8">
        <h2 className='dark:text-gray-200'>Blog Posts</h2>
            {posts && posts.length > 0 ? (
              posts.map((post: { _id: string; title: string; content: string; author: string; createdAt: string }) => (
                <div onClick={() => handleDeletePost(post._id)} key={post._id} className="border p-4 my-2 rounded-lg shadow-lg dark:bg-gray-200/30 border-[#1f1f1f]/20">  
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-[#01d61dff]">By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2">{post.content}</p>
                </div>
              ))
            ) : (
              <p>No blog posts available.</p>
            )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="text" onChange={(e)=>setAuthor(e.target.value)} value={author} id='author' name='author' placeholder='Authors name' />
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} id='title' name='title' placeholder='Post Title' />
            <input type="text" onChange={(e)=>setContent(e.target.value)} value={content} id='content' name='content' placeholder='Enter post content' />
            <button className='p-5 min-w-[150] rounded-lg outline cursor-pointer'>Submit</button>
      </form>  
    </div>
  );
}