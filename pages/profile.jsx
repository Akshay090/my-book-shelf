import dynamic from "next/dynamic";
import { GoGlobe } from "react-icons/go";
import Link from "next/link";
import AddToShelf from "@/modules/AddToShelf";
const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

const Profile = () => {
  return (
    <div className="w-full h-screen ">
      <div className="max-w-4xl pb-32 mx-auto bg-gray-100">
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
        <section className="mx-2 mt-8 max-w-3xl">
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
        <section className="mx-2 mt-7 max-w-3xl">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            About you
          </h1>
          <div className="border-2 border-gray-300 bg-gray-50 mt-4">
            <EditorComponent />
          </div>
          <div className="mt-4">
            <p>
              <span className="font-semibold text-gray-800">Optional: </span>a
              small description.(You may be featured on the homepage!)
            </p>
            <textarea
              className="w-full mt-4 border-2 border-gray-300 bg-gray-50border-gray-200 text-gray-900 px-2 py-2 no-outline"
              placeholder="what do you do, and what you're interested in. Max 140 chars."
              name="desc"
              id="desc"
              rows="2"
              maxLength="140"
            ></textarea>
          </div>
        </section>
        <section className="mx-2 mt-7 max-w-3xl">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            Location
          </h1>
          <div className="mt-4 ">
            <input
              className="mr-2 border-2 border-gray-300 bg-gray-50 p-2 text-gray-700 font-semibold"
              placeholder="Delhi"
              type="text"
            />
            <input
              className="mt-2 md:mt-0 border-2 border-gray-300 bg-gray-50 p-2 text-gray-700 font-semibold"
              placeholder="India"
              type="text"
            />
          </div>
        </section>
        <AddToShelf />
      </div>
    </div>
  );
};

export default Profile;
