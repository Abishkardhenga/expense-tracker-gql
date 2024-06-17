import { gql } from "@apollo/client";


export const CREATE_TRANSACTION = gql`

mutation createTransaction($input:CreateTransactionInput!){
    createTransaction(input:$input){

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


export const UPDATE_TRANSACTION = gql`
mutation updateTransaction($input:UpdateTransactionInput!){
    updateTransaction(input:$input){

    
        _id
    amount
    description
    location
    userId



    }

}


`


export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($transactionId: ID!) {
  deleteTransaction(transactionId: $transactionId) {

    _id
   

  }
}


`




