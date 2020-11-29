import BookContainer from "@/components/bookContainer";
import { useRouter } from "next/router";
import { FiTwitter } from "react-icons/fi";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div className="w-full h-screen pb-32 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-purple-700 h-36">
          <img
            className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
            src="https://www.fillmurray.com/400/400"
            alt="profile"
          />
        </div>
        <section className="ml-2 mt-8 w-4/5 max-w-5xl">
          <h1 className="font-semibold antialiased font-mono text-4xl text-gray-800 mt-2 ">
            Book Shelf by {username}
          </h1>
          <p className="mt-8 text-gray-900 text-xl tracking-wide">
            Hi, I am Jack, currently a computer science under grad student, I
            like to try out new things, build projects and learn some cool
            stuff. I grew up reading books regarding, Mahabharata, Greek
            Mythology - Percy Jackson & the Olympians series in particular and
            all the books from Ashwin Sanghi. Theres a lot more than that, the
            books from Rashmi Bansal, Sudha Murty all this sure takes me back.
            So, I would really appreciate it if you can gift one for me.
          </p>
          <p className="mt-4 text-2xl font-medium">
            DM {username} for any of the books below.
          </p>

          <button
            class="mt-2 transition duration-200 ease-in border-2 hover:shadow-md transform hover:-translate-y-1 text-white active:bg-blue-600 font-semibold px-2 py-3 rounded-lg outline-none focus:outline-none flex items-center"
            type="button"
            style={{ backgroundColor: "#1DA1F2" }}
          >
            <div className="">
              <FiTwitter className="" size="32" />
            </div>
            <span className="ml-2 ">DM {username}</span>
          </button>
          <div className="mt-5">
            <BookContainer />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPage;
