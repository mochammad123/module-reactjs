import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useMenuApi from "../../../apis/menu/menuApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { menus } = useMenuApi();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="z-10 main-header navbar navbar-expand navbar-white navbar-light p-1">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars text-sm" />
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <div className="row">
              <div className="col-md">
                <div
                  className="d-flex justify-content-end items-center border-none bg-sky-50 hover:bg-sky-100 rounded-full -mt-1"
                  style={{
                    paddingRight: 5,
                    paddingLeft: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  <AccountCircleIcon
                    className="text-sky-800 mr-1"
                    style={{ fontSize: "25px" }}
                  />
                  <p
                    className="text-sky-800 pr-3"
                    style={{
                      marginTop: "3px",
                      fontWeight: 400,
                      fontSize: "13px",
                    }}
                  >
                    {menus?.data?.employee?.name}
                  </p>
                </div>
              </div>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header text-xs active:bg-sky-800">
              You Logged as <b>{menus?.data?.employee?.name}</b>
            </span>
            <div className="dropdown-divider" />
            <span
              className="dropdown-item dropdown-header cursor-pointer text-xs active:bg-sky-800"
              onClick={logout}
            >
              <b>Logout</b>
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
