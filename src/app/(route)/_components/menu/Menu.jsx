import React from "react";
import MenuPosts from "../menuPosts/MenuPost";
import MenuCategories from "../menuCategories/MenuCategories";


const Menu = () => {
    return (
        <div className="mb-12">
            <h1 className="text-3xl pt-6 pb-6 font-bold text-[#3B3738]">Artikel terkait</h1>
            <MenuPosts />
            <h1 className="">Topik Terkini</h1>
            <MenuCategories />
        </div>
    );
}

export default Menu;