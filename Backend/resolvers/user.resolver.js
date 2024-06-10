import {users} from "../dummydata/data.js"

const userResolver = {

    Query:{
        users:()=>{
            return users;

        },
        user:(_,{userId})=>{
            return users.find((item)=>
            item._id==userId)
        }

    },
    Mutation:{

    }
}

export default userResolver;