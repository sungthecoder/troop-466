import { Link, Form, useRouteLoaderData } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogoIcon } from "./google-logo";
import { type User } from "~/lib/auth.type";
import { getMenu } from "~/lib/get-menu";

interface NavBarProps {
  menu: Array<{
    label: string;
    to: string;
  }>;
}

export const NavBar = () => {
  const rootData =
    useRouteLoaderData<{
      user?: User;
      menu?: ReturnType<typeof getMenu>;
    }>("root") || {};
  const { user, menu = [] } = rootData;

  return (
    <nav className="absolute top-0 w-full bg-slate-100 bg-opacity-30">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 pr-2"
            >
              {user ? (
                <>
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={user.photo}
                        alt={user.displayName}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faChevronDown} size="sm" />
                </>
              ) : (
                <FontAwesomeIcon icon={faBars} size="lg" />
              )}
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
              <div className="divider" />
              {user ? (
                <li>
                  <Form id="logout" action="/auth/logout" method="post" />
                  <button form="logout" className="btn btn-white text-black">
                    Log out
                  </button>
                </li>
              ) : (
                <li>
                  <Form id="login" action="/auth/google" method="post" />
                  <button
                    form="login"
                    className="btn btn-white text-black justify-normal"
                  >
                    <GoogleLogoIcon />
                    Log in with Google
                  </button>
                </li>
              )}
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
};
