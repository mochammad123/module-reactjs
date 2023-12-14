import React, { useState } from 'react'
import Logo from "../../../assets/img/web_logo.png"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside
    className="main-sidebar elevation-4 lg:z-10"
    style={{ backgroundColor: "#0B2447", color: "white" }}
  >
    {/* Brand Logo */}
    <a href="/" className="brand-link">
      {/* <img
        src={Logo}
        alt="AdminLTE Logo"
        className="brand-image img-circle elevation-3"
      /> */}
      <span className="brand-text font-weight-light">HCMI</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul
          className="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          {/* Add icons to the links using the .nav-icon class
     with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview menu-open">
            <a href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="./index.html" className="nav-link active">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Dashboard v1</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="./index2.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Dashboard v2</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="./index3.html" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Dashboard v3</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
  )
}

export default Sidebar