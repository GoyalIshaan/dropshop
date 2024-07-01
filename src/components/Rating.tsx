import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ rating }: { rating: number }) => {
  const totalStars: JSX.Element[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      totalStars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      totalStars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      totalStars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  return totalStars;
};

export default Rating;
