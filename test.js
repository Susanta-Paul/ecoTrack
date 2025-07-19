// import axios from "axios";

import { ChatGroq } from "@langchain/groq"
import {ChatPromptTemplate} from "@langchain/core/prompts"

// try {
//     const data=[
//             {
//                 "emission_factor": {
//                     "activity_id": "electricity-supply_grid-source_coal-station_butibori_ii",
//                     "source": "Government of India - Central Electricity Authority",
//                     "region": "IN-MH",
//                     "year": 2024,
//                     "source_lca_activity": "electricity_generation",
//                     "data_version": "^23",
//                     "allowed_data_quality_flags": [
//                         "partial_factor"
//                     ]
//                 },
//                 "parameters": {
//                     "energy": 3600,
//                     "energy_unit": "kWh"
//                 }
//             }, 
//             {
//                 "emission_factor": {
//                     "activity_id": "consumer_goods-type_food_products_not_elsewhere_specified",
//                     "source": "EXIOBASE",
//                     "region": "IN",
//                     "year": 2019,
//                     "source_lca_activity": "unknown",
//                     "data_version": "^23"
//                 },
//                 "parameters": {
//                     "money": 5000,
//                     "money_unit": "inr"
//                 }
//             },
//             {
//                 "emission_factor": {
//                     "activity_id": "transport_services-type_supporting_auxiliary_and_travel_agency_services",
//                     "source": "EXIOBASE",
//                     "region": "IN",
//                     "year": 2019,
//                     "source_lca_activity": "unknown",
//                     "data_version": "^23"
//                 },
//                 "parameters": {
//                     "money": 50000,
//                     "money_unit": 'inr'
//                 }
//             },
//             {
//                 "emission_factor": {
//                     "activity_id": "education-type_education_services",
//                     "source": "EXIOBASE",
//                     "region": "IN",
//                     "year": 2019,
//                     "source_lca_activity": "unknown",
//                     "data_version": "^23"
//                 },
//                 "parameters": {
//                     "money":20000,
//                     "money_unit":'inr'
//                 }
//             }
//         ]
    
//     const response= await axios.post("https://api.climatiq.io/data/v1/estimate/batch",
//         data,
//         {headers:{
//             Authorization: `Bearer 
//         }}
//     )
//     if(response.status==200){
//         // console.log(response.data.results)
//         const final=response.data.results
//         const ans= {
//             Electricity: `${final[0].co2e} kg `,
//             Food: `${final[1].co2e} kg `,
//             Travel: `${final[2].co2e} kg `, 
//             Misc: `${final[3].co2e} kg `
//         }
//         console.log(ans)
//     }

// } catch (error) {
//     console.error(error)
// }


const llm= new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        apiKey: ""
         
    })

    const prompt=ChatPromptTemplate.fromMessages([
        ["system", `
            
            You are GreenGuru, a friendly and knowledgeable sustainability advisor helping users reduce their carbon footprint.

            The user you're helping is motivated to live more sustainably and appreciates practical, personalized advice.

            This month, they recorded a total carbon footprint of {totalFootprint} kg CO₂.

            Here's the breakdown of their emissions:
            - Electricity: {electricity} kg
            - Food: {food} kg
            - Transport: {transport} kg
            - Misc: {misc} kg

            Based on this data, provide **three specific, actionable tips** they can follow next month to reduce their emissions. Your advice should reflect which categories are highest and suggest attainable changes.

            Please format your response as:

            Start with a great motivational quote that keep them up for reducing it.

            and them arrange them in such order: 
            1. **Category**: [Tip]

            2. **Category**: [Tip]

            3. **Category**: [Tip]

            Keep the tip short, crisp and actionable

            Keep your tone warm, optimistic, and helpful. Avoid generic advice — make each tip feel tailored to this user.

            
            `],
    ])

    const chain= prompt.pipe(llm)

    const result= await chain.invoke({
        totalFootprint: 14500,
        electricity: 4000,
        food: 2500,
        transport: 3000,
        misc: 5000,
    })

    console.log(result.content)