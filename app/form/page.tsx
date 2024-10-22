'use client'
import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction, useEffect, useRef } from "react"
import { ChangeEvent, useState } from "react"
import Section from "../components/accordion"
import { useForm } from "react-hook-form"
import { DataValidation, DataFormatter } from "../validation"
import { SaveCurriculumData, SaveImageData } from "./save-data"
import { auth } from "@/firebase/firebase"
import useProtectedRoute from "../hooks/useProtectedRoute"
import { useRouter } from "next/navigation"
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs"


export default function Curriculo() {

    const router = useRouter()
    const [imageSrc, setImageSrc] = useState('https://img.freepik.com/vetores-premium/icones-e-notificacoes-planas-do-instagram_619991-50.jpg')
    const [image, setImage] = useState()
    const [data, setData] = useQueryStates({
        nome: parseAsString.withDefault(''),
        nascimento: parseAsString.withDefault(''),
        genero: parseAsString.withDefault(''),
        cep: parseAsString.withDefault(''),
        cidade: parseAsString.withDefault(''),
        uf: parseAsString.withDefault(''),
        pais: parseAsString.withDefault(''),
        celular: parseAsString.withDefault(''),
        celular2: parseAsString.withDefault(''),
        email: parseAsString.withDefault(''),
        empresa: parseAsString.withDefault(''),
        cargo: parseAsString.withDefault(''),
        fim_servico: parseAsString.withDefault(''),
        inicio_servico: parseAsString.withDefault(''),
        instituto: parseAsString.withDefault(''),
        curso: parseAsString.withDefault(''),
        inicio: parseAsString.withDefault(''),
        fim: parseAsString.withDefault(''),
        idiomas: parseAsString.withDefault(''),
        nivel: parseAsString.withDefault(''),
        habilidades: parseAsString.withDefault(''),
        objetivo: parseAsString.withDefault('')
    })
    const [idiomas, setIdiomas] = useState(data.idiomas[0] === ',' ? data.idiomas.slice(1, data.idiomas.length) : data.idiomas)
    const { UID } = useProtectedRoute(['admin', 'user'], '/login')
    const habilidadesRef = useRef(null)
    const objetivoRef = useRef(null)

    useEffect(() => {
        console.log(// Array.from(data.idiomas).filter((i) => i !== data.idiomas[0])
            data.idiomas[0] === ',' ? data.idiomas.slice(1, data.idiomas.length) : data.idiomas)
        setData({ idiomas: Array.isArray(idiomas) && idiomas[0].length > 0 ? idiomas.join(',') : idiomas })
    }, [idiomas])

    const { register, handleSubmit } = useForm()
    function handleIdiomasSet(lang: string) {
        //@ts-ignore
        setIdiomas(() => {
            let arr = [''];
            if (Array.isArray(idiomas)) {

                if (idiomas.includes(lang)) return arr = idiomas.filter((idioma) => idioma !== lang)
                else arr = [...idiomas, lang]
                setData({ idiomas: arr.join(',') })
            }
            return arr
        })
    }

    async function handleFormData(data: any) {
        const validacao = DataFormatter(data)

        //@ts-ignore
        if (!validacao.success) {
        //@ts-ignore
            alert(JSON.stringify(validacao.error))
        //@ts-ignore
            console.log(validacao.error)
            console.log('validou com erro')
        }

        const imgUrl = await SaveImageData(image, UID)
        //@ts-ignore
        validacao.data.picture = imgUrl
        //@ts-ignore
        const newDataObj = validacao.data
        const resume = await SaveCurriculumData(newDataObj, UID)

        //@ts-ignore
        router.push(`/resumes/myresume/${resume.id}`)

    }

    const handleKeyDown = (event, ref) => {
        // Verifica se a tecla pressionada é a Tab
        const textarea = ref.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (event.key === 'Tab') {
            event.preventDefault(); // Impede o comportamento padrão (mudar foco)

            // Insere uma tabulação (quatro espaços ou um caractere de tabulação "\t")
            textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

            // Atualiza a posição do cursor
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }

        // Verifica se a tecla pressionada é o Enter
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão de quebra de linha

            // Insere uma nova linha
            textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);

            // Atualiza a posição do cursor para a nova linha
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]

        if (file) {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                // @ts-ignore
                img.src = e.target.result
            };

            img.onload = () => {
                const width = img.width;
                const height = img.height;

                // Verifica se a imagem é 3:4 ou menor que 500x500
                if ((width === 0 || height === 0) ||
                    ((width / height !== 3 / 4) && (width > 1200 || height > 1200))) {
                    alert('A imagem deve ser menor que 500x500 pixels.')
                    setImageSrc('');
                } else {
                    setImageSrc(img.src);
                    //@ts-ignore
                    setImage(e.target.files[0])
                }
            };


            reader.readAsDataURL(file);
        }

    };

    return (

        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(handleFormData)} className="w-[35rem] flex flex-col mt-7 p-2">

                <div className="py-8">
                    <div className="flex flex-col justify-center w-full items-center gap-3 mt-8">
                        <label htmlFor="profile_pic" className="w-48 h-48 border-2 bg-contain rounded overflow-hidden cursor-pointer"><img className="" src={imageSrc} /></label>
                        <input className="hidden w-72 h-72 border-2" type="file" onChange={handleImageChange} accept="image/*" name="picture" placeholder="Nome:" id="profile_pic" />
                    </div>
                </div>
                <Section legend="Dados Pessoais">
                    <input className="border-black px-2 border-2 capitalize rounded-md mt-3" {...register('nome')} value={data.nome}
                        onChange={(e) => setData({
                            nome: e.target.value
                        })} autoFocus placeholder="Nome*" />

                    <input
                        {...register('nascimento')}
                        onChange={(e) => {
                            setData({ nascimento: e.target.value })
                        }}
                        value={(data.nascimento)}
                        className="border-black px-2 border-2 rounded-md mt-3"
                        placeholder="Data de Nascimento*"

                    />
                    <div className="my-2 flex flex-col gap-2">
                        <div className="items-center flex">
                            <input className="border-black px-2 border-2 rounded-md mt-1 mr-2" value='masculino' id="masculino" {...register('genero')} checked={data.genero == 'masculino' ? true : false}
                                onChange={(e) => setData({
                                    genero: e.target.value
                                })
                                } type="radio" />
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div>
                            <input className="border-black px-2 border-2 rounded-md mt-1 mr-2" value='feminino' id="feminino" {...register('genero')} checked={data.genero == 'feminino' ? true : false}
                                onChange={(e) => setData({
                                    genero: e.target.value
                                })} type="radio" />
                            <label htmlFor="feminino">Feminino</label>
                        </div>
                    </div>
                </Section>

                <Section subsection legend="Endereço">
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <input className="border-black px-2 border-2 rounded-md mt-3" {...register('cidade')} value={data.cidade} onChange={(e) => {
                            setData({
                                cidade: e.target.value
                            })
                        }} type="text" placeholder="Cidade*" />

                        <input

                            className="border-black px-2 border-2 rounded-md mt-3"
                            placeholder="Cep*"
                            {...register('cep')}
                            value={data.cep}
                            onChange={(e) => {
                                setData({
                                    cep: e.target.value
                                })
                            }}
                            id="cep"
                        />
                        <input className="border-black px-2 border-2 rounded-md mt-3 w-12 uppercase" {...register('uf')} value={data.uf || 'sp'} type="text" placeholder="UF*" maxLength={2} />
                        <div className="flex w-full gap-4">
                            <input className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="País*" {...register('pais')} value={data.pais || 'Brasil'} readOnly />
                        </div>
                    </div>

                </Section>


                <Section subsection legend="Contato" >
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <input

                            className="border-black px-2 border-2 rounded-md mt-3"
                            type="tel"
                            placeholder="Celular*"
                            {...register('celular')}
                            value={data.celular}
                            onChange={(e) => {
                                setData({
                                    celular: e.target.value
                                })
                            }}
                            id="celular"
                        /><input

                            className="border-black px-2 border-2 rounded-md mt-3"
                            type="tel"
                            placeholder="Celular 2 (opcional)"
                            {...register('celular2')}
                            value={data.celular2}
                            onChange={(e) => {
                                setData({
                                    celular2: e.target.value
                                })
                            }}
                            id="celular2"
                        />
                        <input type="email" className="border-black px-2 border-2 rounded-md mt-3 flex-1" {...register('email')} value={data.email} onChange={(e) => {
                            setData({
                                email: e.target.value
                            })
                        }} placeholder="Email*" />
                    </div>
                </Section>

                <Section expandable legend="Formação acadêmica">
                    <input className="border-black px-2 border-2 rounded-md mt-3" type="text" {...register('instituto')} value={data.instituto || 'Etec de Itanhaém'} onChange={(e) => {
                        setData({
                            instituto: e.target.value
                        })
                    }} placeholder="Nome da instituição:" readOnly />
                    <select className="border-black border-2 rounded p-1 mt-3 " {...register('curso')} value={data.curso} onChange={(e) => {
                        setData({
                            curso: e.target.value
                        })
                    }}>
                        <option>Selecione um curso</option>
                        <option value="MIN - Técnico em Informática para Internet">MIN - Técnico em Informática para Internet</option>
                        <option value="MAM - Técnico em Meio Ambiente">MAM - Técnico em Meio Ambiente</option>
                        <option value="MAD - Técnico em Administração">MAD - Técnico em Administração</option>
                    </select>
                    <div className="flex gap-4 mt-3">
                        <label htmlFor="inicio" className="flex gap-2 items-center justify-center">
                            De
                            <input maxLength={4} className="border-black px-2 border-2 max-w-16 rounded-md" {...register('inicio')} value={data.inicio} onChange={(e) => {
                                setData({
                                    inicio: e.target.value
                                })
                            }} type="number" placeholder="ano" />
                        </label>
                        <label htmlFor="fim" className="flex gap-2 items-center justify-center">
                            até
                            <input maxLength={4} className="border-black px-2 border-2 max-w-16 rounded-md" {...register('fim')} value={data.fim} onChange={(e) => {
                                setData({
                                    fim: e.target.value
                                })
                            }} type="number" placeholder="ano" />
                        </label>
                    </div>
                </Section>
                <Section expandable legend="Idiomas">
                    <div className="flex gap-4 pl-2 pb-2">
                        <div className="flex flex-col">
                            <label htmlFor="en" className="flex gap-2">
                                <input type="checkbox" id="en" {...register('ingles')} checked={data.idiomas.includes('Inglês')}
                                    onChange={() => handleIdiomasSet('Inglês')} value="Inglês" />
                                Inglês
                            </label>
                            <label htmlFor="es" className="flex gap-2">
                                <input type="checkbox" id="es" {...register('espanhol')} checked={data.idiomas.includes('Espanhol')}
                                    onChange={() => handleIdiomasSet('Espanhol')} value="Espanhol" />
                                Espanhol
                            </label>
                        </div>
                        <div className="flex flex-col">

                            <label htmlFor="fr" className="flex gap-2">
                                <input type="checkbox" id="fr" {...register('fances')} checked={data.idiomas.includes('Francês')}
                                    onChange={() => handleIdiomasSet('Francês')} value="Francês" />
                                Francês
                            </label>
                            <label htmlFor="de" className="flex gap-2">
                                <input type="checkbox" id="de" {...register('alemao')} checked={data.idiomas.includes('Alemão')}
                                    onChange={() => handleIdiomasSet('Alemão')} value="Alemão" />
                                Alemão
                            </label>
                        </div>
                    </div>
                    <select className="border-black border-2 rounded p-1" {...register('nivel')} value={data.nivel} onChange={(e) => {
                        setData({
                            nivel: e.target.value
                        })
                    }}>
                        <option value="basico">Básico</option>
                        <option value="intermediario">Intermediario</option>
                        <option value="tecnico">Técnico</option>
                        <option value="fluente">Fluente</option>
                    </select>
                </Section>

                <Section expandable legend="Habilidades">
                    <textarea onKeyDown={(e) => handleKeyDown(e, habilidadesRef)} className="w-full mt-3 border-black border-2 rounded p-2 min-h-20" placeholder={`• Técnicas\n• Interpessoais (comunicação, trabalho em equipe, etc.)`} autoComplete="no" {...register('habilidades')} onChange={(e) => {
                        setData({
                            habilidades: e.target.value
                        })
                    }} ref={habilidadesRef} value={data.habilidades}>

                    </textarea>
                </Section>

                <Section expandable legend="Objetivo">


                    <div className="w-full mt-3 pb-4">
                        <textarea onKeyDown={(e) => handleKeyDown(e, objetivoRef)} className="w-full mt-3 border-black border-2 rounded p-2 min-h-20" placeholder="Uma breve descrição de seus objetivos de carreira e o que você busca na posição desejada." autoComplete="no" onChange={(e) => {
                            setData({
                                objetivo: e.target.value
                            })
                        }} ref={objetivoRef} value={data.objetivo}>

                        </textarea>
                    </div>
                </Section>
                <footer className="flex mb-8 gap-2 w-full">
                    <button className="bg-emerald-400 font-bold rounded-md py-1 px-8 text-white" about="teet" type="submit">Salvar</button>
                    <button onClick={e => confirm('Deseja limpar todos os campos?') ? null : e.preventDefault()} className="bg-red-400 font-bold rounded-md py-1 px-8 text-white" type="reset">Limpar</button>
                </footer>
            </form>
        </div>

    )
}