import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookService from "../services/BookService";

const UpdateBook = () => {
  const { id } = useParams();
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tanggalRilis, setTanggalRilis] = useState("");

  useEffect(() => {
    retrieveBook();
  }, []);

  const retrieveBook = () => {
    BookService.get(id)
      .then((response) => {
        const { Judul, Penulis, Penerbit, Tanggal_rilis } = response.data;
        setJudul(Judul);
        setPenulis(Penulis);
        setPenerbit(Penerbit);
        setTanggalRilis(Tanggal_rilis);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBook = () => {
    const updatedBook = {
      id: id,
      Judul: judul,
      Penulis: penulis,
      Penerbit: penerbit,
      Tanggal_rilis: tanggalRilis,
    };

    BookService.update(id, updatedBook)
      .then((response) => {
        console.log(response.data);
        // Redirect to the book list page after successful update
        window.location.href = "/books";
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
      <h1>Update Book</h1>
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
          type="text"
          className="form-control"
          name="tanggal_rilis"
          value={tanggalRilis}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={updateBook}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
