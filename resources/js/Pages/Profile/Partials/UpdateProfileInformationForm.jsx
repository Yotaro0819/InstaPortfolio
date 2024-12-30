import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';


export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;


    

    const { data, setData, patch, errors, processing,  } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });


    const [avatar, setAvatar] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);


    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append('name',data.name);
        formData.append('email',data.email);
        formData.append('avatar',avatar);
        formData.append('_method', 'PATCH');

        
        axios.
        post(route('profile.update'), formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log(response);
            setRecentlySuccessful(true);
            setTimeout(() => {
                setRecentlySuccessful(false);
            }, 3000);
            
            })
        .catch(error => {
            formData.forEach((value, key) => {
                console.log(key, value);
            console.log(error);
        });
        })
        
    };


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                    {/* Name section */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                    {/* Email Section */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                    {/* Avatar Section */}
                <div>
                    <label htmlFor="avatar"
                    value="avatar">
                        <input 
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={(e) => {
                            setAvatar(e.target.files[0]);
                            const file = e.target.files[0];
                            if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setImagePreview(previewUrl);
                            }

                        }} />
                    </label>

                    {imagePreview && (
                        <div className="mt-5 block text-sm font-medium text-gray-700">
                            <img
                                src={imagePreview}
                                alt="Avatar Preview"
                                className="mt-2 w-32 h-32 object-cover rounded-full"
                            />
                            <p>This will be your avatar</p>

                        </div>
                    )}
                </div>
                
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="mb-5">Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
