import Link from "next/link"

export default function Nav() {
    return (
        <nav className='flex justify-end items-baseline gap-5'>
            <input type="text" placeholder='Search...' className='text-sm px-4 py-2 sm:w-48 w-full bg-zinc-800 border border-zinc-600 rounded-lg' />
            <div className="flex">           
                <p className='hover:bg-zinc-800 text-emerald-500 text-lg rounded-lg py-2 px-3'>
                    <Link href={"/"}>Home</Link>
                </p>
                <p className='hover:bg-zinc-800 text-lg rounded-lg py-2 px-3'>
                    <Link href={"/gallery"}>Gallery</Link>
                </p>       
            </div>
        </nav>
    )
}
