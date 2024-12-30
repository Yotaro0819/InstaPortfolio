<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Services\PostService;
use App\Services\HomeService;
use App\Services\CategoryService;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    protected $postService;
    protected $homeService;
    protected $categoryService;

    public function __construct(PostService $postService, HomeService $homeService, CategoryService $categoryService) {
        $this->postService = $postService;
        $this->homeService = $homeService;
        $this->categoryService = $categoryService;
    }


    // ---------- Store section ---------------
    public function create() {

        $user = UserResource::make(Auth::user());
        $all_categories = CategoryResource::collection($this->categoryService->getAllCategories());

        return Inertia::render('Posts/Create', [
            'user' => $user,
            'all_categories' => $all_categories,
        ]);
    }

    public function store(StorePostRequest $request) {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $validatedData['image'] = $this->postService->saveImage($request->file('image'));
        }

        $post = Post::create($validatedData);
        $this->postService->saveCategories($post, $validatedData['categories']);

        return redirect()->route('home');
    }

    // ----------- Update section -------------
    public function edit(Post $post) {

        return Inertia::render('Posts/Edit', [
            'post' => PostResource::make($post),
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post) {
        $validatedData = $request->validated();

        $post->update($validatedData);
        return redirect()->route('home');
    }

    // --------- Delete section -------------
    public function destroy(Post $post) {
        $post->delete();
        return redirect()->route('home');
    }
}
