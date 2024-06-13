import Link from 'next/link';


interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isCurrent?: boolean;
}

export default function NavLink({ href, children, isCurrent = false }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="font-mono flex items-center justify-start rounded-lg transition-colors h-12"
        >
            <span>{children}</span>
        </Link>
    );
}
