<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'categories'    => ['required', 'array', 'between:1,3'],
            'description' => ['required', 'string', 'max:255'],
            'title'       => ['required', 'string', 'max:255'],
            'image'       => ['mimes:jpeg,png,jpg,webp', 'max:10240'],
            'user_id'     => ['required', 'exists:users,id'],
        ];
    }

    public function messages() {
        return [
            'category.required'    => 'カテゴリーを選んでください',
            'description.required' => '本文は必須です。',
            'description.max'      => '本文が長すぎます。',
            'title.required'       => 'タイトルは必須です。',
            'title.max'            => 'タイトルが長すぎます。',
            'image.max'            => '画像のサイズが大きすぎます。', 
            'image.mimes'          => 'データの形式に不備があるようです。',
            'image.image'          => '画像を選択されていますか？'
        ];
    }

    public function attributes() {
        return [
            'category' => 'カテゴリー',
            'description' => '本文',
            'title' => 'タイトル',
            'image' => '画像',
        ];
    }
}
