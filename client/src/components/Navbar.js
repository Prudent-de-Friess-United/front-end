import React from 'react';
// import Link from "@material-ui/core/Link";
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/sign-up">Sign-Up</Link>

        </nav>
    )
}

export default Navbar;
