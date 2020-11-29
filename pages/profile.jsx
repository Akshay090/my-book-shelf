import dynamic from "next/dynamic";
import { GoGlobe } from "react-icons/go";
import Link from "next/link";
const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

const Profile = () => {
  return (
    <div className="w-full h-screen pb-32 bg-gray-100">
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
          <div className="border-2 mt-4">
            <EditorComponent />
          </div>
          <div className="mt-4">
            <p>
              <span className="font-semibold text-gray-800">Optional: </span>a
              small description.(You may be featured on the homepage!)
            </p>
            <textarea
              className="w-full mt-4 border border-gray-200 text-gray-900 px-2 py-2 no-outline"
              placeholder="what do you do, and what you're interested in. Max 140 chars."
              name="desc"
              id="desc"
              rows="2"
              maxLength="140"
            ></textarea>
          </div>
        </section>
        <section className="ml-2 mt-7">
          <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
            Location
          </h1>
          <div className="mt-4 ">
            <input
              className="p-2 border border-gray-200"
              placeholder="Delhi"
              type="text"
            />
            <input
              className="p-2 ml-2 border border-gray-200"
              placeholder="India"
              type="text"
            />
          </div>
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
