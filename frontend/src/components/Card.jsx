import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";
import { formatDate } from "../utilis/formatDate";
import {  GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const categoryColorMap = {
	Saving: "from-green-700 to-green-400",
	Expense: "from-pink-800 to-pink-600",
	Investment: "from-blue-700 to-blue-400",
};


const Card = ({ transaction  }) => {
	let  { amount, category , date , description , location , paymentType, userId, _id} = transaction ; 
	 description = description[0].toUpperCase() + description.slice(1)
	 date = formatDate(date)

	const cardClass = categoryColorMap[category];

	let [ deleteTransaction, {loading }] = useMutation(DELETE_TRANSACTION,{
		refetchQueries:[GET_TRANSACTIONS]
	})


	const deleteCard =async (id)=>{
		try {
			console.log("id", id)
			await deleteTransaction({
				variables:{
					transactionId:id
				}
			})
			toast.success("successfully delete the card ")
		} catch (error) {
			toast.error(error.message)
			
		}

	}

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash  onClick={()=>{
							deleteCard(transaction._id)
						}}  className={"cursor-pointer"} />
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					Amount: ${amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-black font-bold'>{date}</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;