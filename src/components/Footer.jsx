import { Link, useLocation } from "react-router-dom";
import { links } from "../utils";

export default function Footer() {
  const location = useLocation();
  const isBank = location.pathname === "/bank";

  return (
    <footer
      className={`${
        isBank && "ml-64"
      }bg-white dark:bg-gray-800 rounded-lg border-t dark:border-gray-400/20 mx-4`}
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link className="font-semibold hover:underline" to="/">
            Homefinder
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-emerald-900 dark:text-gray-400 sm:mt-0">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="mr-4 hover:underline md:mr-6 ">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
