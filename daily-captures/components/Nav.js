import NavLink from "next/link"
import {useRouter}  from "next/router"
import React, {useState} from "react"

export default function Nav() {

    const router = useRouter()

    const [isActive, setIsActive] = useState(true)

    function openNav() {
        setIsActive(prevOpen => !prevOpen)
    }

    const NavItems = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Trips",
            path: "/trip"
        },
        {
            name: "Gallery",
            path: "/gallery"
        },

    ]

    return (
        <div>

            {/* nav-desktop */}

            <nav className='flex items-baseline gap-5'>
                <input type="text" placeholder="Search..." className='sm:block hidden text-sm px-4 py-2 sm:w-56 w-full bg-zinc-900 border border-1 border-zinc-600' />
                <i  onClick={openNav} 
                    className={`absolute right-8 bx ${isActive ? "bx-menu" : "bx-x"} sm:hidden z-40 text-3xl`}
                >
                </i>
                
                <div className="hidden sm:flex ml-auto">
                    {NavItems.map((item, index) => {
                        return (
                            <p key={index} className  ={`text-base rounded-lg py-2 px-3 font-semibold
                                   ${router.pathname == `${item.path}` ? "underline-emerald opacity-90" : ""} hover:opacity-80`}
                            >
                                <NavLink href={`${item.path}`}>{item.name}</NavLink>
                            </p>

                        )
                    })}               
                </div>
            </nav>

            {/* nav-mobile */}

            <nav className={`${isActive ? "-translate-x-full" : "-translate-x-0"} duration-700 transition-transform sm:hidden fixed w-full left-0 top-0 bottom-0 opacity-90 z-10 p-8 bg-zinc-900`}>
                <div className="flex flex-col fixed bottom-8 pl-2">
                    <input type="text" placeholder="Search..." className='mt-12 my-6 text-lg pl-2 py-2 bg-zinc-800 w-full' />              
                    {NavItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <hr className="bg-zinc-900 border-[0.01]" />
                                <p className  ={`text-xl rounded-lg py-2 pl-1
                                        ${router.pathname == `${item.path}` ? "opacity-90" : ""} hover:opacity-80`}
                                >
                                    <NavLink href={`${item.path}`}>
                                        <a onClick={() => setIsActive(true)}>
                                            {item.name}
                                        </a>
                                    </NavLink>
                                </p>
                                <hr className="bg-zinc-900 border-[0.01]" />
                            </div>
                        )
                    })}                   
                </div>
            </nav>
        </div>
    )
}


