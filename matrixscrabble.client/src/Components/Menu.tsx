import { NavLink } from "react-router-dom"

const Menu = () => {
        return (
            <nav className="navbar">
                <div className="container-navbar">
                    <div className="logo">
                       Logo
                    </div>
                   
                    <div className={`nav-elements  ${ 'active'}`}>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

export default Menu