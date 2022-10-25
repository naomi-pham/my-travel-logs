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
                    className={`right-8 bx ${isActive ? "bx-menu" : "bx-x"} sm:hidden z-40 text-3xl`}
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

            <nav className={`${isActive ? "hidden" : ""} sm:hidden fixed w-full left-0 top-0 bottom-0 opacity-90 z-10 p-8 bg-zinc-900`}>
                <div className="flex flex-col">
                    <input type="text" placeholder="Search..." className='mt-12 my-6 text-sm px-4 py-2 w-9/12 bg-zinc-900 border border-1 border-zinc-600' />              
                    {NavItems.map((item, index) => {
                        return (
                            <p key={index} className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                                    ${router.pathname == `${item.path}` ? "underline-emerald opacity-90" : ""} hover:opacity-80`}
                            >
                                <NavLink href={`${item.path}`}>
                                    <a onClick={() => setIsActive(true)}>
                                        {item.name}
                                    </a>
                                </NavLink>
                            </p>
                        )
                    })}                   
                </div>
            </nav>
        </div>
    )
}


