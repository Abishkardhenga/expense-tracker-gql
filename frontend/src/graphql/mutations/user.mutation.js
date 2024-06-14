import { gql } from "@apollo/client";


export const SIGNUP_MUTATION = gql`

mutation Signup($input : SignupInput!){
    signup(input:$input){
    _id,
    name
}

}


`


export const LOGIN_MUTATION = gql`
mutation login($input: LoginInput!){


    login(input:$input){
        _id
        name
      

    }
}



`

export const LOGOUT_MUTATION = gql`
mutation Logout {
    logout{
        message
    }
}



`