import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import entryModel from "@/models/entry";
import userModel from "@/models/user";
import axios from "axios";
import { getServerSession } from "next-auth";




export async function POST(request:Request) {

    await dbConnect()

    
    const session=await getServerSession(authOptions)
    
    if(!session?.user?.id){
        return Response.json(
            {success: false, message: "Login first"},
            {status: 401}
        )
    }
    
    try {

        const {categoryData, month}=await request.json()

        // will calculate the carbon emissions using ClimateQ (later...)
        const data=[
            {
                "emission_factor": {
                    "activity_id": "electricity-supply_grid-source_coal-station_butibori_ii",
                    "source": "Government of India - Central Electricity Authority",
                    "region": "IN-MH",
                    "year": 2024,
                    "source_lca_activity": "electricity_generation",
                    "data_version": "^23",
                    "allowed_data_quality_flags": [
                        "partial_factor"
                    ]
                },
                "parameters": {
                    "energy": parseInt(categoryData.electricity.amount),
                    "energy_unit": categoryData.electricity.unit
                }
            }, 
            {
                "emission_factor": {
                    "activity_id": "consumer_goods-type_food_products_not_elsewhere_specified",
                    "source": "EXIOBASE",
                    "region": "IN",
                    "year": 2019,
                    "source_lca_activity": "unknown",
                    "data_version": "^23"
                },
                "parameters": {
                    "money": parseInt(categoryData.food.amount),
                    "money_unit": categoryData.food.unit
                }
            },
            {
                "emission_factor": {
                    "activity_id": "transport_services-type_supporting_auxiliary_and_travel_agency_services",
                    "source": "EXIOBASE",
                    "region": "IN",
                    "year": 2019,
                    "source_lca_activity": "unknown",
                    "data_version": "^23"
                },
                "parameters": {
                    "money": parseInt(categoryData.travel.amount),
                    "money_unit": categoryData.travel.unit
                }
            },
            {
                "emission_factor": {
                    "activity_id": "education-type_education_services",
                    "source": "EXIOBASE",
                    "region": "IN",
                    "year": 2019,
                    "source_lca_activity": "unknown",
                    "data_version": "^23"
                },
                "parameters": {
                    "money": parseInt(categoryData.misc.amount),
                    "money_unit": categoryData.misc.unit
                }
            }
        ]

        // hit the api to climateQ

        const response= await axios.post("https://api.climatiq.io/data/v1/estimate/batch",
            data,
            {headers: {
                Authorization: `Bearer ${process.env.CLIMATEQ_API_KEY} `
            }}
        )

        let total={}

        if(response.status==200){
            const final=response.data.results
            total= {
                Electricity: final[0].co2e, 
                Food: final[1].co2e ,
                Travel: final[2].co2e , 
                Misc: final[3].co2e ,     
            }
        }else{
            return Response.json(
                {success: false, error: "Failed to calculate the Carbon Emission"},
                {status: 500}
            )
        }

        // return Response.json(
        //     {success: true, message: total},
        //     {status: 200}
        // )

        
        const newEntry= await entryModel.create({
            user: session.user.id,
            category: categoryData,
            totalCarbon:total,
            month: month,
        })

        return Response.json(
            {success: true, message: "Entry successfully uploaded", newEntry: newEntry},
            {status: 201}
        )


    } catch (error) {

        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
        
    }

}


export async function GET(request:Request) {

    await dbConnect()

    const session=await getServerSession(authOptions)

    try {
        if(!session?.user?.id){
            return Response.json(
                {success: false, message: "Login First"},
                {status: 401}
            )
        }
    
        const allEntry= await entryModel.find({user: session.user.id}).sort({ createdAt: -1 })
    
        return Response.json(
            {success: true, allEntry: allEntry},
            {status: 200}
        )
    } catch (error) {
        console.log(error)
        return Response.json(
            {success: false, error: error},
            {status: 500}
        )
    }
    
}