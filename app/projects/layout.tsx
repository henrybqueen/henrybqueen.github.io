'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';

import SideNav from '../SideNav';


export default function Layout({children}: {children: React.ReactNode}) {



    return (
        <div className="flex h-full">
            <SideNav 

                title="Projects"
                links={[{href: "/projects/complex_powers", name: "Complex Powers"},
                        {href: "/projects/another", name: "Another One"}
                ]}
            
            />

            <div className="bg-white p-8 m-4 shadow-2xl overflow-y-auto font-mono aspect-square" >
                {children}
            </div>

        </div>
    )

}