"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.bubble.css";
import Sidebar from '../../_components/sidebar';
import SelectCatergory from '../../write/_components/selectCatergory';
import { useToast } from '@/components/ui/use-toast';
import ButtonAlert from '../../write/_components/buttonPublish';
import Image from 'next/image';



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const storage = getStorage(app);

const WritePage = ({ params }) => {
    const { id } = params;
    const { toast } = useToast();
    const { status } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [valueCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        const upload = () => {
            const name = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => { console.error(error); },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL);
                    });
                }
            );
        };
        if (file) upload();
    }, [file]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                cache: "no-store",
                 headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                 }
            });
            const respond = await res.json();
            const data = respond.post;

            setTitle(data.title);
            setValue(data.content);
            setMedia(data.img);
            setSelectedCategory(data.categorySlug);

        };
        fetchData();
    }, [id]);

    if (status === "unauthenticated") {
        router.push("/");
    }

    const formatSlug = (str) => {
        return str.replace(/\s+/g, '-').toLowerCase();
    };

    const handleSubmit = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
            method: "PUT",
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                },
            body: JSON.stringify({
                title,
                content: value,
                img: media,
                slug: formatSlug(title),
                categorySlug: valueCategory,
            }),
        });
        if (res.ok) {
            toast({
                title: "Success, Post Created"
            });
        } else {
            toast({
                title: "Error, Post Not Created"
            });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <>
            <div className="space-y-6 sm:ml-64">
                <div className="p-6 flex">
                    <a href="/dashboard/posts">back</a>
                    <h1 className="text-2xl flex-1 text-center">Write Your Story</h1>
                    <ButtonAlert title="update" handleSubmit={handleSubmit} />
                </div>

                <div className="w-full border p-20 flex justify-center">
                    <button
                        onClick={() => document.getElementById('image').click()}
                    >
                        {media ? (
                            <Image src={media} alt="" className="w-full h-full object-cover" width={400} height={250}/>
                        ) : (
                            <span>Select Image</span>
                        )}
                    </button>
                    <input
                        type="file"
                        id="image"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <SelectCatergory onCategoryChange={handleCategoryChange} value={valueCategory} />
                <input
                    type="text"
                    placeholder="Title"
                    className="text-xl border w-full p-3"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div className="h-screen">
                    <ReactQuill
                        className="border w-full h-96"
                        theme="bubble"
                        value={value}
                        onChange={setValue}
                        placeholder="Tell your story"
                    />
                </div>
            </div>
            <Sidebar />
        </>
    );
};

export default WritePage;
