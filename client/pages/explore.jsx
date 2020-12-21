import Link from "next/link";
import CityButton from "@components/CityButton";
import ProfilePreview from "@components/ProfilePreview";
import { RiProfileLine } from "react-icons/ri";
import Header from "@components/Header";
import HeaderBtn from "@components/HeaderBtn";
import { IoIosLogOut } from "react-icons/io";
import FetchService from "@services/Fetch.service";
import { useEffect, useState } from "react";

const Exolore = () => {
  const [userList, setUserList] = useState([]);
  useEffect(async () => {
    try {
      const resp = await FetchService.getData(`/user/list`);
      setUserList(resp.data.users);
    } catch ({ error }) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="max-w-4xl pb-32 mx-auto bg-gray-100">
        <Header bgColor="bg-purple-700" img="/earth.svg">
          {/* <HeaderBtn Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
          <HeaderBtn
            Icon={RiProfileLine}
            linkTo="/user/dashboard"
            text="My Profile"
          /> */}
        </Header>
        <section className="ml-2 mt-10 px-2">
          <h1 className="text-3xl font-semibold text-gray-800">
            Some Books shelf's
          </h1>
          {/* <div className="mt-2 flex flex-wrap">
          <CityButton city="All" selected />
          <CityButton city="Agra" />
        </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {userList.map((user,idx) => (
              <ProfilePreview user={user} key={idx}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Exolore;
