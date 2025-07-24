import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AiSuggestion({total}:{total:string}){


    const [sugg, setSugg]=useState("")

    useEffect(()=>{

        async function getAi(){
            const result= await axios.post("/api/recommendations", {total})

            setSugg(result.data.data)

        }

        getAi()

    },[])


    return(
        <Card className="w-full md:w-[45%] mt-7">
            <CardHeader>
                <CardTitle className="font-bold text-xl lg:text-3xl">Personalized AI-Suggestion for Reducting your carbon Emission </CardTitle>
                <CardDescription>Based on all your past Data</CardDescription>
                {/* <CardAction className="font-bold text-blue-400 lg:text-xl">{total} Kg CO_2</CardAction> */}
            </CardHeader>
            <CardContent>

                {sugg}
                
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month
                </div>
                <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}