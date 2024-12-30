import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react'

const Follower = ({following, user, auth}) => {
  console.log(following);
  console.log(user);
  console.log('auth', auth.user)

    const [users, setUsers] = useState(auth.user.following);
  

    const follow = async (id) => {
      try {
          await axios.post(route('follow.store', {id}));
          setUsers((prevUsers) => [
            ...prevUsers, // 既存のユーザーを残す
            { following_id: id } // 新しく追加するユーザーを追加
        ]);
      } catch(error) {
          console.log(error);
      };
    }
  
    const unFollow = async (id) => {  
      try {
        await axios.delete(route('follow.destroy', {id}));
        setUsers((prevUsers) => prevUsers.filter(auth => auth.following_id !== id));
  
      } catch(error) {
        console.log(error);
      }
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
                  {user.avatar ? (
                                  <img src={`/storage/images/${user.avatar}`} alt={user.name} className="h-[100px] rounded-full mx-auto me-2"></img>
                              ) : (
                                  <i className="fa-solid fa-circle-user text-secondary mx-2 text-8xl"></i>
                              )}
                    </div>
                      <p className="ms-20 text-5xl">{user.name}</p>
                      {user.id == auth.user.id ?
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
                        <Link href={`/profile/${user.id}/show`}>{user.posts.length} posts</Link>
                        <Link href={`/profile/${user.id}/follower`}>{user.followers.length} followers</Link>
                        <Link href={`/profile/${user.id}/following`}>{user.following.length} following</Link>
                </div>
                  
                <div>
                    <h1 className="text-center text-4xl my-10">
                      Followers
                    </h1>

                </div>
                      {following.map((following) => {
                        console.log(following.following);
                        return (
                          


                          <div key={following.following.id} className="flex justify-start my-3">

                        
                          <Link
                          href={route('profile.show',following.following.id)}
                          className="inline-flex items-center"
                          >
                            {following.following.avatar ? (
                                          <img src={`/storage/images/${following.following.avatar}`} alt={following.following.name} className="h-[35px] rounded-full mx-auto me-2 inline ms-2"></img>
                                      ) : (
                                          <i className="fa-solid fa-circle-user text-secondary mx-2 text-4xl"></i>
                                      )}
                          <p className="inline text-2xl">{following.following.name}</p>
                         
                          </Link>

                          {following.following.id !== auth.user.id ? 
                          (
                            <div className="flex justify-start my-3">
                            {users.some(follow => follow.following_id === following.following.id) ? (
                              <button
                                onClick={() => unFollow(following.following.id)}
                                className="text-gray-600 ms-10"
                              >
                                Unfollow
                              </button>
                            ) : (
                              <button 
                                onClick={() => follow(following.following.id)}
                                className="text-blue-600 ms-10"
                              >
                                Follow
                              </button>
                            )
                          }
                          </div>
                          )
                          :
                          (
                            <></>
                          )
                          }
                          
                          </div>

                        )
                      })}
                    </div>
                </div>


    </AuthenticatedLayout>
  )
}

export default Follower