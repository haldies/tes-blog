"use client"

import React, { useState } from 'react'
import { FormLogin } from './FormSigIn';



function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="container h-screen flex items-center">

            <div className="w-[450px] mx-auto border h-[600px] space-y-3 p-12">
                <h1 className="font-bold text-xl text-center">Masuk ke akun Anda</h1>
                <FormLogin />
            </div>
        </div>
    );

}

export default LoginPage;