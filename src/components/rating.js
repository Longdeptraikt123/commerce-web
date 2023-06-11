import { BsFillStarFill, BsStarHalf } from 'react-icons/bs';

const Rating = ({ numReviews, rating }) => {
    return (
        <div className="">
            <span>
                {rating > 1 ?
                    <BsFillStarFill /> :
                    rating >= 0.5 ?
                        <BsStarHalf /> :
                        <BsFillStarFill />
                }
            </span>
            <span>
                {rating > 2 ?
                    <BsFillStarFill /> :
                    rating >= 1.5 ?
                        <BsStarHalf /> :
                        <BsFillStarFill />
                }
            </span>
            <span>
                {rating > 3 ?
                    <BsFillStarFill /> :
                    rating >= 2.5 ?
                        <BsStarHalf /> :
                        <BsFillStarFill />
                }
            </span>
            <span>
                {rating > 4 ?
                    <BsFillStarFill /> :
                    <>
                    </>

                }
            </span>
            <span>
                {rating > 5 ?
                    <BsFillStarFill /> :
                    rating >= 4.5 ?
                        <BsStarHalf /> :
                        <BsFillStarFill />
                }
            </span>
            <span className='f:18px color:#0079FF m:0|0.6rem'>{numReviews} reviews</span>
        </div>
    )
}
export default Rating