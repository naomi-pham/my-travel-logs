import NavLink from "next/link"
import {useRouter}  from "next/router"

export default function Nav() {

    const router = useRouter()

    return (     
        <div className="flex flex-col">
            <input type="text" placeholder="Search..." className='mt-12 my-6 text-sm px-4 py-2 w-full bg-zinc-800 border border-1 border-zinc-600' />
            <p activeClassName="active" className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/" ? "underline-emerald opacity-90" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/"}
                >
                    Home
                </NavLink>
            </p>
            <p className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/trip" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/trip"}
                >
                    Trips
                </NavLink>
            </p>
            <p className  ={`text-xl rounded-lg py-2 px-3 font-semibold
                            ${router.pathname =="/gallery" ? "underline-emerald opacity-80" : ""} hover:opacity-80`}
            >
                <NavLink
                    href={"/gallery"}
                >
                    Gallery
                </NavLink>
            </p>
        </div>
    )
}