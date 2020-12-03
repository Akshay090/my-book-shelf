import Link from "next/link";
import { RiCameraLine } from "react-icons/ri";

const AddToShelf = () => {
  return (
    <section className="mx-2 mt-7 max-w-3xl">
      <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
        Add to shelf
      </h1>
      <div className="flex items-center flex-wrap mt-4">
        <input
          className="w-4/5 md:w-3/6 text-xl md:text-2xl no-outline mr-4 border-2 border-gray-300 bg-gray-50 p-2 text-gray-700 font-semibold"
          placeholder="Search book by title or ISBN"
          type="search"
        />
        <Link href="/capture">
          <button className="mt-2 md:mt-0 transition duration-200 ease-in bg-purple-500 text-purple-100 p-2 text-lg font-medium rounded-md hover:shadow-md hover:bg-purple-600 transform hover:-translate-y-1 ">
            <div className="flex items-center">
              <RiCameraLine size="22" />
              <span className="ml-2">Capture Bookshelf</span>
            </div>
          </button>
        </Link>
      </div>
      <div className="mt-4 px-6 py-4 text-2xl flex items-center justify-center border-4 border-purple-300 font-semibold text-gray-60">
        Search above or scan to add.
      </div>
    </section>
  );
};

export default AddToShelf;
