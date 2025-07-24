"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"
import PieChartComp from "./PieChart"
import OverBreakdown from "./OverBreakdown"
import AiSuggestion from "./AiSuggestion"


export type CarbonEntry = {
  month: string
  electricity: number
  travel: number
  food: number
  misc: number
  total: number
}



export default function OverallEmissionChart(){

    const [chartData, setChartData] = useState<CarbonEntry[]>([])

    const [total, setTotal]=useState<string>("0")


    const chartConfig = {
    total: {
        label: "Total",
        color: "green",
    }
    } satisfies ChartConfig


    useEffect(()=>{

        async function getEntry(){

            const result= await axios.get("/api/emission")

            const allEntry=result.data.allEntry

            const formattedData= [...allEntry].reverse().map((entry: any) => ({
                month: entry.month,
                electricity: entry.totalCarbon?.Electricity || 0,
                travel: entry.totalCarbon?.Travel || 0,
                food: entry.totalCarbon?.Food || 0,
                misc: entry.totalCarbon?.Misc || 0,
                total: entry.totalCarbon?.Misc + entry.totalCarbon?.Food + entry.totalCarbon?.Travel + entry.totalCarbon?.Electricity || 0
            }))
            let full=0
            formattedData.forEach((data)=>{
                full+= data.total
            })
            
            setTotal(full.toFixed(2))

            setChartData(formattedData)


        }

        getEntry()

    },[])



    return (
        <div className="w-full pb-20">
            
            <div className="flex flex-col justify-around md:flex-row">
                <Card className="w-full md:w-[45%] mt-7">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl lg:text-3xl">Your Total Carbon Emission</CardTitle>
                        <CardDescription>all past record</CardDescription>
                        <CardAction className="font-bold text-blue-400 lg:text-xl">{total} Kg CO_2</CardAction>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{ left: 32, right: 12 }}
                            >
                                <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={true}
                                        axisLine={true}
                                        tickMargin={8}
                                        // tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                        />
                                    <Line
                                        dataKey="total"
                                        type="natural"
                                        stroke="var(--color-total)"
                                        strokeWidth={2}
                                        dot={{
                                            fill: "var(--color-total)",
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    />
                                    {/* <Line
                                        dataKey="desktop"
                                        type="natural"
                                        stroke="var(--color-desktop)"
                                        strokeWidth={2}
                                        dot={{
                                            fill: "var(--color-desktop)",
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    /> */}
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground leading-none">
                        Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

                <PieChartComp chartData={chartData} />  
            </div> 

            <div className="flex flex-col justify-around md:flex-row">
                <OverBreakdown chartData={chartData} />
                <AiSuggestion total={total} />
            </div>

        </div>
    )
}