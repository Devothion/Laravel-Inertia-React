import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import Post from "@/Components/Post";

export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("posts.store"), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        type="text"
                        placeholder="Title"
                        autoFocus
                        className="mb-2 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />

                    <InputError message={errors.title} className="mb-2" />
                    <textarea
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        type="text"
                        placeholder="Body"
                        rows="3"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></textarea>
                    <InputError message={errors.title} className="mb-2" />
                    <PrimaryButton
                        className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        disabled={processing}
                    >
                        Create
                    </PrimaryButton>
                </form>
                <div className="mt-6 bg-indigo-400 shadow-lg rounded-lg divide-y-4">
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
