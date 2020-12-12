import NewBookBox from '@components/NewBookBox';
import { useEffect, useState } from 'react';
import { RiQrScan2Line } from 'react-icons/ri';
import axios from 'axios';
import ScanImage from '../components/scanImage';
import Spinner from '../components/Loader';
import BookBox from '../components/BookBox';

// const { default: BookBox } = require('@components/BookBox');

const AddToShelf = () => {
  const [openDrawer, setDrawer] = useState(false);
  const [titles, setTitles] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [usersBooks, setUsersBooks] = useState([]);

  const handleScan = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
    // setLoader(true);
  };

  const handleResponse = response => {
    if (Array.isArray(response)) { setTitles(response); }
  };

  AddToShelf.getInitialProps = async () => {
    // const resp = await fetch(SOME_URL);
    const listOfBooks = [];

    titles && titles.map(async item => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${item}"`);
      const books = response.data.items;
      const found = books && books.find(book => book.volumeInfo.title.toLowerCase() === item.toLowerCase());
      if (found) {
        listOfBooks.push(found);
      }
    });
    setUsersBooks(listOfBooks);
  };

  const getBookDetails = async () => {
    // google api
    const listOfBooks = [];
    try {
      titles && titles.map(async item => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${item}"`);
        const books = response.data.items;
        // Search for the books from api response
        const found = books && books.find(book => book.volumeInfo.title.toLowerCase() === item.toLowerCase());
        if (found) {
          listOfBooks.push(found);
        }
      });

      if (listOfBooks) {
        console.log('herer---');
        setUsersBooks(listOfBooks);
      }
      console.log('listOfBooks--', listOfBooks);
      console.log('usersBooks--', usersBooks);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getBookDetails();
  // }, [titles]);

  const getBooks = () => {
    usersBooks && usersBooks.map(book => {
      debugger;
      return (
        <BookBox
          title={book.volumeInfo.title}
          author={book.volumeInfo.authors[0]}
        />
      );
    });
  };

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
        <button className="mt-2 md:mt-0 transition duration-200 ease-in bg-purple-500 text-purple-100 p-2 text-lg font-medium rounded-md hover:shadow-md hover:bg-purple-600 transform hover:-translate-y-1 ">
          <div className="flex items-center" onClick={handleScan}>
            <RiQrScan2Line className="" size="22" />
            <span className="ml-2">Scan to add</span>
          </div>
        </button>
      </div>
      <div className="mt-4 px-6 py-4 text-2xl flex items-center justify-center border-4 border-purple-300 font-semibold text-gray-60">
        Search above or scan to add.
      </div>

      <div className="mt-4">
        {/* <NewBookBox /> */}
        {usersBooks && usersBooks.map(book => {
          debugger;
          return (
            <BookBox
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors[0]}
            />
          );
        })}
      </div>

      {openDrawer ? (
        <div style={{
          position: 'fixed',
          width: '80%',
          height: '50%',
          backgroundColor: '#01c5c4',
          zIndex: 300,
          top: '20vh',
          borderRadius: '15px',
          boxShadow: '0 0 10px #000000',
          left: '50%',
          transform: 'translate(-50%, 0)'
        }}
        >
          <div onClick={() => setDrawer(false)} style={{ width: '30px', margin: '10px' }}>
            <img src="./cross.png" alt="camera" />
          </div>

          <ScanImage response={handleResponse} drawerVisibility={closeDrawer} />
        </div>
      ) : null}
    </section>
  );
};

// visibility: openCamera ? 'hidden' : 'visible',
export default AddToShelf;
