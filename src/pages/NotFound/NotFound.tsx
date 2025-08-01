import { Link } from "react-router-dom";
import notFoundImg from "../../assets/404.jpg"; // або "../../assets/not-found.jpg"

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img src={notFoundImg} alt="Not Found" className="w-full max-w-md mb-8" />
      <Link
        to="/"
        className="px-6 py-3 bg-stone-200 text-black font-semibold rounded-xl shadow-lg hover:bg-gray-300 hover:text-white transition"
      >
        Головна сторінка
      </Link>
    </div>
  );
};

export default NotFound;
