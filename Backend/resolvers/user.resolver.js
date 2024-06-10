import {users} from "../dummydata/data.js"

const userResolver = {

    Query:{
        users:()=>{
            return users;

        }

    },
    Mutation:{

    }
}

export default userResolver;