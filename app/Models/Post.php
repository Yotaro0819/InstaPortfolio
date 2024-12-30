<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function categoryPost() {
        return $this->hasMany(CategoryPost::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class, 'category_post');
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function isLiked() {
        return $this->likes()->where('user_id', Auth::user()->id)->exists();
    }
}
