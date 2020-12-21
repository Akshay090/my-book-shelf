import BookBox from "@components/BookBox";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import FetchService from "@services/Fetch.service";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();
  const { username } = router.query;
  useEffect(async () => {
    try {
      const resp = await FetchService.getData(`/user?user=${username}`);
      setUserInfo(resp.data.users);
    } catch ({ error }) {
      console.log(error);
      if (error === "User Not Found.") {
        router.push("/");
      } else {
        router.push("/?logout=true");
      }
    }
  }, []);
  return (
    <div className="w-full h-screen bg-white">
      <div className="max-w-4xl pb-32 mx-auto">
        {userInfo && userInfo.twitter && (
          <div>
            <div className="relative bg-purple-700 h-36">
              <img
                className="w-1/5 sm:max-w-16 md:max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
                src={userInfo.twitter.profilePicture.replace("_normal", "")}
                alt="profile"
              />
            </div>
            <section className="ml-2 mt-8 w-4/5 max-w-5xl">
              <h1 className="font-semibold antialiased font-mono text-4xl text-gray-800 mt-2 ">
                Book Shelf by {userInfo.twitter.username}
              </h1>
              <p className="mt-8 text-gray-900 text-xl tracking-wide">
                {userInfo.description}
              </p>
              <p className="mt-4 text-2xl font-medium">
                DM {userInfo.twitter.username} for any of the books below.
              </p>

              <button
                className="mt-5 transition duration-200 ease-in border-2 hover:shadow-md transform hover:-translate-y-1 text-white active:bg-blue-600 font-semibold px-2 py-3 rounded-lg outline-none focus:outline-none flex items-center"
                type="button"
                style={{ backgroundColor: "#1DA1F2" }}
              >
                <div className="">
                  <FiTwitter className="" size="32" />
                </div>
                <span className="ml-2 ">DM {userInfo.twitter.username}</span>
              </button>
              <div className="mt-5">
                {userInfo.bookshelf.map(
                  ({ title, author, imageUrl, description }, idx) => {
                    return (
                      <BookBox
                      key={idx}
                        title={title}
                        author={author}
                        image={imageUrl}
                        description={description}
                      />
                    );
                  }
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
