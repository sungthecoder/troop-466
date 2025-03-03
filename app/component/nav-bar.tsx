import { Link } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  menu: Array<{
    label: string;
    to: string;
  }>;
}

export const NavBar = ({ menu }: NavBarProps) => (
  <nav className="absolute top-0 w-full bg-slate-100 bg-opacity-30">
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menu.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <Link
          className="btn btn-ghost text-xl visited:text-slate-50 font-serif"
          to="/"
        >
          Troop 466
        </Link>
      </div>
    </div>
  </nav>
);
