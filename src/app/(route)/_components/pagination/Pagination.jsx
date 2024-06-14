import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ page, hasPrev, hasNext }) => {
    const router = useRouter()
    return (
        <div className="flex justify-center gap-6 mt-6">
            <Button className="rounded bg-indigo-800"
                disabled={!hasPrev}
                onClick={() => router.push(`?page=${page - 1}`)}> <ChevronsLeft />Previous</Button>

            <Button className=" rounded bg-indigo-800 "
                disabled={!hasNext}
                onClick={() => router.push(`?page=${page + 1}`)}>Selanjutnya  <ChevronsRight /></Button>
        </div>
    );
}

export default Pagination;