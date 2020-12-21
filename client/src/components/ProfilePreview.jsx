import Link from "next/link";

const ProfilePreview = ({ user }) => (
  <Link href={`/u/${user.twitter.username}`}>
    <div className="border-4 rounded-md border-gray-700 p-2 cursor-pointer">
      <div className="relative bg-purple-700 h-16">
        <img
          className="w-1/5 max-w-36 border-2 absolute -bottom-1/4 right-6 border-gray-100 rounded-xl"
          src={user.twitter.profilePicture}
          alt="profile"
        />
      </div>
      <div className="mt-5">
        <p className="font-semibold leading-snug antialiased tracking-wide pb-4">
          {user.description}
        </p>
      </div>
      <div className="flex items-center">
        {user.bookshelf.slice(0, 4).map((book) => (
          <img
            className="w-10 h-16  shadow-md"
            src={book.imageUrl}
            alt="book"
          />
        ))}
        {user.bookshelf.length > 5 && (
          <dir className="ml-1 w-10 h-16 shadow-md relative bg-purple-500">
            <span className="absolute left-2 top-4 font-bold text-white">
              +{user.bookshelf.length - 4}
            </span>
          </dir>
        )}
      </div>
    </div>
  </Link>
);

export default ProfilePreview;
