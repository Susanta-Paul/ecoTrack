import axios from "axios";

try {
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
                    "energy": 3600,
                    "energy_unit": "kWh"
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
                    "money": 5000,
                    "money_unit": "inr"
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
                    "money": 50000,
                    "money_unit": 'inr'
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
                    "money":20000,
                    "money_unit":'inr'
                }
            }
        ]
    
    const response= await axios.post("https://api.climatiq.io/data/v1/estimate/batch",
        data,
        {headers:{
            Authorization: `Bearer W7Z05FGE4N6HQ433X2YMDQV10G`
        }}
    )
    if(response.status==200){
        // console.log(response.data.results)
        const final=response.data.results
        const ans= {
            Electricity: `${final[0].co2e} kg `,
            Food: `${final[1].co2e} kg `,
            Travel: `${final[2].co2e} kg `, 
            Misc: `${final[3].co2e} kg `
        }
        console.log(ans)
    }

} catch (error) {
    console.error(error)
}