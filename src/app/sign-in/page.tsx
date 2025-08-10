'use client';
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<{ [key: string]: string }>({});

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setError({});
                const token = localStorage.getItem("token");
                if (token) {
                    localStorage.removeItem("token");
                    localStorage.setItem("token", data.token);
                } else {
                    console.log("Token does not exist.");
                }

                console.log("Login Successfull");
            } else {
                if (typeof data.message === "object") {
                    setError(data.message);
                } else {
                    setError({ "general": data.message })
                }
                console.log("Login Failed")
            }
        } catch (e) {
            console.log('Error in form submission', e)
        }
    }
    return (
        <div className="flex  flex-col lg:flex-row h-screen">
            <div className="bg-white w-full h-full text-black px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 py-6 flex flex-col justify-center">
                <div>
                    <div className="mb-6">
                        Logo
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome Back !
                    </h1>
                    <div className="pr-20">
                        Sign In to access your dashboard and continue optimizing your CV process
                    </div>
                    <div className="mt-4 w-full max-w-2xl">
                        <form onSubmit={onSubmit} className="flex flex-col gap-1">
                            <FormInput label="Email" type="email" name="email" placeholder="Email" onChange={handleOnChange} value={formData.email} />
                            {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
                            <FormInput label="Password" type={showPassword ? "text" : "password"} name="password" placeholder="Pasword" onChange={handleOnChange} value={formData.password}
                                icon={
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                } />
                            {error.password && <div className="text-red-500 text-sm">{error.password}</div>}
                            <a className="flex justify-end">Forgot Password?</a>
                            {error.general && <div className="text-red-500 text-sm">{error.general}</div>}
                            <button
                                type="submit"
                                className="bg-green-900 text-white min-h-10 rounded-[10px]">Sign In</button>
                        </form>
                    </div>
                </div>
                <div className="w-full max-w-2xl">
                    <div className="flex my-3 gap-1 justify-center">
                        Dont have an account?
                        <a
                            href="/sign-up"
                            className="text-blue-500">Sign Up</a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block w-full">
                <img src="emerald background.jpg"
                    alt="Emerald Background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}