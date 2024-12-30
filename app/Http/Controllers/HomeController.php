<?php

namespace App\Http\Controllers;


use App\Services\HomeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected $homeService;

    public function __construct(HomeService $homeService) {
        $this->homeService = $homeService;
    }

    public function index() {
        $homeData = $this->homeService->getHomeData();
        return Inertia::render('Home',[
            'all_posts' => $homeData['all_posts'],
            'suggested_users' => $homeData['suggested_users'],
        ]
        );
    }
}
