//@ts-nocheck
'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, auth, db, signOut } from "../../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSignIn = async (provider) => {
        setLoading(true);
        try {
            await signOut(auth)
            const result = await signInWithPopup(auth, new provider);
            const user = result.user;

            const userDoc = await getDoc(doc(db, "users", user.uid))
            
            
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    hasDocument: false,
                    role: "user"
                });
            }


            if (userDoc.data().role === "admin") {
                router.push("/admin/mypanel")
            } else {
                router.push("/")
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex flex-col w-full h-full items-center justify-center p-4">
            <div className="w-full p-4 flex gap-20 lg:gap-40 md:flex-row items-center flex-col justify-center">
                <div className="md:min-w-96 text-5xl flex flex-col font-bold my-5">
                    <p className="">Projeto</p>
                    <p>E-Curricular</p>
                </div>

                <span className="md:h-full md:w-[1px] md:bg-slate-500"></span>

                <div className="flex flex-col gap-3 rounded-md border-0 lg:w-[20rem]">
                    <button onClick={() => handleSignIn(GoogleAuthProvider)} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 focus:ring-gray-500 bg-white p-2 text-base font-medium text-black outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                        <img src="/google.svg" alt="Google" className="h-[18px] w-[18px] " />
                        Continue com Google
                    </button>

                    <button onClick={() => handleSignIn(GithubAuthProvider)} type="button" class="py-2 px-4 max-w-md flex justify-center gap-2 items-center bg-black hover:bg-black/80 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md">
                        <img src="/github.svg" alt="Github" className="w-[20px] h-[20px] invert" />
                        Continue com GitHub
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Login