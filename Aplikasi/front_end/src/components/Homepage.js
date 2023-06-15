import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    
    <div className="container-fluid bg-light" id="home">
      <br></br>
      <h1>Welcome to the Library Management System</h1>
      <p>Ini adalah aplikasi manajemen perpustakaan simple yang dibuat menggunakan .</p>
      <p>Choose an option below:</p>
      <tr>
        <td>
            <Link to="/loans" className="btn btn-primary">
              Loans
            </Link>
          </td>
          &nbsp;&nbsp;
          <td>
            <Link to="/books" className="btn btn-primary">
              Books
            </Link>
          </td>
      </tr>

    </div>



  );
};

export default HomePage;
