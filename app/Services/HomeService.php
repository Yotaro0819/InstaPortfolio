<?php
namespace App\Services;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class HomeService 
{
  private $post;
  private $user;

  public function __construct(Post $post_model, User $user_model) {
    $this->post = $post_model;
    $this->user = $user_model;
  }


  public function getHomeData() {
    $authUser = Auth::user();
    $all_posts = Post::latest()->get();
    foreach ($all_posts as $post) {
        $post->hasLiked = $post->likes()->where('user_id', Auth::user()->id)->exists();
    }

    $suggested_users = $this->getSuggestedUsers();

    
    return [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
      'laravelVersion' => Application::VERSION,
      'phpVersion' => PHP_VERSION,
      'authUser' => $authUser,
      'all_posts' => PostResource::collection($all_posts),
      'suggested_users' => $suggested_users,
    ];
  }

  public function getHomePosts() {
    $all_posts = $this->post->latest()->get();
    $home_posts = [];

    foreach($all_posts as $post) {
      if($post->user->isFollowed() || $post->user->id === Auth::user()->id) {
        $home_posts[] = $post;
      }
    }

    return $home_posts;
  }

  public function getSuggestedUsers() {
    $all_users = User::where('id', '!=', Auth::user()->id)->get();
    $suggested_users = [];

    foreach($all_users as $user) {
      if(!$user->isFollowed()) {
        $suggested_users[] = $user;
      } 
    }
    return $suggested_users;
  }




  public function getAllUsers() {
    return $this->user->all();
  }
}
