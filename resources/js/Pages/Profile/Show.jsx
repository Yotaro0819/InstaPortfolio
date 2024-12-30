import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {MyPosts} from '../../Components/Profile/MyPosts';
import {LikedPosts} from '../../Components/Profile/LikePosts';

export default function show() {

  const {user,auth} =usePage ().props;
  console.log(user);
  console.log(auth);



  // console.log(user);
  // console.log(auth);

  const [view, setView] = useState('myPosts');
  console.log(view)

  const handleViewChange = (newView) => {
    setView(newView);
  }
  return (
    <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        home
                    </h2>
                }
            >
              <Head title="User Profile" />
              <div className="py-12">
              <div className="max-w-3xl mx-auto">

                <div className="header flex items-center">
                  <div>
                {user.data.avatar ? (
                                <img src={`/storage/images/${user.data.avatar}`} alt={user.data.name} className="h-[100px] rounded-full mx-auto me-2"></img>
                            ) : (
                                <i className="fa-solid fa-circle-user text-secondary mx-2 text-8xl"></i>
                            )}
                    </div>
                      <p className="ms-20 text-5xl">{user.data.name}</p>
                      {user.data.id == auth.user.id ?
                      (
                      <Link  href={route('profile.edit')} className="border border-gray-500 rounded h-[30px] px-2 ms-5">
                        Edit Profile
                      </Link>

                      ):(
                        <div></div>
                      )
                      }
                </div>
                <div className="flex mx-auto w-[50%] justify-between">
                        <Link href={`/profile/${user.data.id}/show`}>{user.data.myPosts.length} posts</Link>
                        <Link href={`/profile/${user.data.id}/follower`}>{user.data.followers.length} followers</Link>
                        <p>{user.data.following.length} following</p>
                </div>

                <div className="mt-6 flex space-x-4 justify-center">
                  <button
                    onClick={() => handleViewChange('myPosts')}
                    className={`px-4 py-2 rounded min-w-[120px] flex justify-start items-center  ${
                      view === 'myPosts'
                        ? 'text-3xl'
                        : ''
                    }`}
                  >
                    My Posts
                  </button>
                  <button
                    onClick={() => handleViewChange('likedPosts')}
                    className={`px-4 py-2  border-x border-gray-300 min-w-[120px] flex items-center ${
                      view === 'likedPosts'
                        ? 'text-3xl'
                        : ''
                    }`}
                  >
                    Liked Posts
                  </button>
                  <button
                   
                    className={`px-4 py-2 rounded 
                      min-w-[120px] flex justify-end items-center text-right ${
                      view === ''
                        ? 'text-3xl'
                        : ''
                    }`}
                  >
                    Liked Posts
                  </button>
                </div>
                 {/* Render appropriate component based on current view */}
          <div className="mt-6">
            {view === 'myPosts' ? (
              <MyPosts posts={user.data.myPosts} />
            ) : (
              <LikedPosts likedPosts={user.data.likedPosts} />
            )}
          </div>
          </div>
          </div>

    </AuthenticatedLayout>
  )
}

