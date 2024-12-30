import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from "@/Components/InputError";
import { useState } from 'react';

export default function Create(props) {
  // 確認用
  console.log(props);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (e, categoryId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // チェックが入った場合、selectedCategoriesにcategoryIdを追加
      if (selectedCategories.length < 3) {
        const updatedCategories = [...selectedCategories, categoryId];
        setSelectedCategories(updatedCategories);  // 状態を更新
        setData("categories", updatedCategories); 
        console.log(updatedCategories);
      } else {
        // 最大3つまで制限
        alert("You can select up to 3 categories.");
        e.target.checked = false;
      }
    } else {
      // チェックを外した場合、selectedCategoriesからcategoryIdを削除
      const updatedCategories = selectedCategories.filter(id => id !== categoryId); // ここでupdatedCategoriesを定義
      setSelectedCategories(updatedCategories);  // 状態を更新
      setData("categories", updatedCategories); 
    }
  };
  
  const {data, setData, post, errors} = useForm({
    title: "",
    description: "",
    user_id: props.auth.user.id,
    image: "",
    categories: [],
})


  function submit(e) {
    console.log(data.categories);
    e.preventDefault();
    post(route("posts.store"), {
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
                    Create Post
                </h2>
            }
        >
            <Head title="Posts List" />

            <div className="py-12">
                <div className="w-[50%] mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Create posts
                        </div>

                        {/* form area */}
                        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                          <form onSubmit={submit}>
                            <div className="shoadow sm:rounded-md sm:overflow-hidden">
                              <div className="bg-white py-6 px-4 spacce-y-6 sm:p-6">
                                <div>
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Post Info
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">Use this form to create a new post.</p>
                                </div>
                                <div className=" gap-6">

                                  <div className="flex">
                                  {/* category section */}
                                  {props.all_categories.data.map((category, i) => (
                                  <div 
                                  className="col-span sm:col-span-12 mx-3"
                                  key={i}
                                  >
                                  <input 
                                  type="checkbox" 
                                  value={category}
                                  name="categories[]" 
                                  id={category.id}
                                  onChange={(e) => handleCheckboxChange(e, category.id)}
                                  checked={selectedCategories.includes(category.id)}
                                  className="inline"
                                  />
                                  <label 
                                  htmlFor={category.id}
                                  className="ms-3 text-sm font-medium text-gray-700 "
                                  >{category.category_name}</label>
                                  </div>
                                  ))}
                                  </div>
                                  {/* title section */}
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

                                     {/* description section */}
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
                                    className="mt-1 w-full border border-gray-300 rounded-md shoadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                    <InputError message={errors.description} />
                                  </div>
                                  <div className="col-span-6 sm:col-span-12">
                                    <label 
                                    htmlFor="image"
                                    className="text-sm font-medium text-gray-700">Image</label>
                                    <input 
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                     />
                                   <InputError message={errors.image} />

                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <Link 
                                    href={route('home')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >Cancel</Link>
                                    <button
                                    type="submit"
                                    className="bg-indigo-600 boder border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >Save</button>
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
