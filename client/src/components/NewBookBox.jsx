import FetchService from "@services/Fetch.service";
import { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { toast } from "react-toastify";

const NewBookBox = ({ data, clearSearchData }) => {
  const [description, setDescription] = useState("");
  const handleAddBook = async () => {
    try {
      const resp = await FetchService.postFormDataAuthed("/user/book/add", {
        books: [
          {
            ...data,
            description,
          },
        ],
      });
      console.log(resp);
      clearSearchData();
      toast.success("Data Saved");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };
  return (
    <div className="p-3 mb-1 border-4 border-green-400 rounded-sm">
      <h1 className="font-semibiold text-4xl text-gray-900">{data.title}</h1>
      <p className="mt-3 text-lg">{data.author}</p>
      <div className="mt-4 flex">
        <img className="w-24" src={data.imageUrl} alt="book" />
        <div>
          <textarea
            className="w-full mt-2 ml-6 border-2 border-gray-300 bg-gray-50border-gray-200 text-gray-900 px-2 py-2 no-outline"
            placeholder="Some comments about this book. Max 280 chars"
            name="desc"
            id="desc"
            rows="2"
            maxLength="280"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="mt-2 ml-6 transition duration-200 ease-in bg-purple-500 text-purple-100 p-2 text-lg font-medium rounded-md
        hover:shadow-md hover:bg-purple-600 transform hover:-translate-y-1 "
            onClick={handleAddBook}
          >
            <div className="flex items-center">
              <GiBookshelf size="22" />
              <span className="ml-2">Add Book</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBookBox;
