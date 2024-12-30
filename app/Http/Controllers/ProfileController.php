<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\AvatarRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('images', 'public');
            $fileName = basename($avatarPath);
            $request->user()->avatar = $fileName;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show($id) {
        $user = User::with(['followers', 'following', 'posts', 'likes'])->findOrFail($id);
        return Inertia::render('Profile/Show',[
            'user' => new UserResource($user),
        ]);
    }

    public function follower($id) {
        $user = User::with(['followers', 'following', 'posts', 'likes'])->findOrFail($id);
        $authUser = Auth::user();

        $userInfo = new UserResource($user);
        $authUserInfo = new UserResource($authUser);
        $userInfo->toArray(request());
        $authUserInfo->toArray(request());



        return Inertia::render('Profile/Follower', [
            'followers' => $userInfo['followers'],
            'user' => $user,
            'authUser' => $authUser
        ]);
    }

    public function following($id) {
        $user = User::with(['followers', 'following', 'posts', 'likes'])->findOrFail($id);
        $authUser = Auth::user();

        $userInfo = new UserResource($user);
        $authUserInfo = new UserResource($authUser);

        $userInfo->toArray(request());
        $authUserInfo->toArray(request());


        return Inertia::render('Profile/Following', [
            'following' => $userInfo['following'],
            'user' => $user,
            'authUser' => $authUser
        ]);
    }
}
