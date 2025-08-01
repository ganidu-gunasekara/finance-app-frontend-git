'use client';
import FormInput from "@/components/FormInput";
import SocialButton from "@/components/SocialButton";
import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { json } from "stream/consumers";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState<{ [key: string]: string }>({});
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                console.log('User registered Successfully')
                setError({});
                const token = localStorage.getItem("token");
                if (token) {
                    localStorage.removeItem("token");
                    localStorage.setItem("token", data.token);
                } else {
                    localStorage.setItem("token", data.token);
                }
            } else {
                console.log('User registration Failed')
                if (typeof data.message === "object") {
                    setError(data.message);
                } else {
                    setError({ "general": data.message })
                }
            }
        } catch (e) {
            console.log("Error submitting form : ", e)
        }
    }
    return (
        <div className="flex  flex-col lg:flex-row h-screen">
            <div className="bg-white w-full h-full text-black px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 py-6 flex flex-col justify-center">
                <div>
                    <div className="mt-2 mb-6">
                        Logo
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        Get Started !
                    </h1>
                    <div className="pr-20">
                        Create your account to start optimizing your CV.
                    </div>
                    <div className="mt-4 w-full max-w-2xl">
                        <form onSubmit = {onSubmit} className="flex flex-col gap-1">
                            <FormInput label="Full Name" type="text" placeholder="Full Name" name="fullName" onChange = {handleOnChange} value={formData.fullName} />
                            {error.fullName && <div className="text-red-500 text-sm">{error.fullName}</div>}
                            <FormInput label="Email" type="email" placeholder="Email" name="email" onChange = {handleOnChange} value={formData.email} />
                            {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
                            <FormInput label="Password" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password}
                                icon={
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                }
                                onChange={handleOnChange}
                            />
                            {error.password && <div className="text-red-500 text-sm">{error.password}</div>}
                            {error.general && <div className="text-red-500 text-sm">{error.general}</div>}
                            <button
                                type="submit"
                                className="bg-green-900 text-white min-h-10 rounded-[10px]">Sign In</button>
                        </form>
                    </div>
                </div>
                <div className="w-full max-w-2xl">
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <div className="mx-4 text-gray-500 text-sm">or</div>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <SocialButton icon={<FaGoogle />} text="Continue with Google" />
                        <SocialButton icon={<FaApple />} text="Continue with Apple" />

                    </div>
                    <div className="flex my-3 gap-1 justify-center">
                        Dont have an account?
                        <a
                            href="/sign-in"
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