import { ChatGroq } from '@langchain/groq';
import {ChatPromptTemplate} from "@langchain/core/prompts"
import entryModel from '@/models/entry';


export async function POST(request: Request) {


    const {totalCarbon}= await request.json()

    try {

        const entry= await entryModel.findOne().sort({createdAt: -1})

        if(!entry){
            return Response.json(
                {success:false, message: "Failed to get the data from Database"},
                {status: 500}
            )
        }

        const llm= new ChatGroq({
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            apiKey: process.env.GROQ_API_KEY
             
        })
    
        const prompt=ChatPromptTemplate.fromMessages([
            ["system", `
                
                You are GreenGuru, a friendly and knowledgeable sustainability advisor helping users reduce their carbon footprint.
    
                The user you're helping is motivated to live more sustainably and appreciates practical, personalized advice.
    
                This month, they recorded a total carbon footprint of {totalFootprint} kg CO₂.
    
                Here's the breakdown of their emissions:
                - Electricity: {electricity} kg
                - Food: {food} kg
                - Travel: {travel} kg
                - Misc: {misc} kg
    
                Based on this data, provide **three specific, actionable tips** they can follow next month to reduce their emissions. Your advice should reflect which categories are highest and suggest attainable changes.
    
                Please format your response as:
    
                Start with a great motivational quote that keep them up for reducing it.
    
                and them arrange them in such order: 
                1. **Category**: [Tip]
    
                2. **Category**: [Tip]
    
                3. **Category**: [Tip]
    
                Keep the tip short, crisp and actionable

                and format the categories with new line usign "/n" as needed
    
                Keep your tone warm, optimistic, and helpful. Avoid generic advice — make each tip feel tailored to this user.
    
                
                `],
        ])
    
        const chain= prompt.pipe(llm)
    
        const result= await chain.invoke({
            totalFootprint: totalCarbon,
            electricity: entry.totalCarbon.Electricity,
            food: entry.totalCarbon.Food,
            travel: entry.totalCarbon.Travel,
            misc: entry.totalCarbon.Misc,
        })

        return Response.json(
            {success: true, data: result.content},
            {status: 200}
        )

    } catch (error) {
        console.error(error)
        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
    }
    
}