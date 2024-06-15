import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";

const Cards = () => {


	const { data, error , loading } = useQuery(GET_TRANSACTION)

	console.log("card data", data)
	if(loading) return <p>loading....</p>
	if(error) return <p>{error.message}</p>
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
			{
				!loading && data?.transactions.map(item=><Card  transaction = {item}/>) 
			}
			{
				!loading && data?.transactions.length===0   && (
					<p>No transaction History found</p>
				)
			}
			</div>
		</div>
	);
};
export default Cards;