<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'followers' => $this->followers->map(function($follower) {
                return [
                    'id' => $follower->follower->id,
                    // 'name' => $follower->follower->name,
                    // 'email' => $follower->follower->email,
                    // 'avatar' => $follower->follower->avatar,
                ];
            }),
            'following' => $this->following->map(function($following) {
                return [
                    'id' => $following->following->id,
                    // 以下はlaravelのリレーション自動認識によって取得
                    // 'name' => $following->following->name,
                    // 'email' => $following->following->email,
                    // 'avatar' => $following->following->avatar,
                ];
            }),
            'myPosts' => $this->posts->map(function($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'image' => $post->image,
                'description' => $post->description,
                'created_at' => $post->created_at,
            ];
            }),
            'likedPosts' => $this->likes->map(function($like) {
                return [
                    'id' => $like->post->id,
                    'title' => $like->post->title,
                    'image' => $like->post->image,
                    'description' => $like->post->description,
                    'created_at' => $like->post->created_at,
                ];
            }),
        ];
    }
}
