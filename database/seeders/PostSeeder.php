<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'testUser',
            'email' => 'testuser@example.com',
            'password' => bcrypt('password'),
        ]);
        $categories = Category::inRandomOrder()->limit(3)->get();
        

        $this->createPost($user, 'first post','最初の投稿です','1735095342.jpg',$categories);
        $this->createPost($user, 'second post','2回目の投稿です。','1735112482.jpg',$categories);
        $this->createPost($user, 'third post','3回目の投稿です。','1735112499.jpg',$categories);

    }

    private function createPost($user, $title, $description, $image, $categories) {
        $post = Post::create([
            'title' => $title,
            'description' => $description,
            'image' => $image,
            'user_id' =>$user->id,
        ]);

        $post->categories()->attach($categories->pluck('id'));
    }
}


