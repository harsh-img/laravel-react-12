import AppLayout from '@/layouts/app-layout';
import { Head ,Link,useForm} from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Post',
        href: '/posts/edit',
    },
];

type FormDataConvertible = string | number | boolean | File | null;

interface MyForm {
    title: string;
    content: string;
    image: File | null;
    [key: string]: FormDataConvertible; // Index signature
}
export default function Edit({posts}:any) {

    const { data, setData, errors, post:submtForm, reset, processing } = useForm<MyForm>({
        title: posts.title,
        content: posts.content,
        image: null,
        _method:"PUT"
    });
    
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        submtForm(route('posts.update', posts.id), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Post" />
        
            <div className="w-full mx-auto px-6 py-10">
                <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
                        <Link 
                            href="/posts" 
                            className="inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Posts List
                        </Link>
                    </div>
                    <p className="text-muted-foreground mb-8 dark:text-gray-400">Create a new post to share your thoughts.</p>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
        
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.currentTarget.value)}
                                className="block w-full rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
                                placeholder="Enter title"
                            />
                        </div>
        
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.currentTarget.value)}
                                className="block w-full min-h-[150px] rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
                                placeholder="Enter content"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setData('image', e.target.files[0]);
                                    }
                                }}
                                className="block w-full rounded-md border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
                                placeholder="Enter title"
                            />
                            {
                                posts && posts.image && (
                                    <img src={posts.image} alt={posts.title} style={{ width: 80, height: 60 }}/>
                                )
                            }
                        </div>
        
                        <div className="text-right">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            >
                               {processing ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    

    );
}