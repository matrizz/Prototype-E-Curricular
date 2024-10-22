'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NotAuthorized() {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/login")
        }, 3000)
    })

    return (
        <div className="bg-zinc-950 w-full h-full flex items-center justify-center">
            <p className="text-white text-3xl">Not Authorized</p>
        </div>
    )
}