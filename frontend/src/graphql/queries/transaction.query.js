import { gql } from "@apollo/client";



export const   GET_TRANSACTIONS= gql `

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


export const   GET_TRANSACTION= gql `

query transaction($transactionId:ID!){

transaction(transactionId:$transactionId){
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