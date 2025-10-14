/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React from "react";
import AuthSec from "@/components/new/AuthSec";
import NavBarInit from "@/components/new/NavBarInit";
// Importa tu cliente de Supabase y la función de obtener el usuario si es necesario


const Page: React.FC = () => {






  return (
    <>
      <NavBarInit />
      <main className='flex items-center justify-center w-full h-full pt-8'>
        <AuthSec />
      </main>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

export default Page;