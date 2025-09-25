

export default async function BlogPage() {
    const data = await fetch('https://api.vercel.app/blog', { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    
    if (!data.ok) {
      throw new Error('Failed to fetch data');
      console.log("fail to fetch data oooh!")
    }else{
      const posts = await data.json()
      console.log(posts);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
}
