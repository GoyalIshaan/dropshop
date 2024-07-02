type PriceProps = {
  tag: string;
  price: string;
};

const Price: React.FC<PriceProps> = ({ tag, price }) => {
  return (
    <div className="mb-2 flex justify-between items-center">
      <div>{tag}</div>
      <div className="font-bold text-lg">${price}</div>
    </div>
  );
};

export default Price;
