const NewBookBox = () => (
  <div className="p-3 mb-1 border-4 border-green-400 rounded-sm">
    <h1 className="font-semibold text-4xl text-gray-900">
      Hackers and Painters
    </h1>
    <p className="mt-3 text-lg">Paul Graham</p>
    <div className="mt-4 flex">
      <img
        className="w-24"
        src="https://books.google.com/books/content?id=shycAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        alt="book"
      />
      <textarea
        className="w-full mt-4 ml-6 border-2 border-gray-300 bg-gray-50border-gray-200 text-gray-900 px-2 py-2 no-outline"
        placeholder="Some comments about this book. Max 280 chars"
        name="desc"
        id="desc"
        rows="2"
        maxLength="280"
      />
    </div>
  </div>
);

export default NewBookBox;
