//@ts-nocheck
'use client'
import Card from "../components/card";
import { Suspense, useState, useEffect } from "react";
import { ResumesList } from "./data-fetch";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { collection, query, DocumentData, where, getDocs, getDoc, QuerySnapshot, doc, DocumentSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import Loading from "../components/loading";
import { getCurriculumById, getAllCurriculums, getCurriculumsByUser } from "./data-fetch";

type QueryTypes = QuerySnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>


export default function Resumes() {

  const { role, UID } = useProtectedRoute(['user', 'admin'], '/login')
  const [data, setData] = useState<any[]>()

  async function verify() {
    if (role === 'user') {
      if (data == undefined) {
        const resdata = await getCurriculumById(UID)
        setData(resdata)
        console.log(resdata)
      }
    }
    else if (role === 'admin') {
      if (data == undefined) {
        const resdata = await getAllCurriculums()
        setData(resdata)
      }
    }
  }

  useEffect(() => {
    if (data == undefined) verify()

  }, [role])


  return (
    <div className="w-full h-full flex flex-col gap-6 items-center p-24 pt-16">
      <p className="text-3xl font-semibold">Currículos</p>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          data &&
          data.map((resume, i) => {
            return <Card name={resume.pessoal.nome} born={resume.pessoal.nascimento} img={resume.picture} description={resume.descricao.objetivo} course={resume.educacional.curso} id={i} key={resume.id} />
          })
        }
      </section>
    </div>
  );
}