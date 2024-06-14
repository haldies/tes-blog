
import Image from "next/image";
import Menu from "../../_components/menu/Menu";
import styles from "./singlePage.module.css";

import { notFound } from 'next/navigation'


import parse from 'html-react-parser';


const getDataPost = async (slug) => {


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${slug}`, {
            cache: "no-store",
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
            }
        });
        const data = await res.json();

        return data.post;
    } catch (error) {
        console.error("Terjadi kesalahan saat memuat data:", error.message);
    }

};
export async function generateMetadata({ params }) {

    const slug = params;
    const post = await getDataPost(slug);

    const { title, description, keywords, image } = post ? post : {};
    const imageUrl = image || '/default-image.jpg';

    return {
        title: title || 'Default title',
        description: description || 'Default description',
        keywords: keywords || 'Default keywords',
        openGraph: {
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                },
            ],
        },
    };
};




const SinglePage = async ({ params }) => {
    const { slug } = params;
    const post = await getDataPost(slug);

    if (!post) {
        return notFound();
    }

    const { title, content, user, publishedAt, image } = post ? post : {};

    return (
        <div className="border-b container lg:px-28 pt-28">
            <main className="flex flex-col md:flex-col lg:flex-row gap-12">
                <article className="xl:max-w-[66%]">
                    <header className={styles.textContainer}>
                        <h2 className="text-4xl mb-6 font-bold text-[#333333]">{title}</h2>
                        <div className={styles.user}>
                            <div className={styles.userTextContainer}>
                                <span className={styles.username}>
                                    ditinjau oleh - {user?.name} {publishedAt}
                                </span>
                            </div>
                        </div>
                    </header>
                    {image && (
                        <div className="w-full max-w-full  h-auto">
                            <Image src={image} className="w-full  rounded-sm" alt={title} width={650} height={435} priority />
                        </div>
                    )}
                    <section className={styles.description}>
                        {parse(content)}

                    </section>
                </article>
                <aside className="w-full xl:max-w-[40%] flex">
                    <Menu />
                </aside>
            </main>
            <div className="mt-24">

            </div>
        </div>
    );
};
export default SinglePage;


