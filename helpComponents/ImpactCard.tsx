import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";



type ImpactCardProps = {
  logo: React.ReactNode
    // logo: string,
    heading: string
    desc: string
}


export default function ImpactCard({
    logo, heading, desc
}:ImpactCardProps){
    return(
        <div className="w-[75%] md:w-[30%] hover:scale-[1.04] ">
            <Card >
            <CardHeader>
                <CardTitle>{logo}</CardTitle>
                <CardDescription className="text-xl font-bold mt-2">{heading}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-lg">{desc}</p>
            </CardContent>
            </Card>
        </div>
    )
}