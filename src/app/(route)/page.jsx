import Menu from "./_components/menu/Menu";
import CardList from "./_components/cardList/CardList";
import CategoryList from "./_components/categoryList/CategoryList";
import Image from "next/image";
import ImageHero from "../../../public/hero.png"

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div>
      <main className=" bg-[#3060A1] w-full min-h-[630px]">
        <div className="container lg:px-28 flex justify-between flex-col lg:flex-row">
          <div className="md:pt-60 pt-40">
            <h1 className="text-[24px] sm:text-5xl  text-white font-bold lg:text-4xl w-full lg:w-[500px]">Satu Aplikasi untuk Semua Kebutuhan Hewan
            </h1>
            <p className="text-white font-semibold text-[12px] sm:text-xl lg:text-[16px] pt-3 w-full lg:w-[600px]"> GoodPets adalah aplikasi yang menyediakan tools yang menghubungkan dunia hewan & pet lover agar bisa berkonsultasi dalam hal kesehatan, perawatan, komunitas, kebutuhan sehari-hari!.</p>
          </div>
          <div className="pt-6 pb-6 lg:pt-36  flex justify-center">
            <picture className="">
              <Image className="bg-cover w-[500px] " alt="penyayang kucing" src={ImageHero} width={648} height={484} priority />
            </picture>
          </div>
        </div>
      </main>
      <section className="container">
        {/* <CategoryList /> */}
        <div className="md:container  justify-center md:gap-4 flex flex-col xl:flex-row xl:gap-10">
          <CardList page={page} />
          <Menu />
        </div>
      </section>
    </div>
  )
}
