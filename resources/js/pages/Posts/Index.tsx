import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head ,Link} from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Dashboard({data}:any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="container ms-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                    <Link href="/posts/create" className="bg-gray-500 text-white px-4 py-1 hover:bg-gray-600">Create Post</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full shadow-lg bg-white dark:bg-neutral-800 rounded-lg">
                        <thead>
                            <tr className="bg-neutral-100 dark:bg-neutral-700 text-black dark:text-white">
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Sr.No.</th>
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Date & Time</th>
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Title</th>
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Content</th>
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Image</th>
                            <th className="px-4 py-2 border-b dark:border-neutral-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black dark:text-white">
                            {
                                data && data.length > 0 ? (
                                data.map((post: any, index: number) => (
                                    <tr key={index} className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
                                    <td className="border text-center px-4 py-2 dark:border-neutral-600">{index + 1}</td>
                                    <td className="border text-center px-4 py-2 dark:border-neutral-600">
                                        {post.created_at}
                                    </td>
                                    <td className="border text-center px-4 py-2 dark:border-neutral-600">{post.title}</td>
                                    <td className="border text-center px-4 py-2 dark:border-neutral-600">{post.content}</td>
                                    <td className="border text-center px-4 py-2 dark:border-neutral-600">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            style={{ width: 80, height: 60 }}
                                        />
                                    </td>
                                    <td className="border text-center flex justify-center px-4 py-2 dark:border-neutral-600">
                                        <Link href={`/posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-800">
                                        <PencilSquareIcon className="w-5 h-5" />
                                        </Link>
                                        <Link
                                        href={`/posts/${post.id}`}
                                        method="delete"
                                        as="button"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this post?')) {
                                            e.preventDefault();
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800 ml-4"
                                        >
                                        <TrashIcon className="w-5 h-5" />
                                        </Link>
                                    </td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan={5} className="border text-center px-4 py-2 dark:border-neutral-600">
                                        <p>No Post Found</p>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
