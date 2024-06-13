import passport from "passport";
import bycrypt from "bcryptjs"
import User from "../models/user.model.js"
import { GraphQLLocalStrategy } from "graphql-passport";


const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing user")
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {

        console.log("Deserailing user")
        const user = User.findById(id)
        done(null, user)

        try {

        } catch (error) {
            done(error)

        }
    })
    passport.use(


        new GraphQLLocalStrategy(
            async (username, password, done) => {

                try {
                    const user = User.findOne({ username })
                    if (!user) {
                        throw new Error("Invalid username or password")
                    }
                    const validPassword = await bycrypt.compare(password, user.password)
                    if (!validPassword) {
                        throw new Error("Invalie username or password")
                    }
                    return done(null, user);

                } catch (error) {
                    return done(error);

                }

            }
        )

    )
}


export default configurePassport;