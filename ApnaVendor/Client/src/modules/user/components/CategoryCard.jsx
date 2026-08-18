import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-200 transition"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 text-2xl">
        {category.icon}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-gray-800">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;