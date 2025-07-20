import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      
      {/* NAV BAR*/}

      <div className="bg-[#000000] sticky top-0 flex justify-between items-center border-b border-white py-3 px-1 md:px-5 ">
        <div className="flex gap-5 items-center">
          <img 
          className="h-10 w-10 rounded-full"
          src="https://img.freepik.com/free-vector/flat-design-carbon-footprint-label_23-2149404813.jpg" alt="logo" />
          <h1
          className="text-xl font-bold"
          >EcoTrack</h1>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center md:items-center md:flex-row">
          <Link href="/signup"><Button variant="secondary" 
            className="cursor-pointer bg-green-700 hover:bg-green-500"
            > Start Tracking </Button></Link>
          <Link href="signin"><Button variant="outline"
            className="cursor-pointer"
            > Login </Button></Link>
        </div>
      </div>

      {/* HERO SECTION */}

      <div className="flex justify-center mt-9 ">
        <div className="w-[90%] lg:h-[70vh] overflow-hidden rounded-xl relative wrap-break-word md:w-[77%] ">
          <img 
            className="w-full rounded-lg absolute top-0 z-[-1] blur-xs"
          src="https://t3.ftcdn.net/jpg/04/86/65/22/360_F_486652252_7CzIJo0TlgxTWFGbqv7SG0hwiJESAEh7.jpg" />
          <div className="w-full lg:h-full flex flex-col justify-center items-center">
            <h1
              className="text-4xl md:text-7xl text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold"
              >Track Your Carbon. Save Money. Live Cleaner</h1>
            <p
              className="text-md md:text-lg md:mt-3 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >AI-powered carbon footprint insights at your fingertips</p>

            <div className="mt-5">
              <Link href="/signup"><Button variant="secondary" className="md:text-xl md:h-12 rounded-2xl cursor-pointer bg-green-700 hover:bg-green-500 mr-5">Start Tracking</Button></Link>
              <Link href="/signin"><Button variant="secondary" className="md:text-xl md:h-12 rounded-2xl bg-[#000000] cursor-pointer ">Login</Button></Link>
            </div>
          </div>
          
        </div>
      </div>

      
    </div>
  );
}
