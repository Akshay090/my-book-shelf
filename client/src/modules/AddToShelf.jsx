// import NewBookBox from '@components/NewBookBox';
import { useEffect, useState } from 'react';
import { RiQrScan2Line } from 'react-icons/ri';
import axios from 'axios';
import Spinner from '../components/Loader';
import BookBox from '../components/BookBox';

const AddToShelf = ({ toggleModal, titlesData }) => {
  const [showLoader, setLoader] = useState(false);
  const [usersBooks, setUsersBooks] = useState([]);
  const [listOfBooks, setListOfBooks] = useState([]);

  const getBookDetails = titles => {
    try {
      setLoader(true);
      const promises = titles.map(item => (axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${item}"`)));
      Promise.all(promises).then(data => {
        setUsersBooks(data);
      });
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getBookList = titles => {
    const detectedBooks = [];

    for (let i = 0; i < usersBooks.length; i++) {
      for (let j = 0; j < titles.length; j++) {
        for (let k = 0; k < 10; k++) {
          if (usersBooks[i].data.items[k].volumeInfo.title.toLowerCase() == titles[j].toLowerCase()) {
            detectedBooks.push(usersBooks[i].data.items[k]);
          }
        }
      }
    }
    return detectedBooks;
  };

  useEffect(() => {
    getBookDetails(titlesData);
  }, [titlesData]);

  useEffect(() => {
    const uniqueItems = [...new Set(getBookList(titlesData))];
    setListOfBooks(uniqueItems);
    console.log('uniqueItems--', uniqueItems);
  }, [usersBooks]);

  return (
    <section className="mx-2 mt-7 max-w-3xl">
      { showLoader && <Spinner />}
      <h1 className="font-semibold antialiased font-mono text-3xl underline text-gray-800 mt-2 ">
        Add to shelf
      </h1>
      <div className="flex items-center flex-wrap mt-4">
        <input
          className="w-4/5 md:w-3/6 text-xl md:text-2xl no-outline mr-4 border-2 border-gray-300 bg-gray-50 p-2 text-gray-700 font-semibold"
          placeholder="Search book by title or ISBN"
          type="search"
        />
        <button
          className="mt-2 md:mt-0 transition duration-200 ease-in bg-purple-500 text-purple-100 p-2 text-lg font-medium rounded-md
        hover:shadow-md hover:bg-purple-600 transform hover:-translate-y-1 "
          onClick={() => toggleModal()}
        >
          <div className="flex items-center">
            <RiQrScan2Line className="" size="22" />
            <span className="ml-2">Capture Bookshelf</span>
          </div>
        </button>
      </div>
      <div className="mt-4 px-6 py-4 text-2xl flex items-center justify-center border-4 border-purple-300 font-semibold text-gray-60">
        Search above or scan to add.
      </div>

      <div className="mt-4">
        {listOfBooks ? listOfBooks.map(book => (
          <BookBox
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            image={book.volumeInfo.imageLinks.smallThumbnail}

          />
        )) : null}
      </div>
    </section>
  );
};

export default AddToShelf;
