import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GoGlobe } from "react-icons/go";
import { convertToRaw } from "draft-js";
import AddToShelf from "@modules/AddToShelf";
import CameraModal from "@modules/CameraModal";
import BookBox from "@components/BookBox";
import NewBookBox from "@components/NewBookBox";
import Header from "@components/Header";
import Loading from "@components/Loading";
import HeaderBtn from "@components/HeaderBtn";
import { EditorState } from "draft-js";
import { useRouter } from "next/router";
import TokenService from "@services/Token.service";
import QueryString from "query-string";
import { IoIosLogOut } from "react-icons/io";
import { GiHypersonicBolt } from "react-icons/gi";
import FetchService from "@services/Fetch.service";
import cx from "classnames";
import { toast } from "react-toastify";

const EditorComponent = dynamic(() => import("@components/EditorComponent"), {
  ssr: false,
});

const initialAboutDetails = {
  description: "",
  city: "",
  country: "",
};

const initInputErr = {
  city: null,
  country: null,
};

const Profile = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const tokenService = new TokenService();
  const [aboutDetails, setAboutDetails] = useState(initialAboutDetails);
  const [inputErr, setInputErr] = useState(initInputErr);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const { token } = QueryString.parse(location.search);
    console.log("query", token, location.search);
    if (token) {
      tokenService.saveData(token);
      const baseURL = location.href.split("?")[0];
      router.push(baseURL, undefined, { shallow: true });
      setUserInfo(tokenService.userInfo);
    }
    if (tokenService.userInfo) {
      setUserInfo(tokenService.userInfo);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    console.log(editorState, "editorState");
  }, [editorState]);

  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    setInputErr(initInputErr);
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setAboutDetails({
      ...aboutDetails,
      [name]: value,
    });
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const checkValidInput = () => {
    let err = {};
    if (!aboutDetails.city) err.city = "City is required";
    if (!aboutDetails.country) err.country = "Country is required";
    setInputErr(err);
    return isEmpty(err);
  };

  const handleSetProfile = async () => {
    if (!checkValidInput()) {
      return;
    }
    const rawEditorData = convertToRaw(editorState.getCurrentContent());
    console.log(rawEditorData, "raw");
    const profileData = JSON.stringify(rawEditorData);
    const submitData = {
      ...aboutDetails,
      profile: profileData,
    };

    try {
      const resp = await FetchService.postFormDataAuthed(
        "/user/profile/set",
        submitData
      );
      console.log(resp);
      toast.success("Data Saved");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      <CameraModal showModal={showModal} toggleModal={toggleModal} />
      <div className="w-full h-screen">
        <div className="max-w-4xl pb-32 mx-auto bg-gray-100">
          {userInfo ? (
            <div>
              <Header
                bgColor="bg-purple-700"
                img={`https://unavatar.now.sh/twitter/${userInfo.username}`}
              >
                <HeaderBtn
                  Icon={IoIosLogOut}
                  linkTo="/?logout=true"
                  text="Logout"
                />
                <HeaderBtn Icon={GoGlobe} linkTo="/explore" text="Explore" />
              </Header>
              <section className="mx-2 mt-8 max-w-3xl">
                <h1 className="font-semibold antialiased font-mono text-4xl text-gray-800 mt-2 ">
                  Book Shelf by {userInfo.username}
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
                  <EditorComponent
                    setEditorState={setEditorState}
                    editorState={editorState}
                  />
                </div>
                <div className="mt-4">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Optional:{" "}
                    </span>
                    a small description.(You may be featured on the homepage!)
                  </p>
                  <textarea
                    className="w-full mt-4 border-2 border-gray-300 bg-gray-50border-gray-200 text-gray-900 px-2 py-2 no-outline"
                    placeholder="what do you do, and what you're interested in. Max 140 chars."
                    name="description"
                    value={aboutDetails.description}
                    onChange={handleChange}
                    id="desc"
                    rows="2"
                    maxLength="140"
                  ></textarea>
                </div>
              </section>
              <section className="mx-2 mt-4 max-w-3xl">
                <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
                  Location
                </h1>
                <div className="mt-4 ">
                  <input
                    className={cx({
                      "mr-2  bg-gray-50 p-2 text-gray-700 font-semibold": true,
                      "border-4 border-rose-400": inputErr.city,
                      "border-2 border-gray-300": !inputErr.city,
                    })}
                    placeholder="City"
                    type="text"
                    name="city"
                    value={aboutDetails.city}
                    onChange={handleChange}
                  />
                  <input
                    className={cx({
                      "mr-2  bg-gray-50 p-2 text-gray-700 font-semibold": true,
                      "border-4 border-rose-400": inputErr.country,
                      "border-2 border-gray-300": !inputErr.country,
                    })}
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={aboutDetails.country}
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={handleSetProfile}
                  className="mt-4 transition duration-200 ease-in bg-purple-500 text-purple-100 p-2 text-lg font-medium rounded-md hover:shadow-md hover:bg-purple-600 transform hover:-translate-y-1"
                >
                  <div className="flex items-center">
                    <GiHypersonicBolt size="22" />
                    <span className="ml-2">Save Profile</span>
                  </div>
                </button>
              </section>
              <AddToShelf toggleModal={toggleModal} />
              {/* <div className="mt-4">
                <NewBookBox />
                <BookBox />
              </div> */}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
