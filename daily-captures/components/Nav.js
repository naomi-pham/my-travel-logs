import NavLink from "next/link"
import {useRouter}  from "next/router"
import React, {useState} from "react"

export default function Nav() {

    const router = useRouter()

    const [isActive, setIsActive] = useState(false)

    function openNav() {
        setIsActive(prevOpen => !prevOpen)
    }

    return (
        <div className="">
            <nav className='flex items-baseline gap-5'>
                <input type="text" placeholder="Search..." className='sm:block hidden text-sm px-4 py-2 sm:w-56 w-full bg-zinc-900 border border-1 border-zinc-600' />
                <i 
                    onClick={openNav} 
                    className={`right-8 bx ${isActive ? "bx-menu" : "bx-x"} sm:hidden z-40 text-3xl`}
                >
                </i>
                
                <div className="hidden sm:flex ml-auto">
                    <p className  ={`text-base rounded-lg py-2 px-3 font-semibold
                                   ${router.pathname =="/" ? "underline-emerald opacity-90" : ""} hover:opacity-80`}
                    >
                        <NavLink href={"/"}>Home</NavLink>
                    </p>
                    <p className  ={`text-base rounded-lg py-2 px-3 font-semibold
                                   ${router.pathname =="/trip" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
                    >
                        <NavLink href={"/trip"}>Trips</NavLink>
                    </p>
                    <p className  ={`text-base rounded-lg py-2 px-3 font-semibold
                                   ${router.pathname =="/gallery" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
                    >
                        <NavLink href={"/gallery"}>Gallery</NavLink>
                    </p>
                </div>
            </nav>
            <div className={`${isActive ? "hidden" : ""} sm:hidden fixed w-7/12 left-0 top-0 bottom-0 opacity-90 z-10 p-8 bg-zinc-700`}>
            <div className="flex flex-col">
            <input type="text" placeholder="Search..." className='mt-12 my-6 text-sm px-4 py-2 w-full bg-zinc-800 border border-1 border-zinc-600' />
            <p activeClassName="active" className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/" ? "underline-emerald opacity-90" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/"}
                >
                    <a onClick={() => setIsActive(true)}>
                        Home
                    </a>
                </NavLink>
            </p>
            <p className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/trip" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/trip"}
                >
                    <a onClick={() => setIsActive(true)}>
                        Trips
                    </a>
                </NavLink>
            </p>
            <p className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/gallery" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/gallery"}
                >
                    <a onClick={() => setIsActive(true)}>
                        Gallery
                    </a>
                </NavLink>
            </p>
        </div>
            </div>
        </div>
    )
}