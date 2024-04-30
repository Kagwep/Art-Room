import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag,BsHeartFill } from "react-icons/bs";
import { useUser } from '@/components/NavBar/useUser.ts';
import AddressChip from '@/components/NavBar/AddressChip.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LogOut } from 'react-feather'

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { isConnected, address,  login, logout } = useUser();


  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[150px]">
            <img src={Logo} alt="" />
          </div>
        </Link>

        {/* cart */}
        <div>
          <ul className="flex border-b">
              <li className="-mb-px mr-1">
                <Link to={"/galleries"}>
                  <a className="bg-white inline-block   py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Galleries</a>
                </Link>
              </li>
              <li className="mr-1">
                <Link to={"my-galleries"}>
                   <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">My Gallery</a>
                </Link>
              </li>
            </ul>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
                {isConnected  ? (
                    <div className="flex flex-1 items-center justify-end gap-x-1">
                      <AddressChip  address={address!} />
                      <button
                        type="button"
                        className="-mr-2 bg-amber-500 p-2"
                        onClick={() => logout()}
                      >
                        <LogOut size="20" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-end">
                      {/* w-[98px] = Match what's in react ui kit */}
                      <Button
                        size="sm"
                        className="w-[98px]  font-size-l bg-green-500 font-weight-bold"
                        onClick={() => {
                          login();
                        }}
                      >
                        Login
                      </Button>
                    </div>
                  )}
        </div>
      </div>
    </header>
  );
};

export default Header;
