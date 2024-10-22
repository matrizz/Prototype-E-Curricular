//@ts-nocheck
'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCurriculumById } from "../../data-fetch"
import Section from "@/app/components/accordion"
import Loading from "@/app/components/loading"
import useProtectedRoute from "@/app/hooks/useProtectedRoute"

export default function Page() {

  const { loading, canAccess } = useProtectedRoute(['admin', 'user'], '/not-authorized')
  const [data, setData] = useState()
  const router = useRouter()
  const [data_params, setData_params] = useState()
  const { id } = useParams()
  
  
  function transformDataParams(dt) {
    const idiomas = dt.educacional.idiomas.idiomas
    const nivel = dt.educacional.idiomas.nivel
    console.log(data)
    const dataParams = new URLSearchParams({ ...dt.pessoal, ...dt.profissional, idiomas, nivel, ...dt.descricao }).toString()
    if (data_params == undefined) setData_params(dataParams)
    console.log(dataParams)
    return dataParams
  }
  useEffect(() => {
    async function ft() {
      //@ts-ignore
      const dt = await getCurriculumById(id)
      setData(dt)
    }
    ft()
  }, [])
  const generatePdf = () => {
    print()
  };

  if (loading || !canAccess) {
    return <Loading />
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">

      <iframe src={`/pdf-template/${id}`} className="border rounded" width="65%" height="90%" ></iframe>
    </div>
    // <div className="p-6 md:px-32 lg:px-64 flex flex-col gap-5" >

    //   <div id="pdf-content">
    //     <div className="flex gap-14">
    //       <div>
    //         <img src={data?.picture} className="w-40 rounded-md" alt="foto do curriculo" />
    //       </div>
    //       <div className="w-full flex flex-col md:flex-row justify-between">

    //         <div className="flex flex-col">
    //           <p className="text-xl font-semibold">{data?.pessoal.nome}</p>
    //           <p className="text-sm md:text-base font-normal">{data?.educacional.curso}</p>
    //           <p className="text-sm md:text-base font-normal">{data?.pessoal.nascimento}</p>
    //         </div>
    //         <span className="flex gap-2 md:flex-col">
    //           <p className="text-sm md:text-base font-semibold">{data?.educacional.instituto}</p>
    //           <p className="text-sm md:text-base text-end">{data?.educacional.data_inicio_curso} - {data?.educacional.data_fim_curso}</p>
    //         </span>
    //       </div>
    //     </div>
    //     <Section legend="contato">
    //       <div className="flex flex-col md:flex-row gap-4 px-2">

    //         <span className="flex items-center gap-2">
    //           <img src="/call-svgrepo-com.svg" className="size-4 hidden md:visible lg:visible xl:visible" alt="" />
    //           <p className="font-semibold flex">celular: <span className="font-normal">&nbsp;({data?.pessoal.celular[0]}{data?.pessoal.celular[1]}){' '}{data?.pessoal.celular.slice(2)}</span></p>
    //         </span>
    //         {data?.pessoal.celular2 &&
    //           <>
    //             <img src="/call-svgrepo-com.svg" className="size-4 hidden md:visible" alt="" />
    //             <p className="font-semibold">celular 2: <span className="font-normal"> ({data?.pessoal.celular[0]}{data?.pessoal.celular[1]}){' '}{data?.pessoal.celular.slice(2)}</span></p>
    //           </>
    //         }
    //         <span className="flex items-center gap-2">
    //           <img src="/email-svgrepo-com.svg" className="size-4 hidden md:visible" alt="" />
    //           <p className="font-semibold">email: <span className="font-normal">{data?.pessoal.email}</span></p>
    //         </span>
    //       </div>


    //     </Section>
    //     <Section legend="habilidades">
    //       <div className="p-4">
    //         <p>
    //           {`${data?.descricao.habilidades}`}
    //         </p>
    //       </div>
    //     </Section >
    //     <Section legend="objetivos">
    //       <div className="p-4">
    //         <p>{data?.descricao.objetivo}</p>
    //       </div>
    //     </Section>

    //     <div>
    //     </div>

    //   </div>

    //   <footer className="flex mb-8 gap-2 w-full">
    //     <button onClick={() => router.push(`${data.id}/editable?${transformDataParams(data)}`)} className="bg-emerald-400 font-bold rounded-md py-1 px-8 text-white" type="button">Editar</button>
    //     <button onClick={generatePdf} className="bg-emerald-400 font-bold rounded-md py-1 px-8 text-white" type="button">Download</button>
    //   </footer>
    // </div>
  )
}