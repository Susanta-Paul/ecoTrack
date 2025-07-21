"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ImpactCard from "@/helpComponents/ImpactCard";
import {BrainCircuit, CircleDollarSign, Leaf, NotebookPen, Sprout, Trees} from "lucide-react"
import { useState } from "react";

export default function Home() {

  const [impactData, setImpactData]=useState([
    {
      logo: <Trees size={38} />, 
      heading: "Track your emissions",
      desc: "Monitor your carbon footprint accross various activities."
    },
    {
      logo: <CircleDollarSign size={32} />, 
      heading: "Get personalized insights",
      desc: "Receive tailored recommendations to minimize your environmental impacts."
    },
    {
      logo: <Leaf size={32} />, 
      heading: "Reduce your impact",
      desc: "Implement sustainable practices and track your progress"
    },
  ])

  const [steps, setSteps]=useState([
    {
      logo: <NotebookPen size={38} />, 
      heading: "Input Your Data",
      desc: "Share lifestyle details like energy use, travel habits, and food choices through a quick, user-friendly form."
    },
    {
      logo: <BrainCircuit size={32} />, 
      heading: "AI-Powered Analysis",
      desc: "ecoTrack uses LangChain + OpenAI to calculate your carbon footprint and uncover hidden patterns in your daily life."
    },
    {
      logo: <Sprout  size={32} />, 
      heading: "Personalized Sustainability Tips",
      desc: "Get actionable suggestions tailored to you — from small habit tweaks to long-term eco strategies."
    },
  ])



  return (
    <div className="relative w-screen">
      
      {/* NAV BAR*/}

      <div className="bg-[#000000] z-[2] sticky top-0 flex justify-between items-center border-b border-white py-3">
        <div className="flex gap-5 items-center ml-4">
          <img 
          className="h-10 w-10 rounded-full"
          src="https://img.freepik.com/free-vector/flat-design-carbon-footprint-label_23-2149404813.jpg" alt="logo" />
          <h1
          className="text-xl font-bold"
          >EcoTrack</h1>
        </div>
        <div className="mr-5 flex flex-col items-center gap-4 justify-center md:items-center md:flex-row">
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

      {/* WHY MATTERS SECTION */}

      <div className="pb-10 mt-20 bg-gradient-to-b from-[#0A0A0A] to-green-900 ">
        <h1 className="pt-10 text-3xl font-bold my-5 ml-9 underline text-[#b7ff3c] md:ml-20 md:text-5xl ">Why This Matters?</h1>
        <div className="flex flex-col justify-center items-center gap-9 md:flex-row md:gap-3">
          <div className="w-[80%] md:w-[45%] ">
            <h1 
            className="text-4xl font-bold text-center md:text-5xl"
            >The average household emits 7 tons of CO₂ annually</h1>
          </div>
          <div className="flex justify-around px-4 md:w-[45%]">

            <div className="w-[30%] flex flex-col items-center">
              <img 
              className="w-15"
              src="https://cdn-icons-png.flaticon.com/512/167/167485.png" />
              <h2 className="text-xl font-bold text-[#5ccfe6] my-2 md:text-2xl">Your Lifestyle</h2>
              <p className="md:text-lg">Daily choices like driving, energy use, and diet make up your carbon footprint. Transportation alone contributes nearly half.</p>
            </div>
            
            <div className="w-[30%] flex flex-col items-center">
              <img 
              className="w-20"
              src="https://static.vecteezy.com/system/resources/thumbnails/055/542/479/small_2x/top-view-of-white-airplane-model-isolated-on-transparent-background-png.png" />
              <h2 className="text-xl font-bold text-[#5ccfe6] my-2 md:text-2xl">Do you know?</h2>
              <p className="md:text-lg">A single flight can undo months of sustainable habits. But what if you could balance it out?</p>
            </div>

            <div className="w-[30%] flex flex-col items-center">
              <img 
              className="w-15"
              src="https://cdn-icons-png.flaticon.com/512/2779/2779262.png" />
              <h2 className="text-xl font-bold text-[#5ccfe6] my-2 md:text-2xl">Carbon Footprint: The Invisible Threat</h2>
              <p className="md:text-lg">Carbon emissions drive climate change and threaten our health, food, and water. ecoTrack helps you reduce them — one habit at a time.</p>
            </div>

          </div>
        </div>
      </div>

      {/* UNDERSTAND IMPACT */}

      <div className="mt-20 bg-gradient-to-b from-[#0A0A0A] to-[#1a3a2c] py-9">
        <h1 className="text-[#b7ff3c] text-3xl font-bold underline ml-5 md:text-5xl md:ml-15">Understand Your Impact</h1>
        <p className="text-[#cbd5e1] text-lg m-6 md:text-xl md:ml-15">Our AI-Powered platform analyzes your lifestyle and privides personalized insights to reduce your carbon footprint. </p>
        
        <div className="w-screen flex flex-col items-center justify-center gap-4 md:flex-row md:items-start mt-5">

          {impactData.map((data, index)=>(

            <ImpactCard key={index} logo={data.logo} heading={data.heading} desc={data.desc} />
          ))}

        </div>
      </div>

      {/*HOW IT WORK */}

      <div className="mt-20 bg-gradient-to-b from-[#0A0A0A] to-[#1a3a2c] py-9">
        <h1 className="text-[#b7ff3c] text-3xl font-bold underline ml-5 md:text-5xl md:ml-15">How it Works</h1>
        <p className="text-[#cbd5e1] text-lg m-6 md:text-xl md:ml-15">Get personalized and AI-Powered insights in just 3 simple steps</p>
        
        <div className="w-screen flex flex-col items-center justify-center gap-4 md:flex-row md:items-start mt-5">

          {steps.map((data, index)=>(

            <ImpactCard key={index} logo={data.logo} heading={data.heading} desc={data.desc} />
          ))}

        </div>
      </div>

      
    </div>
  );
}
