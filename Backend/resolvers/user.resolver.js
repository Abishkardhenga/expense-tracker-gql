import { users } from "../dummydata/data.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js";

const userResolver = {

    Query: {

        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user;

            }
            catch (err) {
                console.log("err while quering", err)
            }

        },

        authUser: async (_, __, contextValue) => {
            try {
                const user = await contextValue.getUser();
                return user;
            } catch (err) {
                console.log("Error in auth user", err);
                throw new Error(err.message || "Internal Server Error");
            }
        },

    },
    Mutation: {
        signup: async (_, { input }, contextValue) => {
            try {
                const { username, name, password, gender } = input;

                if (!username || !name || !password || !gender) {
                    throw new Error("Please enter all the fields")
                }

                const existingUser = await User.findOne({ username })
                if (existingUser) {
                    throw new Error("User Exist Already")
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt)

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "Male" ? boyProfilePic : girlProfilePic

                })
                await newUser.save()
                await contextValue.login(newUser)
                return newUser;

            } catch (error) {
                console.log("Signup Error", error)
                throw new Error(error.message || "Internal Server Error")

            }




        },
        login: async (_, { input }, contextValue) => {
            try {
                const { username, password } = input;
                console.log("username", username)
                console.log("password", password)
        
                if (!username || !password) {
                    throw new Error("Username and password are required.");
                }
        
                const { user } = await contextValue.authenticate("graphql-local", { username, password });
                console.log("user", user)
                await contextValue.login(user);
                return user;
            } catch (error) {
                console.error("Login error:", error);
                throw new Error(error.message);
            }
        },
        
        logout: async (_, __, contextValue) => {
            try {



       

                await contextValue.logout()
                await new Promise((resolve, reject) => {
                    contextValue.req.session.destroy((err) => {
                      if (err) {
                        return reject(new Error(err.message));
                      }
                      resolve();
                    });
                  });

                await contextValue.res.clearCookie("connect.sid")
                return { message: "Logout successfully " }


            }
            catch (err) {
                console.log("Error while logout ", err)
                throw new Error(err.message || "Internal Server Error")

            }

        }

    }
}

export default userResolver;