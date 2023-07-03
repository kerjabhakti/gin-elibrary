import React, { useState, useEffect } from "react";
import LoanService from "../services/LoanService";
import { Link } from "react-router-dom";

const LoansList = () => {
  const [loans, setLoans] = useState([]);
  const [currentLoan, setCurrentLoan] = useState(null);
  const [userID, setUserID] = useState("");
  const [bookID, setBookID] = useState("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [dikembalikan, setDikembalikan] = useState(false);

  useEffect(() => {
    retrieveLoans();
  }, []);

  const retrieveLoans = () => {
    LoanService.getAll()
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveLoan = () => {
    const loan = {
      UserID: userID,
      BooksID: bookID,
      Tanggal_pinjam: tanggalPinjam,
      Dikembalikan: dikembalikan
    };

    LoanService.create(loan)
      .then((response) => {
        console.log(response.data);
        retrieveLoans();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLoan = (id) => {
    LoanService.remove(id)
      .then((response) => {
        console.log(response.data);
        retrieveLoans();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeAllLoans = () => {
    LoanService.removeAll()
      .then((response) => {
        console.log(response.data);
        retrieveLoans();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "userID") {
      setUserID(parseInt(value));
    } else if (name === "bookID") {
      setBookID(parseInt(value));
    } else if (name === "tanggalPinjam") {
      setTanggalPinjam(value);
    } else if (name === "dikembalikan") {
      setDikembalikan(event.target.checked);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">User ID:</label>
            <input
              type="number"
              className="form-control"
              name="userID"
              value={userID}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Book ID:</label>
            <input
              type="number"
              className="form-control"
              name="bookID"
              value={bookID}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tanggal Pinjam:</label>
            <input
              type="date"
              className="form-control"
              name="tanggalPinjam"
              value={tanggalPinjam}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="dikembalikan"
              checked={dikembalikan}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Dikembalikan</label>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary me-2" onClick={saveLoan}>
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
                <th>User ID</th>
                <th>Book ID</th>
                <th>Tanggal Pinjam</th>
                <th>Dikembalikan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.ID}>
                  <td>{loan.UserID}</td>
                  <td>{loan.BooksID}</td>
                  <td>{loan.Tanggal_pinjam}</td>
                  <td>{loan.Dikembalikan ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deleteLoan(loan.ID)}
                    >
                      Delete
                    </button>
                    &nbsp;&nbsp;
                    <Link
                      to={`/loans/update/${loan.ID}`}
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

export default LoansList;
