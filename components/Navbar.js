import { useEffect, useState } from 'react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import cartStore from '@/utils/Store';
import Cookies from 'js-cookie';

function Navbar() {
  const { status, data: session } = useSession();

  // Dropdown status
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // CartItems
  const cart = cartStore((state) => state.cart);
  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.length);
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-600 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            href={'/cart'}
            className=" justify-center  rounded-md bg-white px-3 py-2 hover:bg-gray-50 "
          >
            Cart{' '}
            {cartItemsCount > 0 && (
              <span className="ml-1 rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {session.user.name}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="" role="none">
                    <a href="#" className="navbar-dropdown-link">
                      Account settings
                    </a>
                    <a href="#" className="navbar-dropdown-link">
                      Support
                    </a>
                    <a href="#" className="navbar-dropdown-link">
                      License
                    </a>
                    <a
                      href="#"
                      className="navbar-dropdown-link"
                      onClick={logoutClickHandler}
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href={'/login'} className="mr-5 hover:text-gray-900">
              Log In
            </Link>
          )}

          {/* {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href={'/login'} className="mr-5 hover:text-gray-900">
                  Log In
                </Link>
              )} */}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
