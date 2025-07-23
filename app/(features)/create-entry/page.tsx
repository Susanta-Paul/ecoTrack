"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useState } from "react"



export default function Page(){

    const [errorMsg, setErrorMsg]=useState("")
    const [successMsg, setSuccessMsg]=useState("")
    const [isLoading, setIsLoading]=useState(false)
    const [months, setMonths]=useState([
        {value:"01", naam:"January"},
        {value:"02", naam:"February"},
        {value:"03", naam:"March"},
        {value:"04", naam:"April"},
        {value:"05", naam:"May"},
        {value:"06", naam:"June"},
        {value:"07", naam:"July"},
        {value:"08", naam:"August"},
        {value:"09", naam:"September"},
        {value:"10", naam:"October"},
        {value:"11", naam:"November"},
        {value:"12", naam:"December"},
    ])
    const [years, setYears]=useState([2025, 2026, 2027])



    async function handleSubmit(e: any){
        setIsLoading(true)
        e.preventDefault()
        

        const data={
            electricity: {
                amount: e.target.consumption.value,
                unit: e.target.eunit.value
            },
            travel: {
                amount: e.target.tmoney.value,
                unit: e.target.tunit.value
            },
            food: {
                amount: e.target.fmoney.value,
                unit: e.target.funit.value
            },
            misc: {
                amount: e.target.mmoney.value,
                unit: e.target.munit.value
            },
        }

        const when=`${e.target.year.value}-${e.target.month.value}`

        try {
            const result=await axios.post("/api/emission", {categoryData:data, month:when})
    
            console.log(result)
            if(result.status==201){
                setSuccessMsg("Data Successfully uploaded")
            }

        } catch (error:any) {
            setErrorMsg(`${error.response.data.message}`)
            
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <div className="w-full mt-15">

            <div className="text-2xl text-green-500">
                {successMsg}
            </div>

            <div className="flex justify-center items-center pb-15">
                <Card className="w-[90%] lg:w-[50%]">
                    <CardHeader>
                        <CardTitle>
                            <h1
                            className="text-3xl font-bold"
                            >Calculate Your Monthly Carbon Footprint</h1>
                            </CardTitle>
                        <CardDescription>
                        Description
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <div className="flex flex-col gap-6">

                            <div className="flex gap-6 text-xl flex-col lg:flex-row">
                                <label htmlFor="month" className=" font-bold">Month:</label>
                                <select id="month" name="electri-unit"
                                className="font-bold bg-black">
                                    {months.map((month, index)=>(
                                        <option key={index} value={month.value}>{month.naam}</option>
                                    ))}
                                </select>

                                <label htmlFor="year" className=" font-bold">Year:</label>
                                <select id="year" name="electri-unit"
                                className="font-bold bg-black">
                                    {years.map((year, index)=>(
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="">
                                <h2 className="text-2xl font-bold">Electricity</h2>
                                <div className="flex gap-6 items-start lg:items-center flex-col lg:flex-row">
                                    <label htmlFor="consumption" className=" font-bold">Consumption:</label>
                                    <input
                                    className="border border-white rounded-sm h-9"
                                        id="consumption"
                                        type="number"
                                        placeholder="Consumption"
                                        required
                                        name="consump"
                                    />
                                    <label htmlFor="eunit" className=" font-bold">Unit:</label>
                                    <select id="eunit" name="electri-unit"
                                    className="font-bold bg-black">
                                        <option value="kWh">kWh</option>
                                        <option value="MWh">MWh</option>
                                    </select>
                                </div>
                            </div>



                            <div className="">
                                <h2 className="text-2xl font-bold">Food</h2>
                                <div className="flex gap-6 items-start lg:items-center flex-col lg:flex-row">
                                    <label htmlFor="fmoney" className=" font-bold">Money Spend:</label>
                                    <input
                                    className="border border-white rounded-sm h-9"
                                        id="fmoney"
                                        type="number"
                                        placeholder="Money Spend"
                                        required
                                        name="consump"
                                    />
                                    <label htmlFor="funit" className=" font-bold">Unit:</label>
                                    <select id="funit" name="electri-unit"
                                    className="font-bold bg-black">
                                        <option value="inr">INR</option>
                                        <option value="usd">USD</option>
                                    </select>
                                </div>
                            </div>



                            <div className="">
                                <h2 className="text-2xl font-bold">Travel</h2>
                                <div className="flex gap-6 items-start lg:items-center flex-col lg:flex-row">
                                    <label htmlFor="tmoney" className=" font-bold">Money Spend:</label>
                                    <input
                                    className="border border-white rounded-sm h-9"
                                        id="tmoney"
                                        type="number"
                                        placeholder="Money Spend"
                                        required
                                        name="consump"
                                    />
                                    <label htmlFor="tunit" className=" font-bold">Unit:</label>
                                    <select id="tunit" name="electri-unit"
                                    className="font-bold bg-black">
                                        <option value="inr">INR</option>
                                        <option value="usd">USD</option>
                                    </select>
                                </div>
                            </div>



                            <div className="">
                                <h2 className="text-2xl font-bold">Misc</h2>
                                <div className="flex gap-6 items-start lg:items-center flex-col lg:flex-row">
                                    <label htmlFor="mmoney" className=" font-bold">Money Spend:</label>
                                    <input
                                    className="border border-white rounded-sm h-9"
                                        id="mmoney"
                                        type="number"
                                        placeholder="Money Spend"
                                        required
                                        name="consump"
                                    />
                                    <label htmlFor="munit" className=" font-bold">Unit:</label>
                                    <select id="munit" name="electri-unit"
                                    className="font-bold bg-black">
                                        <option value="inr">INR</option>
                                        <option value="usd">USD</option>
                                    </select>
                                </div>
                            </div>

                            <p className="text-red-500 text-md"> {errorMsg} </p>
                            <Button disabled={isLoading} className="cursor-pointer bg-white text-black hover:text-white" variant="secondary"> 
                                {isLoading? "Adding...": "Add Data"}
                                </Button>
                        </div>
                        </form>
                    </CardContent>
                    </Card>

            </div>
            
        </div>
    )
}