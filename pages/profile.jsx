import { GoGlobe } from "react-icons/go";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="w-full h-screen mb-60 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-purple-700  h-36">
          <Link href="/explore">
            <button className="absolute outline-none focus:outline-none bottom-2 left-2 px-2 py-2 rounded-md flex items-center font-medium text-xs text-white tracking-wider bg-purple-500 border-2 border-purple-400">
              <GoGlobe size="18" /> <span className="ml-2">Explore</span>
            </button>
          </Link>
          <img
            className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
            src="https://www.fillmurray.com/400/400"
            alt="profile"
          />
        </div>
        <section className="ml-2 mt-8">
          <h1 className="font-semibold antialiased font-mono text-4xl text-gray-800 mt-2 ">
            Book Shelf by @aks2899
          </h1>
          Link to your profile:{" "}
          <a
            className="text-blue-600 underline"
            href="bookshelf.club/u/aks2899"
          >
            bookshelf.club/u/aks2899
          </a>
        </section>
        <section className="ml-2 mt-7">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            About you
          </h1>
        </section>
        <section className="ml-2 mt-7">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            Address
          </h1>
        </section>
        <section className="ml-2 mt-7">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            Add to shelf
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Profile;
