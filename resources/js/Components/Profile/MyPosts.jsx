export function MyPosts({ posts}) {
  // console.log('image', posts.image)
  // console.log('description', posts.description)
  // console.log('title', posts.title)
  console.log(posts);


  return (
    <div className="my-posts">
      <h3 className="text-xl font-bold">My Posts</h3>
      <div>
      <ul className=" flex space-x-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="py-2 border-b w-[200px]">
              {post.title}
              {post.image ?
              (
                <img src={`/storage/public/images/${post.image}`} className="w-full h-[200px] object-cover"></img>
              ) : 
              (
                <p>No image</p>
              )}
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
    </div>

  );
}