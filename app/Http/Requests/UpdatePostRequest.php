<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->id === $this->route('post')->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => ['required', 'string', 'max:255'],
            'title'       => ['required', 'string', 'max:255'],
            'image'       => ['mimes:jpeg,png,jpg', 'max:10240'],
            'user_id'     => ['required', 'exists:users,id'],
        ];
        
    }
    public function messages() {
        return [
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
            'description' => '本文',
            'title' => 'タイトル',
            'image' => '画像',
        ];
    }
}
