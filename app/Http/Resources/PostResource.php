<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class PostResource extends JsonResource
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
            'description' => $this->description,
            'title' => $this->title,
            'image' => $this->image,
            'owner' => UserResource::make($this->user),
            'hasLiked' => $this->likes()->where('user_id', Auth::user()->id)->exists(),
            'categories' => CategoryPostResource::collection($this->categoryPost),
            // 複数の配列を持つようなデータの時はmakeは使えない。collectionを使う。単一と複数で異なる点に注意！
            'created_at' => $this->created_at->toFormattedDateString(),
        ];
    }
}
