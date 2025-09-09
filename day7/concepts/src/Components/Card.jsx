
const Card = ({ user: { name, age } }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md w-60 text-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">Age: {age}</p>
    </div>
  );
};



export default Card;
