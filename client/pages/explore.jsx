import Link from 'next/link';
import CityButton from '@components/CityButton';
import ProfilePreview from '@components/ProfilePreview';
import { RiProfileLine } from 'react-icons/ri';
import Header from '@components/Header';
import HeaderBtn from '@components/HeaderBtn';
import { IoIosLogOut } from 'react-icons/io';

const Exolore = () => (
  <div className="w-full h-screen">
    <div className="max-w-4xl pb-32 mx-auto bg-gray-100">
      {/* <div className="relative bg-purple-700 h-36">
          <Link href="/profile">
            <button className="absolute outline-none focus:outline-none bottom-2 left-2 px-2 py-2 rounded-md flex items-center font-medium text-xs text-white tracking-wider bg-purple-500 border-2 border-purple-400">
              <RiProfileLine size="18" />{" "}
              <span className="ml-2">My Profile</span>
            </button>
          </Link>
          <img
            className="w-1/5 sm:max-w-16 md:max-w-36 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
            src="/earth.svg"
            alt="profile"
          />
        </div> */}
      <Header bgColor="bg-purple-700" img="/earth.svg">
        <HeaderBtn Icon={IoIosLogOut} linkTo="/?logout=true" text="Logout" />
        <HeaderBtn Icon={RiProfileLine} linkTo="/user/dashboard" text="My Profile" />
      </Header>
      <section className="ml-2 mt-10 px-2">
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
    <section className="ml-2 mt-10 px-2">
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
);
export default Exolore;
