import React from "react"
export default function Curriculo() {
    return (

        <div className="flex justify-center items-center">
            <div className="w-[35rem] h-[45rem] border-black border-2  items-start flex flex-col mt-7 rounded-xl bg-white p-2">
                <input type="text" placeholder="Nome:" className="border-black border-2 rounded-md mt-3 " />
                <input type="date" className="border-black border-2 rounded-md mt-3 " />
                <input type="text" placeholder="Endereço: " className="border-black border-2 rounded-md mt-3 " />
                <input type="text" placeholder="Telefone:" className="border-black border-2 rounded-md mt-3 " />
                <input type="text" placeholder="Email:" className="border-black border-2 rounded-md mt-3  " />

                <h2 className="font-bold mt-6 ml-3">Formação academica</h2>

                <div className="justify-center flex items-center w-full ">
                <hr className="bg-slate-800 w-[33rem] h-[3px]"></hr>
                </div>

                <input type="text" placeholder="Graduação:" className="border-black border-2  mt-3 rounded-md" />
                <input type="text" placeholder="Local:" className="border-black border-2 mt-3 rounded-md" />
                <input type="date" placeholder="Data de Conclusão" className="border-black border-2 mt-3 rounded-md"/>
                
                <h2 className="font-bold mt-6 ml-3">Experiência Profissional </h2>
                <div className="justify-center flex items-center w-full ">
                <hr className="bg-slate-800 w-[33rem] h-[*3px]"></hr>
                </div>
            </div>

           
        </div>

    )
}