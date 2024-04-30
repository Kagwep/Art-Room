import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogOut } from 'react-feather';
import '@fontsource/space-mono/700.css';
import juaLogo from '@/assets/jua-logo.svg';
import { HOME, PROTECTED_DATA, SEND_EMAIL,SERVICES } from '@/config/path.ts';
import { useUser } from '@/components/NavBar/useUser.ts';
import AddressChip from '@/components/NavBar/AddressChip.tsx';
import { Button } from '@/components/ui/button.tsx';

export default function NavBar() {
  const location = useLocation();
  const { isConnected, address,  login, logout } = useUser();

  const myProtectedDataLeft = 'left-[13px]';
  const myProtectedDataWidth = 'w-[104px]';
  const sendEmailLeft = 'left-[170px]';
  const sendEmailWidth = 'w-[63px]';
  const [tabIndicatorLeft, setTabIndicatorLeft] = useState('');
  const [tabIndicatorWidth, setTabIndicatorWidth] = useState('');



  return (
    <header className="dark flex h-[64px] items-center bg-green-600 px-8 text-white">
      <NavLink to={`/${HOME}`} className="-mx-2 flex h-full items-center p-2">
        <img src={juaLogo} width="25" height="30" alt="jua logo" />

        <div
          className="ml-3 font-bold leading-5"
          style={{ fontFamily: 'Space Mono' }}
        >
          Crypto Jua
        </div>
      </NavLink>

      <div className="relative ml-20 flex h-full items-center gap-x-8 pr-3">
       <NavLink
          to={`/${SERVICES}`}
          className="-mx-2 flex h-full items-center p-2 hover:bg-green-700"
        >
          Services
        </NavLink>
        <NavLink
          to={`/${PROTECTED_DATA}`}
          className="-mx-2 flex h-full items-center p-2 hover:bg-green-700"
        >
          My Protected Data
        </NavLink>
        <NavLink
          to={`/${SEND_EMAIL}`}
          className="-mx-2 flex h-full items-center p-2 hover:bg-green-700"
        >
          Send Email
        </NavLink>
        <div
          className={`absolute bottom-0 h-1 rounded-md bg-white transition-all duration-300 ${tabIndicatorLeft} ${tabIndicatorWidth}`}
        ></div>
      </div>

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
            className="w-[98px]"
            onClick={() => {
              login();
            }}
          >
            Login
          </Button>
        </div>
      )}
    </header>
  );
}
