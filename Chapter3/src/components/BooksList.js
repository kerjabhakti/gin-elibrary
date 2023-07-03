import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tanggalRilis, setTanggalRilis] = useState("");

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    BookService.getAll()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveBook = () => {
    const book = {
      Judul: judul,
      Penulis: penulis,
      Penerbit: penerbit,
      Tanggal_rilis: tanggalRilis,
    };

    BookService.create(book)
      .then((response) => {
        console.log(response.data);
        retrieveBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBook = () => {
    const updatedBook = {
      id: currentBook.ID,
      Judul: judul,
      Penulis: penulis,
      Penerbit: penerbit,
      Tanggal_rilis: tanggalRilis,
    };

    BookService.update(currentBook.ID, updatedBook)
      .then((response) => {
        console.log(response.data);
        retrieveBooks();
        setCurrentBook(null);
        setJudul("");
        setPenulis("");
        setPenerbit("");
        setTanggalRilis("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBook = (id) => {
    BookService.remove(id)
      .then((response) => {
        console.log(response.data);
        retrieveBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeAllBooks = () => {
    BookService.removeAll()
      .then((response) => {
        console.log(response.data);
        retrieveBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "judul") {
      setJudul(value);
    } else if (name === "penulis") {
      setPenulis(value);
    } else if (name === "penerbit") {
      setPenerbit(value);
    } else if (name === "tanggal_rilis") {
      setTanggalRilis(value);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Judul:</label>
            <input
              type="text"
              className="form-control"
              name="judul"
              value={judul}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Penulis:</label>
            <input
              type="text"
              className="form-control"
              name="penulis"
              value={penulis}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Penerbit:</label>
            <input
              type="text"
              className="form-control"
              name="penerbit"
              value={penerbit}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tanggal Rilis:</label>
            <input
              type="date"
              className="form-control"
              name="tanggal_rilis"
              value={tanggalRilis}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary me-2" onClick={saveBook}>
              Create
            </button>
          </div>
        </div>
      </div>

  <div className="row">
  <div className="col-md-12">
    <table className="table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Penerbit</th>
          <th>Tanggal Rilis</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.ID}>
            <td>{book.Judul}</td>
            <td>{book.Penulis}</td>
            <td>{book.Penerbit}</td>
            <td>{book.Tanggal_rilis}</td>
            <td>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => deleteBook(book.ID)}
              >
                Delete
              </button>
              &nbsp;&nbsp;
              <Link
                to={`/books/update/${book.ID}`}
                className="btn btn-primary btn-sm"
              >
                Update
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default BooksList;
