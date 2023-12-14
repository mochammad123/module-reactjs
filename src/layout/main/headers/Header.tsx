import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <nav className="z-10 main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <div className="row">
                <div className="col-md">
                  <div
                    className="d-flex justify-content-end border-none bg-sky-50 hover:bg-sky-100 rounded-full -mt-1"
                    style={{
                      paddingRight: 5,
                      paddingLeft: 5,
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <AccountCircleIcon
                      className="text-sky-800 mr-1"
                      style={{ fontSize: "30px" }}
                    />
                    <p
                      className="text-sky-800 pr-3"
                      style={{
                        marginTop: "3px",
                        fontWeight: 400,
                        fontSize: "15px",
                      }}
                    >
                      Role Name
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                You Logged as <b>Role Name</b>
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" />
                Email
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fa fa-phone mr-2"></i>
                Phone Number
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fa fa-key mr-2"></i> Change Password
              </a>
              <div className="dropdown-divider" />
              <span
                className="dropdown-item dropdown-header cursor-pointer active:bg-sky-800"
                onClick={() => console.log("clicked")}
              >
                <b>Logout</b>
              </span>
            </div>
          </li>
        </ul>
    </nav>
  )
}

export default Header