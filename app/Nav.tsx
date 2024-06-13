import Link from 'next/link'


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

export default function Nav() {


    return (
        <header className="bg-gradient-to-r from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90% shadow fixed w-full z-10">
            <div className="container mx-auto max-w-6xl flex items-center justify-between p-4 h-12">
                <div className=" font-mono font-bold text-xl">
                    <Link href="/">Henry Queen</Link>
                </div>
                <div className="font-mono flex gap-6">
                    <NavLink href="/projects">Projects</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </div>
            </div>
        </header>
    )
    
}