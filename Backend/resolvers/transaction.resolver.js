import Transaction from "../models/transaction.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, contextValue) => {
            try {
                if (!contextValue.getUser()) throw new Error("UnAuthorized User")
                const userId = await contextValue.getUser()._id

                const transaction = Transaction.find({ userId })
                return transaction;
            } catch (error) {
                console.log("Error occur during transaciotn", error)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = Transaction.findById(transactionId)
                return transaction;


            } catch (error) {
                console.log("Error occur during transaciotn", error)
                throw new Error(error.message || "Internal Server Error")

            }

        },
        categoryStatistics: async (_, __, contextValue) => {
            try {
                if (!contextValue.getUser()) return new MessageChannel("Unauthorized Access ")
                const userId = contextValue.getUser().id;
                const transactions = await Transaction.find({ userId })
                const categoryMap = {};
                transactions.forEach((transaction) => {
                    if (!categoryMap[transaction.category]) {
                        categoryMap[transaction.category] = 0;
                    }
                    categoryMap[transaction.category] += transaction.amount
                })
                return Object.entries(categoryMap).map(([category, totalAmount]) => {
                    return { category, totalAmount };

                })


            } catch (error) {
                console.log("error")
                console.log("category error", error)
                console.log("category error", error.message)
                throw new Error(error.message || "Internal Server Error")
            }
        }

    },
    Mutation: {

        createTransaction: async (_, { input }, contextValue) => {
            try {

                console.log("this is context value", contextValue.getUser())
                const newTranscation = new Transaction({
                    ...input,
                    userId: contextValue?.getUser()?._id
                })
                await newTranscation.save()
                return newTranscation;

            } catch (error) {
                console.log("Error occur during creating transaciotn", error)
                throw new Error(error.message || "Internal Server Error")

            }
        },
        updateTransaction: async (_, { input }) => {
            try {

                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true })
                return updatedTransaction;

            } catch (error) {
                console.log("Error occur during updating transaciotn", error)
                throw new Error(error.message || "Internal Server Error")

            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTranscation = await Transaction.findByIdAndDelete(transactionId)
                return deletedTranscation;

            } catch (error) {
                console.log("Error occur during transaciotn", error)
                throw new Error(error.message || "Internal Server Error")

            }
        }
    }
}


export default transactionResolver;