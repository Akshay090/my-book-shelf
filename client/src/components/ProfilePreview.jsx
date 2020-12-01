const ProfilePreview = () => {
  return (
    <div className="border-4 rounded-md border-gray-700 p-2">
      <div className="relative bg-purple-700 h-16">
        <img
          className="w-1/5 max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
          src="https://www.fillmurray.com/400/400"
          alt="profile"
        />
      </div>
      <div className="mt-5">
        <p className="font-semibold leading-snug antialiased tracking-wide h-32">
          Jack is currently figuring out what he does, but is super excited
          about getting into the investment market and understand good
          businesses
        </p>
      </div>
      <div className="flex items-center">
        <img
          className=" w-10 h-16  shadow-md"
          src="http://books.google.com/books/content?id=pWgGSg1Gt2YC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          alt="book"
        />
        <img
          className="ml-1 w-10 h-16 shadow-md"
          src="http://books.google.com/books/content?id=iO5pApw2JycC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          alt="book"
        />
        <img
          className="ml-1 w-10 h-16 shadow-md"
          src="http://books.google.com/books/content?id=sZ97DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          alt="book"
        />
        <img
          className="ml-1 w-10 h-16 shadow-md "
          src="http://books.google.com/books/content?id=abYKXvCwEToC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          alt="book"
        />
        <img
          className="ml-1 w-10 h-16 shadow-md "
          src="http://books.google.com/books/content?id=abYKXvCwEToC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
          alt="book"
        />
        <dir className="ml-1 w-10 h-16 shadow-md relative bg-purple-500">
          <span className="absolute left-2 top-4 font-bold text-white">+5</span>
        </dir>
      </div>
    </div>
  );
};

export default ProfilePreview;
