const BookBox = props => {
  const { title, author } = props;
  return (
    <div className="p-3 mb-1 border-4 border-green-400 rounded-sm">
      <h1 className="font-semibold text-4xl text-gray-900">
        {title}
      </h1>
      <p className="mt-3 text-lg">{author}</p>
      <div className="mt-4 flex">
        <img
          className="w-24"
          src="https://books.google.com/books/content?id=shycAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          alt="book"
        />
        <p className="ml-6">
          Really great book, you keep it.
        </p>
      </div>
    </div>
  );
};

export default BookBox;
