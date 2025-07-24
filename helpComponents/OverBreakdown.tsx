"use client"

import { CarbonEntry } from "./OverallEmissionChart";
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



export default function OverBreakdown({chartData}:{chartData:CarbonEntry[]}){


    const chartConfig = {
    electricity: {
        label: "Electricity",
        color: "yellow",
    },
    travel: {
        label: "Travel",
        color: "blue",
    },
    food: {
        label: "Food",
        color: "green",
    },
    misc: {
        label: "Misc",
        color: "red",
    },
    } satisfies ChartConfig


    return(
        <Card className="w-full md:w-[45%] mt-7">
            <CardHeader>
                <CardTitle className="font-bold text-xl lg:text-3xl">Your Total Carbon Emission BreakDown</CardTitle>
                <CardDescription>all past record</CardDescription>
                {/* <CardAction className="font-bold text-blue-400 lg:text-xl">{total} Kg CO_2</CardAction> */}
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
                                dataKey="electricity"
                                type="natural"
                                stroke="var(--color-electricity)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-electricity)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <Line
                                dataKey="travel"
                                type="natural"
                                stroke="var(--color-travel)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-travel)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <Line
                                dataKey="food"
                                type="natural"
                                stroke="var(--color-food)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-food)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <Line
                                dataKey="misc"
                                type="natural"
                                stroke="var(--color-misc)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-misc)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
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
    )
}