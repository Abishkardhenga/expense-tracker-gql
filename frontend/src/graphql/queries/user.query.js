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
