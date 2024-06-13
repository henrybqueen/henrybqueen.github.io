
'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'


interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="font-mono hover:font-bold"
        >
            {children}
        </Link>
    );
}



function SideNavLink({ href, children }: NavLinkProps) {

    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
        <Link
            href={href}
            className={`${isActive ? 'text-blue-500 font-bold border-blue-500' : 'text-gray-700 hover:text-gray-800 hover:border-slate-400'} block -m-px border-l border-transparent pl-4 font-mono text-base `}
        >
            {children}
        </Link>
    );
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white">
            <header className="bg-gradient-to-r from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90% shadow fixed w-full z-10">
                <div className="container mx-auto max-w-6xl flex items-center justify-between p-4 h-12">
                    <div className=" font-mono font-bold text-xl">
                        <Link href="/dashbord">Henry Queen</Link>
                    </div>
                    <div className="font-mono flex gap-6">
                        <NavLink href="/dashbord/projects">Projects</NavLink>
                        <NavLink href="/dashbord/contact">Contact</NavLink>
                        <NavLink href="/dashbord/writing">Writing</NavLink>
                    </div>
                </div>
            </header>
            <div className="container mx-auto max-w-6xl flex pt-16">
                <aside className="w-48 p-6 flex flex-col gap-2  m-4 ">
                    <div className="font-mono text-base font-bold">Projects</div>
                    <ul className="border-l space-y-2">

                        <li>
                            <SideNavLink href="/dashbord/projects/complex_powers">Complex Powers</SideNavLink>

                        </li>
                            <SideNavLink href="/dashbord/projects/other">Other Project</SideNavLink>
                        <li>
                        </li>
                        <li>
                            <SideNavLink href="/dashbord/projects/another">Another One</SideNavLink>
                        </li>


                    </ul>
         
                </aside>
                <main className="flex-grow flex flex-col m-4">
                    <div className="bg-white flex-grow p-8 shadow-2xl overflow-y-auto font-mono">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
