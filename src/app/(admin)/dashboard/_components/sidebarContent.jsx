import React from 'react'
import TotalUser from './TotalUser'
import TotalPostingan from './TotalPostingan'
import GrafikViews from './GrafikViews'
import ListCardPopuler from './ListCardPopuler'


function SidebarContent() {
    return (
        <div className="p-4 md:ml-64 ">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg ">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50  flex-col ">
                        <span className="text-2xl  text-[#333333]  ">
                            <TotalUser />
                        </span>
                        <span className="text-xl text-gray-400 ">Pageviews</span>
                    </div>
                    <div className="flex items-center justify-center h-24 rounded flex-col bg-gray-50 ">
                        <span className="text-2xl text-[#333333]">
                            <TotalPostingan />
                        </span>
                        <span className="text-xl text-gray-400 ">Pages</span>
                    </div>
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50  flex-col">
                        <span className="text-2xl  text-[#333333]">
                            932
                        </span>
                        <span className="text-xl text-gray-400  ">Share</span>
                    </div>
                </div>
                <div className="flex xl:flex-row flex-col justify-evenly">
                    <div className="w-full  border">
                        <h1 className="font-bold  p-6">Recent Blogs</h1>
                        <ListCardPopuler />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarContent