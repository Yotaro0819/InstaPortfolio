<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private $category;

    public function __construct(Category $category_model) {
        $this->category = $category_model;
    }
    public function run(): void
    {
        $categories = [
            [
                'name'          => 'Work',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ],
            [
                'name'          => 'Music',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ],
            [
                'name'          => 'Hobby',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ],
            [
                'name'          => 'Sports',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ],
            [
                'name'          => 'Family',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ],
            [
                'name'          => 'Friends',
                'created_at'    => NOW(),
                'updated_at'    => NOW()
            ]
        ];

        $this->category->insert($categories);
    }
}
