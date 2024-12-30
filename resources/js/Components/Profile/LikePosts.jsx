export function LikedPosts({ likedPosts = []}) {
  return (
    <div className="liked-posts">
      <h3 className="text-xl font-bold">Liked Posts</h3>
      <ul className="flex space-x-4">
      {likedPosts.length > 0 ? (
          likedPosts.map((post) => (
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
          <p>No likedPosts available</p>
        )}
      </ul>
    </div>
  );
}
