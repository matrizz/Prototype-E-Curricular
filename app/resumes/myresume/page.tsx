'use client'
import React, { useEffect, useState } from "react";
import { getCurriculumById } from "../data-fetch";



export default function Page2() {

  const [data, setData] = useState()

  useEffect(() => {
    async function ft() {
      //@ts-ignore
      const dt = await getCurriculumById()
      setData(dt)
      console.log(dt)
    }
    ft()
  }, [])
  const gerarPDF = () => {
   print()
  };  

  return (
    <div>
      <button onClick={gerarPDF}>Gerar Currículo PDF</button>
    </div>
  );
}