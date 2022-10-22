import Link from "next/link"

export default function Nav() {
    return (
        <nav className='flex justify-content-between items-baseline gap-5'>
            <input type="text" placeholder="Search..." className='text-sm px-4 py-2 sm:w-56 w-full bg-zinc-900 border border-1 border-zinc-600' />
            <div className="flex ml-auto">           
                <p className  ='active text-base rounded-lg py-2 px-3 font-semibold
                                underline-emerald hover:opacity-80'
                >
                    <Link href={"/"}>Home</Link>
                </p>
                <p className  ='text-base rounded-lg py-2 px-3 font-semibold
                                underline-emerald-hidden hover:opacity-80'
                >
                    <Link href={"/gallery"}>Gallery</Link>
                </p>       
            </div>
        </nav>
    )
}