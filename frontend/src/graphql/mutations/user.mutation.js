import { gql } from "@apollo/client";


export const SIGNUP_MUTATION = gql`

mutation Signup($input : SignupInput!){
    signup(input:$input){
    _id,
    name
}

}


`