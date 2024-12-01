import React from 'react';
import Image from 'next/image';
function Navbar() {
  return (
    <>
      <nav className="h-[64px] min-w-full bg-transparent flex justify-between px-5">
        <div className="flex justify-start items-center gap-x-[28px] my-auto h-full  ">
          <Image
            src="/logomark.svg"
            width={'28'}
            height={'28'}
            alt="logo"
            onClick={() => (window.location.href = '/')}
          />
        </div>
        <div className="flex justify-center items-center gap-x-[28px] my-auto h-full ">
          <Image src="/search.svg" width={'24'} height={'24'} alt="/" />
          <Image src="/app-grid.svg" width={'24'} height={'24'} alt="/" />
          <Image src="/user.svg" width={'24'} height={'24'} alt="/" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
