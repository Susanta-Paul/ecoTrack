"use client"

import { Button } from "@/components/ui/button";
import { ListCollapse } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){


    // const {data: session, status}=useSession()
    const pathname=usePathname()



    return(
        <div>
            <div className="h-screen relative">

                <nav className="w-screen flex justify-end text-xl font-bold py-3 border-b border-white lg:justify-between">
                    <ListCollapse size={32} className="ml-9 hidden lg:block"/>
                    <p className="mr-9">{ "Alex"}</p>
                </nav>

                <div className="flex flex-col-reverse lg:flex-row z-10">
                    <div 
                    className="fixed bottom-0 flex justify-around w-screen pb-2 lg:pt-5 lg:border-r lg:border-white lg:h-[90%] lg:static lg:items-center lg:gap-4 lg:flex-col lg:w-[13%] ">
                        
                        <Link href="/home" className="z-10 lg:w-[80%]"><Button variant="secondary"
                        className={pathname=="/home"? "text-black bg-white hover:text-white w-full ": "cursor-pointer w-full " }
                        >Home</Button></Link>

                        <Link href="/create-entry" className="z-10 lg:w-[80%]"><Button variant="secondary"
                        className={pathname=="/create-entry"? "text-black bg-white hover:text-white w-full ": "cursor-pointer w-full "}
                        >Crete Entry</Button></Link>

                        <Link href="/show-history" className="z-10 lg:w-[80%]"><Button variant="secondary"
                        className={pathname=="/show-history"? "text-black bg-white hover:text-white w-full ": "cursor-pointer w-full "}
                        >Show History</Button></Link>
                    </div>
                    
                    <div className="w-screen lg:w-[77%]]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}