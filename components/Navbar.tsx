import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import COUNTRIES from "../constants/countries";
import useFirebaseAuth from "../firebase/hooks";

const Logo = () => {
  const { authUser } = useFirebaseAuth();
  const homeURL = authUser ? "/home" : "/";
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <Link href={homeURL}>
        <a>
          <span className="sr-only">Home</span>
          <img
            className="h-8 w-auto sm:h-16"
            src="/logos/white_logo_transparent_background.png"
            alt=""
          />
        </a>
      </Link>
    </div>
  );
};

const MenuButton = () => (
  <div className="-mr-2 -my-2 md:hidden">
    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Open menu</span>
      <MenuIcon className="h-6 w-6" aria-hidden="true" />
    </Popover.Button>
  </div>
);

const Dropdown = ({ title = "Send Money", dropdownOptions = [] }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              {
                "text-gray-900": open,
                "text-gray-500": !open,
              },
              "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span>{title}</span>
            <ChevronDownIcon
              className={clsx(
                {
                  "text-gray-600": open,
                  "text-gray-400": !open,
                },
                "ml-2 h-5 w-5 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 overflow-scroll max-h-[150px]">
                  {dropdownOptions.map((item) => (
                    <a
                      key={item.name}
                      href={"#"}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      {/* <item.icon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      /> */}
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const CallToAction = ({ callsToAction }) => (
  <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
    {callsToAction.map((item) => (
      <div key={item.name} className="flow-root">
        <a
          href={item.href}
          className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
        >
          <item.icon
            className="flex-shrink-0 h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
          <span className="ml-3">{item.name}</span>
        </a>
      </div>
    ))}
  </div>
);

const SubMenuOptions = () => (
  <Popover.Group as="nav" className="hidden md:flex space-x-10">
    <Dropdown title="Send Money" dropdownOptions={COUNTRIES} />
    <Dropdown title="Reload" dropdownOptions={COUNTRIES} />
    <Dropdown title="Pay Bills" dropdownOptions={COUNTRIES} />
  </Popover.Group>
);

const MobileMenu = () => {
  const { authUser, signOut } = useFirebaseAuth();
  const homeURL = authUser ? "/home" : "/";

  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Link href={homeURL}>
                  <img
                    className="h-10 w-auto"
                    src="/logos/white_logo_transparent_background.png"
                    alt="Workflow"
                  />
                </Link>
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8"></nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-6">
            <div>
              {authUser ? (
                <a
                  onClick={signOut}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Log out
                </a>
              ) : (
                <>
                  <Link href="/signup">
                    <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      Sign up
                    </a>
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link href="/signin">
                      <a className="text-indigo-600 hover:text-indigo-500">
                        Sign in
                      </a>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

const RightMenu = () => {
  const { authUser, signOut } = useFirebaseAuth();
  if (authUser) {
    return (
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <a
          onClick={signOut}
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Log out
        </a>
      </div>
    );
  }
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link href="/signin">
        <a className="whitespace-nowrap text-base font-medium text-white hover:text-gold">
          Sign in
        </a>
      </Link>
      <Link href="/signup">
        <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Sign up
        </a>
      </Link>
    </div>
  );
};

export default function Navbar() {
  const outterPadding = "max-w-7xl mx-auto px-4 sm:px-6";
  return (
    <Popover className="relative bg-white">
      <div className={`bg-gradient-to-r from-blue-medium to-blue-dark`}>
        <div
          className={`${outterPadding} flex justify-between items-center py-6 md:justify-start md:space-x-10`}
        >
          <Logo />
          <MenuButton />
          <RightMenu />
        </div>
      </div>
      {/* <div className={`${outterPadding}`}>
        <div className="flex justify-between items-center py-4 md:justify-center md:space-x-10">
          <SubMenuOptions />
        </div>
      </div> */}
      <MobileMenu />
    </Popover>
  );
}
