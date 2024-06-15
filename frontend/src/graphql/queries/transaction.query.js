import { gql } from "@apollo/client";



export const   GET_TRANSACTION = gql `

query transactions{

transactions{
    _id
    amount
    category
    date
    description
    location
    paymentType
    userId
}

}


`