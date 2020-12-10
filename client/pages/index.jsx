import CityButton from "@components/CityButton";
import ProfilePreview from "@components/ProfilePreview";
import { FiTwitter } from "react-icons/fi";

export default function IndexPage() {
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-4xl pb-32 mx-auto">
        <div className="relative bg-purple-700 h-36">
          <img
            className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
            src="/books.svg"
            alt="profile"
          />
        </div>
        <section className="ml-2">
          <h1 className="font-semibold text-4xl text-gray-900 underline mt-2 ">
            bookshelf.club
          </h1>
          <p className="mt-4">
            <span className="text-red-500 font-mono">bookshelf.club </span>{" "}
            connets you with friends in your city who want to share books with
            others and have fun !!
          </p>
          <p>
            You would be able to contact them throught their twitter profile.
          </p>
          <div className="mt-4">
            <button
              className="transition duration-200 ease-in border-2 hover:shadow-md transform hover:-translate-y-1 text-white active:bg-blue-600 font-semibold px-2 py-3 rounded outline-none focus:outline-none flex items-center"
              type="button"
              style={{ backgroundColor: "#1DA1F2" }}
            >
              <div className="">
                <FiTwitter className="" size="32" />
              </div>
              <span className="ml-2 ">Get in with Twitter</span>
            </button>
          </div>
        </section>
        <section className="ml-2 pt-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Some Books shelf's
          </h1>
          <div className="mt-2 flex flex-wrap">
            <CityButton city="All" selected />
            <CityButton city="Agra" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <ProfilePreview />
            <ProfilePreview />
            <ProfilePreview />
            <ProfilePreview />
            <ProfilePreview />
          </div>
        </section>
      </div>
    </div>
  );
}
