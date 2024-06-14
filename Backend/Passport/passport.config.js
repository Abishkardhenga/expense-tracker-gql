import passport from "passport";
import bcrypt from "bcryptjs"; // Fixed typo from 'bycrypt' to 'bcrypt'
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

const configurePassport = () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing user");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user");
        try {
            const user = await User.findById(id); // Added 'await'
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(
            async (username, password, done) => {
                try {
                    const user = await User.findOne({ username }); // Added 'await'
                    if (!user) {
                        return done(new Error("Invalid username or password"));
                    }

                    const validPassword = await bcrypt.compare(password, user.password); // Added 'await'
                    if (!validPassword) {
                        return done(new Error("Invalid username or password"));
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

export default configurePassport;
