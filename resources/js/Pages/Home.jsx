import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';


export default function Index({all_posts,auth, suggested_users}) {

    const [users, setUsers] = useState(suggested_users);
    console.log(suggested_users)
    
    function deletePost(id) {
        if(confirm("Are you sure you want to delete this post?")) {
            router.delete(route('posts.destroy', id), {
                preserveScroll:true,
            })
        }
    }

    function addLike(id) {
        router.post(route('like.store', { id }), {}, {
        preserveScroll: true,
        });
    }

    function deleteLike(id) {
        router.delete(route('like.destroy', { id }), {
        preserveScroll: true,
        });
    }

    const follow = async (id) => {
        try {
            await axios.post(route('follow.store', {id}));
            setUsers((prevUsers) => prevUsers.filter(user => user.id != id));
        } catch(error) {
            console.log(error);
        };
    }

    function goShow(id) {
        router.get(route('profile.show', { id }), {
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    home
                </h2>
            }
        >
            <Head title="Posts List" />

            <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    
                    <div className="mt-4 sm:mt-0 sm:flex sm:justify-between">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-xl">All posts</h3>
                            <p className="text-gray-700">Hello! {auth.user.name}</p>
                        </div>
                            <div>
                                <Link
                                    href={route('posts.create')}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
                                    m-5"
                                >
                                    Add Post
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div className="flex mx-auto w-[75%]">
            
            <div className="bg-gray-100">
    {all_posts && all_posts.data.length > 0 ? (
        all_posts.data.map((post, i) => {
            return (
                <div className="max-w-3xl rounded overflow-hidden shadow-lg shadow-md m-4 bg-white" key={i}>
                    <div className="py-4 w-[75%] mx-auto">
                        <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl mb-2 inline">{post.title}</h2>

                        <div className="flex space-x-4">  
                        {/* Edit Button */}
                        <Link
                            href={route('posts.edit', post.id)}
                            className="inline-block text-white  rounded-md border border-transparent bg-indigo-600 px-4 py-1 hover:text-indigo-900 text-decoration-none m-5"
                        >
                            Edit
                        </Link>

                        {/* Delete Button */}
                        <button
                            onClick={() => {
                                deletePost(post.id);
                            }}
                            className="inline-block text-white rounded-md border border-transparent bg-red-400 px-4 py-1 m-5 hover:text-black"
                        >
                            Delete
                        </button>
                        </div>
                        </div>

                        <div>
                            {/* likebutton */}
                            {post.hasLiked ? (
                                <button onClick={() => deleteLike(post.id)} className="text-red-500">
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                            ) : (
                                <button onClick={() => addLike(post.id)} className="text-red-500">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            )}
                        </div>

                        {/* categories section */}
                        <div>
                            {post.categories.map((category, i) => {
                                return (
                                    <div key={i} className="inline-block">
                                        <p className="inline-block text-white rounded-md px-2 me-1 bg-gray-200">
                                            {category.category_name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="text-gray-700 text-base my-3">{post.description}</p>
                        {post.image && (
                        <div className="flex justify-center">

                            <img
                                src={`/storage/public/images/${post.image}`}
                                alt="Post Image"
                                className="max-w-full h-auto"
                            />
                        </div>

                        )}
                    </div>

                    <div className="px-6 py-4 flex items-center justify-end">
                        <span className="text-gray-500 text-sm">Posted User: {post.owner.name}</span>
                        <span className="text-gray-500 text-sm">Posted on: {post.created_at}</span>
                    </div>
                </div>
            );
        })
    ) : (

                <div className="max-w-7xl rounded overflow-hidden shadow-lg shadow-md m-4 bg-white">
                    <div className="px-6 py-4 w-[800px] h-[200px] flex justify-center items-center text-2xl">
                        No posts yet.
                    </div>
                </div>

    )}
            </div>

            <div className="w-[30%] mx-auto py-4">

                    <button 
                    onClick={() => goShow(auth.user.id)} 
                    className="flex items-center rounded shadow-lg bg-white w-[80%]"
                    >
                    <h1 className="mx-4">{auth.user.name}</h1>
                    {auth.user.avatar ? (
                        <img src={`storage/images/${auth.user.avatar}`} alt="" className="w-[20%] h-[atuo] rounded-full mx-auto m-0 my-2"/>
                    ) : (
                        <i className="fa-solid fa-circle-user text-secondary text-6xl mx-auto mx-2 my-2"></i>
                    )
                }  
                </button>
                    
                <div className="m-5">
                    Suggest for you
                    {users.map((user) => {
                        return (
                            <div key={user.id} className="flex items-center my-4">
                            <button onClick={() => goShow(user.id)}>
                            {user.avatar ? (
                                <img src={`storage/images/${user.avatar}`} alt={user.name} className="h-[10px] rounded-full mx-auto me-2"></img>
                            ) : (
                                <i className="fa-solid fa-circle-user text-secondary mx-2"></i>
                            )}
                            <p className="me-3 inline">{user.name}</p>
                            </button>
                            <button 
                            onClick={() => follow(user.id)}
                            className="text-blue-600"
                            >
                                Follow
                            </button>
                            </div>
                        )
                    })}
                </div>
            
            </div>
            </div>
             {/* 右側 */}

            
        </AuthenticatedLayout>
    );
}
