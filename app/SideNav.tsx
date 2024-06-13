'use client'

import { usePathname } from "next/navigation";
import Link from 'next/link'

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

function SideNavLink({ href, children }: NavLinkProps) {

    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
        <Link
            href={href}
            className={`${isActive ? 'text-blue-600 font-bold border-blue-600 border-l-2' : 'text-gray-700 hover:text-gray-800 hover:border-slate-400'} block -m-px border-l border-transparent pl-4 font-mono text-base `}
        >
            {children}
        </Link>
    );
}

interface linkProps {
    href: string;
    name: string;
}

interface SideNavProps {
    title: string;
    links: linkProps[];
    
}

export default function SideNav({title, links}: SideNavProps) {



    return (
        <aside className="w-48 p-6 flex flex-col gap-2 m-4">
            <div className="font-mono text-base font-bold">{title}</div>
                <ul className="border-l space-y-2">

                    {links.map((link, index) => (
                        <li>
                            <SideNavLink href={link.href}>{link.name}</SideNavLink>
                        </li>
                    ))}
                </ul>

        </aside>
    );
}