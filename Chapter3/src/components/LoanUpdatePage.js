import React, { useState, useEffect } from "react";
import LoanService from "../services/LoanService";

const LoanUpdatePage = (props) => {
  const [loan, setLoan] = useState(null);
  const [userID, setUserID] = useState("");
  const [bookID, setBookID] = useState("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [dikembalikan, setDikembalikan] = useState(false);

  useEffect(() => {
    retrieveLoan();
  }, []);

  const retrieveLoan = () => {
    const loanId = props.match.params.id;
    LoanService.get(loanId)
      .then((response) => {
        setLoan(response.data);
        setUserID(response.data.UserID);
        setBookID(response.data.BooksID);
        setTanggalPinjam(response.data.Tanggal_pinjam);
        setDikembalikan(response.data.Dikembalikan);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateLoan = () => {
    const updatedLoan = {
      id: loan.id,
      UserID: userID,
      BooksID: bookID,
      Tanggal_pinjam: tanggalPinjam,
      Dikembalikan: dikembalikan,
    };

    LoanService.update(loan.id, updatedLoan)
      .then((response) => {
        console.log(response.data);
        props.history.push("/loans");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "userID") {
      setUserID(value);
    } else if (name === "bookID") {
      setBookID(value);
    } else if (name === "tanggalPinjam") {
      setTanggalPinjam(value);
    } else if (name === "dikembalikan") {
      setDikembalikan(event.target.checked);
    }
  };

  return (
    <div className="container">
      <h1>Update Loan</h1>
      {loan ? (
        <div>
          <div className="mb-3">
            <label className="form-label">User ID:</label>
            <input
              type="text"
              className="form-control"
              name="userID"
              value={userID}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Book ID:</label>
            <input
              type="text"
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
          <div className="mb-3">
            <label className="form-check-label">Dikembalikan:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              className="form-check-input"
              name="dikembalikan"
              checked={dikembalikan}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <button className="btn btn-primary" onClick={updateLoan}>
              Update
            </button>
          </div>
        </div>
      ) : (
        <div>Loading loan details...</div>
      )}
    </div>
  );
};

export default LoanUpdatePage;
