"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
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
import {CarbonEntry, CarbonEntry as type} from "./OverallEmissionChart"
import { tr } from "zod/v4/locales"


type pieData={
    category:string,
    value: number,
    fill:string
}


export default function PieChartComp({chartData}:{chartData:CarbonEntry[]}){

    

    const [pieChartData, setPieChartData] = useState<pieData[]>([
    ])

    const chartConfig = {
    value: {
        label: "Value",
    },
    Electricity: {
        label: "Electricity",
        color: "yellow",
    },
    Travel: {
        label: "Travel",
        color: "blue-200",
    },
    Food: {
        label: "Food",
        color: "green",
    },
    Misc: {
        label: "Misc",
        color: "red",
    },
    } satisfies ChartConfig

    useEffect(()=>{
        let electricity=0
        let travel=0
        let food=0
        let misc=0

        chartData.forEach((data)=>{
            electricity+=data.electricity
            travel+=data.travel
            food+=data.food
            misc+=data.misc
        })

        setPieChartData([
            {category:"Electricity", value: electricity, fill:"yellow"},
            {category:"Travel", value: travel, fill:"blue"},
            {category:"Food", value: food, fill:"green"},
            {category:"Misc", value: misc, fill:"red"},
        ])

        
    },[chartData])


    return(
        <Card className="flex flex-col w-full md:w-[45%] mt-7">
            <CardHeader className="items-center pb-0 ">
                <CardTitle className="font-bold text-xl lg:text-3xl">Your Total Carbon Distribution</CardTitle>
                <CardDescription>Based on all of your past data</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                config={chartConfig}
                className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                <PieChart className="z-0">
                    <ChartTooltip
                    content={<ChartTooltipContent nameKey="value" hideLabel />}
                    />
                    <Pie data={pieChartData} dataKey="value" outerRadius={120} className="z-0">
                    <LabelList
                        dataKey="category"
                        className="font-bold text-white fill-background"
                        stroke="none"
                        fontSize={20}
                        formatter={(value: keyof typeof chartConfig) =>
                        chartConfig[value]?.label
                        }
                    />
                    </Pie>
                </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
