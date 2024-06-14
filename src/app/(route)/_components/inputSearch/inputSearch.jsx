
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = ({ initialValue = "" }) => {
    const [valueInput, setValueInput] = useState(initialValue);
    const [inputError, setInputError] = useState(false);
    const router = useRouter();

    const handleSearchInputChange = (event) => {
        setValueInput(event.target.value);
        if (event.target.value.length < 3) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (valueInput.length >= 3) {
            router.push(`/search?s=${encodeURIComponent(valueInput)}`);
        } else {
            setInputError(true);
        }
    };

    return (
        <div className="">
            <form className="flex gap-3" onSubmit={handleSubmitForm}>
                <Input
                    className=""
                    type="text"
                    placeholder="Search..."
                    value={valueInput}
                    onChange={handleSearchInputChange}
                />
                <Button type="submit" disabled={valueInput.length < 3}>
                    Submit
                </Button>
            </form>
            {inputError && <p className="">Minimum 3 characters required</p>}
        </div>
    );
};

export default SearchBar;
