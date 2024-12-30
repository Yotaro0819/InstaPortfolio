<?php
namespace App\Services;

use App\Models\Post;

class PostService
{
  const LOCAL_STORAGE_FOLDER = 'images';

  public function saveImage($image) {
    $image_name = time() . '.' . $image->extension();

    $image->storeAs('public/' . self::LOCAL_STORAGE_FOLDER, $image_name);

    return $image_name;
  }

  public function saveCategories(Post $post, array $categories) {
    $category_post = [];
    foreach($categories as $category) {
      $category_post[] = [
        'category_id' => $category,
        'post_id' => $post->id
      ];
    }
    $post->categoryPost()->createMany($category_post);
  }
}