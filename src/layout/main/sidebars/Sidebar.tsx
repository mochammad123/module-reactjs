import { useEffect, useState } from "react";
import Logo from "../../../assets/img/web_logo.png";
import { NavLink } from "react-router-dom";
import useMenuApi from "../../../apis/menu/menuApi";
import { Skeleton } from "@mui/material";

const Sidebar = () => {
  const { menus, getMenus, setStateMenuData } = useMenuApi();
  const [dropdownStates, setDropdownStates] = useState(
    menus?.data?.role?.menus ? menus?.data?.role?.menus?.map(() => false) : []
  );

  const toggleDropdown = (index: number, e: any) => {
    e.preventDefault();
    setDropdownStates((prevState: any) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  useEffect(() => {
    getMenus();
  }, []);

  useEffect(() => {
    setStateMenuData({
      employee: menus?.data?.employee,
      isAccounting: menus?.data?.isAccounting,
      isAdmin: menus?.data?.isAdmin,
    });
  }, [menus]);

  let activeStyle = {
    background: "rgba(0, 0, 0, 0.2)",
    color: "#FFFFFF",
  };

  let activeMainStyle = {
    backgroundColor: "#EEEEEE",
    color: "#000000",
  };

  let inactiveStyle = {
    color: "#FFFFFF",
  };

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 bg-slider lg:z-10"
      style={{ backgroundColor: "#0B2447", color: "white" }}
    >
      {/* Brand Logo */}
      <a href="#0" className="brand-link">
        <div className="flex justify-center">
          <img src={Logo} alt="" width={170} />
        </div>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column text-blue-400"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {!menus || menus == 0 ? (
              <>
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
              </>
            ) : menus.data.role.menus &&
              menus.data.role.menus.data &&
              menus.data.role.menus.length === 0 ? (
              <>
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
                <Skeleton
                  variant="rounded"
                  className="w-full mb-2"
                  height={30}
                  sx={{ bgcolor: "#4F709C" }}
                />
              </>
            ) : (
              <div>
                {menus.data.role.menus.map((item: any, index: number) => {
                  const isOpen = dropdownStates[index];

                  return (
                    <li className="nav-item has-treeview text-xs" key={index}>
                      {item.parent === "null" ? (
                        <>
                          <NavLink
                            to={`/${item.description}`}
                            style={({ isActive }) =>
                              isActive ? activeMainStyle : inactiveStyle
                            }
                            className="nav-link hover:bg-sky-900"
                            onClick={(event) => {
                              event.preventDefault();
                              toggleDropdown(index, event);
                            }}
                          >
                            <i className="nav-icon fas fa-tachometer-alt mr-2"></i>
                            <p>
                              {item.name}
                              <i
                                className={`right fas ${
                                  isOpen ? "fa-angle-down" : "fa-angle-left"
                                } transition-transform duration-300`}
                              ></i>
                            </p>
                          </NavLink>
                          <ul
                            className={`nav ${
                              isOpen ? "transform translate-y-0" : "hidden"
                            } transition-transform duration-300`}
                          >
                            <div className="rounded-lg">
                              {menus.data.role.menus
                                .sort(
                                  (a: any, b: any) =>
                                    parseInt(a.sort) - parseInt(b.sort)
                                )
                                .map((childItem: any, childIndex: number) =>
                                  childItem.parent === item.code ? (
                                    <li
                                      className="nav-item hover:bg-sky-900 hover:rounded-md"
                                      key={childIndex}
                                    >
                                      <NavLink
                                        to={`/${childItem.description}/${childItem.urlMenu}`}
                                        style={({ isActive }) =>
                                          isActive ? activeStyle : inactiveStyle
                                        }
                                        className="nav-link"
                                      >
                                        <i className="far fa-circle nav-icon ml-2 mr-2"></i>
                                        <p>{childItem.name}</p>
                                      </NavLink>
                                    </li>
                                  ) : null
                                )}
                            </div>
                          </ul>
                        </>
                      ) : null}
                    </li>
                  );
                })}
              </div>
            )}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Sidebar;
