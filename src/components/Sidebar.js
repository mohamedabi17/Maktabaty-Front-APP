import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css'

function Sidebar() {
    return (<>
        {/* <ul className="sidebar mt-3">
            <li className="list-unstyled">
                <Link to="/products">All Products</Link>
            </li>
            <li>
                <Link to="/categories">Table of Categiries</Link>
            </li>
            <li>
                <Link to="">Main Page</Link>
            </li>
        </ul> */}
        <aside className="sidebar">
            <nav className="nav">
                <ul>
                    <li className="active"><Link className="a" to="/">Return Home</Link></li>
                    <li><Link className="a" to="/products">View All Products</Link></li>
                    <li><Link className="a" to="/about">What We Do</Link></li>
                    <li><Link className="a" to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </aside>
    </>
    )
}

export default Sidebar;