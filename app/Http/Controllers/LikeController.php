<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Services\HomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    private $like;
    protected $homeService;

    public function __construct(Like $like_model, HomeService $homeService) {
        $this->like = $like_model;
        $this->homeService = $homeService;
    }

    public function store($id) {
        $this->like->user_id = Auth::user()->id;
        $this->like->post_id = $id;
        $this->like->save();
        $post = Post::find($id);
        $post->likes()->where('user_id', Auth::user()->id)->exists();
         // return Inertia::location('/');
        // return返さなくていいだろこれ
    }

    public function destroy($id) {
        $this->like
            ->where('user_id', Auth::user()->id)
            ->where('post_id', $id)
            ->delete();
            $post = Post::find($id);
            $post->likes()->where('user_id', Auth::user()->id)->exists();
        // return Inertia::location('/');
        // return返さなくていいだろこれ
    }
}
