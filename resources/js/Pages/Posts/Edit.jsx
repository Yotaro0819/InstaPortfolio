import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from "@/Components/InputError";

export default function Create(props) {
const {data, setData, put, errors} = useForm({
  title: props.post.data.title,
  description: props.post.data.description,
  user_id: props.auth.user.id,
})



  function submit(e) {
    e.preventDefault();

    put(route("posts.update",props.post.data.id), {
      onSuccess: () => {
        console.log('成功しました！');
      },
      onError: () => {
        console.log('失敗しました。: ', errors);
      }
    });
  }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Post
                </h2>
            }
        >
            <Head title="Posts List" />

            <div className="py-12">
                <div className="w-[50%] mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Update posts
                        </div>

                        {/* form area */}
                        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                          <form onSubmit={submit}>
                            <div className="shoadow sm:rounded-md sm:overflow-hidden">
                              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                <div>
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Post Info
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">Use this form to update a new student.</p>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-12">
                                    <label
                                    htmlFor="title"
                                    className="text-sm font-medium text-gray-700">
                                      title
                                    </label>
                                    <input 
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    id="title"
                                    className={`mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                     />
                                     <InputError message={errors.title} />
                                  </div>
                                  <div className="col-span-6 sm:col-span-12">
                                    <label 
                                    htmlFor="description"
                                    className="text-sm font-medium text-gray-700"
                                    >
                                      description
                                    </label>
                                    <textarea 
                                    name="description" 
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    rows="4"
                                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                    <InputError message={errors.description} />
                                  </div>
                                  <div className="col-span-6 sm:col-span-12">
                                    <label 
                                    htmlFor="image"
                                    className="text-sm font-medium text-gray-700">Image</label>
                                    {/* if this post has a image, show it */}
                                     {props.post.data.image && 
                                     <>
                                     <p>Photo</p>
                                     <img src={`/storage/public/images/${props.post.data.image}`} alt="Post Image" />
                                     </>
                                     }
                                    
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <Link 
                                    href={route('home')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >Cancel</Link>
                                    <button
                                    type="submit"
                                    className="bg-indigo-600 boder border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >Update</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
               
            </div>
        </AuthenticatedLayout>
    );
}
