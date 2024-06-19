import { gql } from "@apollo/client";



export const GET_AUTHENTICATED_USER =  gql`
query authenticated_user {

    authUser {
    _id
    profilePicture
    name
  }


}

`


export const GET_USER_TRANSACTION = gql `

query get_user_transaction($userId:ID!){
user(userId:$userId){
  _id 
  name 
  gender 
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
}
`