"use client";

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.bubble.css"
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import Sidebar from '../_components/sidebar';
import SelectCatergory from './_components/selectCatergory';
import ButtonAlert from './_components/buttonPublish';
import Image from 'next/image';



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const storage = getStorage(app);

const WritePage = () => {
  const { toast } = useToast();
  const { status } = useSession
  const router = useRouter();

  const [file, setFile] = useState(null)
  const [media, setMedia] = useState("")
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")
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
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          });
        }
      );


    };
    file && upload()

  }, [file])

  if (status === "unauthenticated") {
    router.push("/")
  }

  const formatSLug = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: "Mohon isi judul terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (!valueCategory.trim()) {
      toast({
        title: "Mohon pilih kategori terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (!value.trim()) {
      toast({
        title: "Mohon isi konten terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    if (!media.trim()) {
      toast({
        title: "Mohon isi upload Image terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content: value,
        image: media,
        slug: formatSLug(title),
        categorySlug: valueCategory,
      }),
    });
    if (res.ok) {
      router.push("/dashboard/posts")
      toast({
        title: "berhasil, Post Created",
      });
    } else {
      toast({
        title: "gagal, Post Created",
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
      <div className=" 
    space-y-6 md:ml-64 p-4">
        <div className="p-6 flex ">
          <h1 className="text-2xl flex-1 text-center">Write Your Story</h1>
          <ButtonAlert title="Publish" handleSubmit={handleSubmit} />
        </div>

        <div className="w-full border p-20 flex justify-center">
          <button
            onClick={() => document.getElementById('image').click()}
          >
            {file ? (
              <Image src={URL.createObjectURL(file)} alt="deskripsi" className="w-full h-full object-cover" width={400} height={250}/>
            ) : (
              <span>Pilih Gambar</span>
            )}
          </button>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <SelectCatergory onCategoryChange={handleCategoryChange} />
        <input
          type="text"
          placeholder="Title"
          className="text-xl border w-full p-3"
          onChange={e => setTitle(e.target.value)} />
        <div className=" h-screen">
          <ReactQuill
            className="border w-full h-[700px] "
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="tell your story"
          />
        </div>
      </div>
       
    </>

  )
}

export default WritePage
