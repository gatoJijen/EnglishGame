/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React from "react";
import AuthSec from "@/components/new/AuthSec";
import NavBarInit from "@/components/new/NavBarInit";


const Page: React.FC = () => {

  return (
    <>
      <NavBarInit />
      <main className='flex items-center justify-center w-dvw overflow-x-hidden h-full pt-8 nMainAuth'>
        <AuthSec />
      </main>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

export default Page;