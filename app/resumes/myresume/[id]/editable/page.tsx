'use client'
import React, { useEffect } from "react"
import { ChangeEvent, useState } from "react"
import Section from "@/app/components/accordion"
import { useForm } from "react-hook-form"
import { DataValidation, DataFormatter, CreateDataSchema } from "@/app/validation"
import { UpdateCurriculumData, UpdateImageData } from "@/app/form/save-data"
import useProtectedRoute from "@/app/hooks/useProtectedRoute"
import { useParams, useRouter } from "next/navigation"
import { getCurriculumById } from "@/app/resumes/data-fetch"
import { parseAsIsoDateTime, parseAsString, useQueryStates } from "nuqs"


export default function Curriculo() {

    const router = useRouter()
    const [imageSrc, setImageSrc] = useState('https://img.freepik.com/vetores-premium/icones-e-notificacoes-planas-do-instagram_619991-50.jpg')
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
    const [picture, setPicture] = useState()
    const [image, setImage] = useState()
    const { role, UID } = useProtectedRoute(['admin', 'user'], '/login')
    const param = useParams()

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        async function ft() {
            //@ts-ignore
            const dt = await getCurriculumById(param.id)
            //@ts-ignore
            if (data == undefined) setData(dt)
        }
        if (data == undefined) ft()
    }, [data])

    //@ts-ignore
    async function handleFormData(dt) {

        console.log(dt)
        const validacao = DataValidation(DataFormatter(dt))

        if (!validacao.success) {
            alert(JSON.stringify(validacao.error))
            console.log('validou com erro')
        }

        function extractImagePathFromUrl(imageUrl) {
            // Extrai a parte do caminho da URL (depois de 'o/')
            const regex = /\/o\/(.*?)\?/;
            const match = imageUrl.match(regex);

            if (match && match[1]) {
                // Decodifica a URL para remover os caracteres codificados, como '%2F' para '/'
                return decodeURIComponent(match[1]);
            }

            console.error('Caminho da imagem não encontrado na URL.');
            return null;
        }

        const existingImagePath = extractImagePathFromUrl(picture)
        const imgUrl = await UpdateImageData(image, existingImagePath)
        //@ts-ignore
        validacao.data.picture = imgUrl
        const newDataObj = validacao.data
        const resume = await UpdateCurriculumData(newDataObj, UID, param.id)

        router.push(`/myresume/${resume.id}`)

    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]

        if (file) {
            const img = new Image()
            const reader = new FileReader()

            reader.onload = (e) => {
                // @ts-ignore
                img.src = e.target.result
            }

            img.onload = () => {
                const width = img.width
                const height = img.height

                // Verifica se a imagem é 3:4 ou menor que 500x500
                if ((width === 0 || height === 0) ||
                    ((width / height !== 3 / 4) && (width > 1200 || height > 1200))) {
                    alert('A imagem deve ser menor que 500x500 pixels.')
                    setImageSrc('')
                } else {
                    setImageSrc(img.src)
                    //@ts-ignore
                    setImage(e.target.files[0])
                }
            }

            reader.readAsDataURL(file);
        }

    };

    const [dataImport] = useState({
        "nome": 'Luiz henrique Soares Gomes',
        "nascimento": '27/05/2006',
        "rua": 'Celeste de Jesus Alves dos Santos',
        "numero_da_rua": '',
        "cep": '11740000',
        "bairro": 'Bopiranga',
        "cidade": 'Itanhaém',
        "uf": 'SP',
        "pais": 'Brasil',
        "celular": '13997143762',
        "celular2": '',
        "email": 'henriqueluizsoarestop10@gmail.com',
        "empresa": '',
        "cargo": '',
        "data_fim_servico": '',
        "data_inicio_servico": '',
        "instituto": 'Etec de Itanhaém',
        "curso": 'MIN - Técnico em Informática para Internet',
        "data_inicio_curso": '2022',
        "data_fim_curso": '2024',
        "idiomas": 'Inglês',
        "nivel": 'Fluente',
        "habilidades": 'ara',
        "objetivo": 'Busco uma posição que me permita aplicar e expandir meu conhecimento em programação e desenvolvimento web, contribuindo para projetos inovadores e desafiadores. Desejo crescer profissionalmente em um ambiente que valorize a colaboração, o aprendizado contínuo e a excelência técnica.'
    })

    function importData() {
        // devonly

        // fields.map(i => {
        //     //@ts-ignore
        //     const el: HTMLInputElement = document.getElementsByName(i)[0]
        //     //@ts-ignore
        //     el.value = dataImport[i]
        // })
    }


    return (

        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(handleFormData)} className="w-[35rem] flex flex-col mt-7 md:p-2">

                <div className="py-8">
                    <div className="flex flex-col justify-center w-full items-center gap-3 mt-8">
                        <label htmlFor="profile_pic" className="w-48 h-48 border-2 bg-contain rounded overflow-hidden cursor-pointer"><img className="" src={data?.picture || imageSrc} /></label>
                        <input className="hidden w-72 h-72 border-2" type="file" onChange={handleImageChange} accept="image/*" name="picture" placeholder="Nome:" id="profile_pic" />
                    </div>
                </div>
                <Section legend="Dados Pessoais">
                    <input
                        {...register('nome')}
                        value={data.nome} onChange={(e) => setData({
                            nome: e.target.value
                        })} className="border-black px-2 border-2 capitalize rounded-md mt-3" autoFocus placeholder="Nome*" />

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
                            <input
                                {...register('genero')}
                                checked={data.genero == 'masculino' ? true : false}
                                onChange={(e) => setData({
                                    genero: e.target.value
                                })
                                } className="border-black px-2 border-2 rounded-md mt-1 mr-2" value='masculino' id="masculino" type="radio" />
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div>
                            <input
                                {...register('genero')}
                                checked={data.genero == 'feminino' ? true : false}
                                onChange={(e) => setData({
                                    genero: e.target.value
                                })} className="border-black px-2 border-2 rounded-md mt-1 mr-2" value='feminino' id="feminino" type="radio" />
                            <label htmlFor="feminino">Feminino</label>
                        </div>
                    </div>
                </Section>

                <Section subsection legend="Endereço">
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <input {...register('cidade')} value={data.cidade} onChange={(e) => {
                            setData({
                                cidade: e.target.value
                            })
                        }} className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="Cidade*" />

                        <div className="flex w-full gap-4">

                            <input
                                {...register('cep')}
                                value={data.cep}
                                onChange={(e) => {
                                    setData({
                                        cep: e.target.value
                                    })
                                }}
                                className="border-black px-2 border-2 rounded-md mt-3"
                                placeholder="Cep*"
                                id="cep"
                            />
                            <input {...register('uf')} defaultValue={'sp'} value={data.uf} className="border-black px-2 border-2 rounded-md mt-3 w-12 uppercase" type="text" placeholder="UF*" maxLength={2} />
                            <input {...register('pais')} value={data.pais} className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="País*" defaultValue="Brasil" readOnly />
                        </div>
                    </div>

                </Section>


                <Section subsection legend="Contato" >
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <input
                            {...register('celular')}
                            value={data.celular}
                            onChange={(e) => {
                                setData({
                                    celular: e.target.value
                                })
                            }}
                            className="border-black px-2 border-2 rounded-md mt-3"
                            type="tel"
                            placeholder="Celular*"
                            id="celular"
                        /><input
                            {...register('celular2')}
                            value={data.celular2}
                            onChange={(e) => {
                                setData({
                                    celular2: e.target.value
                                })
                            }}
                            className="border-black px-2 border-2 rounded-md mt-3"
                            type="tel"
                            placeholder="Celular 2 (opcional)"
                            id="celular2"
                        />
                        <input {...register('email')} value={data.email} onChange={(e) => {
                            setData({
                                email: e.target.value
                            })
                        }} type="email" className="border-black px-2 border-2 rounded-md mt-3 flex-1" placeholder="Email*" />
                    </div>
                </Section>

                <Section expandable legend="Formação acadêmica">
                    <input {...register('instituto')} value={data.instituto} onChange={(e) => {
                        setData({
                            instituto: e.target.value
                        })
                    }} className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="Nome da instituição:" defaultValue="Etec de Itanhaém" readOnly />
                    <select {...register('curso')} disabled value={data.curso} onChange={(e) => {
                        setData({
                            curso: e.target.value
                        })
                    }} className="border-black border-2 rounded p-1 mt-3 ">
                        <option>Selecione um curso</option>
                        <option value="MIN - Técnico em Informática para Internet">MIN - Técnico em Informática para Internet</option>
                        <option value="MAM - Técnico em Meio Ambiente">MAM - Técnico em Meio Ambiente</option>
                        <option value="MAD - Técnico em Administração">MAD - Técnico em Administração</option>
                    </select>
                    <input {...register('data_inicio_curso')} value={data.data_inicio_curso} className="border-black px-2 border-2 rounded-md mt-3" type="number" maxLength={4} placeholder="Ano de inicio" />
                    <input {...register('data_fim_curso')} value={data.data_fim_curso} className="border-black px-2 border-2 rounded-md mt-3" type="number" maxLength={4} placeholder="Ano de Conclusão (ou previsão de término)" />
                </Section>
                <Section expandable legend="Experiência profissional">
                    <input {...register('empresa')} value={data.empresa} onChange={(e) => {
                        setData({
                            empresa: e.target.value
                        })
                    }} className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="Nome da empresa:" />
                    <input {...register('cargo')} value={data.cargo} onChange={(e) => {
                        setData({
                            cargo: e.target.value
                        })
                    }} className="border-black px-2 border-2 rounded-md mt-3" type="text" placeholder="Cargo:" />

                    <input {...register('data_inicio_servico')} value={data.data_inicio_servico} onChange={(e) => {
                        setData({
                            data_inicio_servico: e.target.value
                        })
                    }} className="border-black px-2 border-2 rounded-md mt-3" type="number" maxLength={4} placeholder="Ano de inicio" />
                    <input {...register('data_fim_servico')} value={data.data_fim_servico} onChange={(e) => {
                        setData({
                            data_fim_servico: e.target.value
                        })
                    }} className="border-black px-2 border-2 rounded-md mt-3" type="number" maxLength={4} placeholder="Ano de término" />
                </Section>
                <Section expandable legend="Idiomas">

                    <input {...register('idiomas')} onChange={(e) => {
                        setData({
                            idiomas: e.target.value
                        })
                    }} value={data.idiomas} className="border-black px-2 border-2 rounded-md mb-2 mt-3" type="text" placeholder='Idiomas (ex.: "Inglês, Espanhol")' />
                    <select {...register('nivel')} onChange={(e) => {
                        setData({
                            nivel: e.target.value
                        })
                    }} value={data.nivel} className="border-black border-2 rounded p-1">
                        <option value="basico">Básico</option>
                        <option value="intermediario">Intermediario</option>
                        <option value="fluente">Fluente</option>
                    </select>
                </Section>

                <Section expandable legend="Habilidades">
                    <textarea {...register('habilidades')} onChange={(e) => {
                        setData({
                            habilidades: e.target.value
                        })
                    }} value={data.habilidades} className="w-full mt-3 h-full border-black border-2 rounded p-2 min-h-20" placeholder={`• Técnicas\n• Interpessoais (comunicação, trabalho em equipe, etc.)`} autoComplete="no">

                    </textarea>
                </Section>

                <Section expandable legend="Objetivo">
                    <div className="w-full mt-3 pb-4">
                        <textarea {...register('objetivo')} onChange={(e) => {
                            setData({
                                objetivo: e.target.value
                            })
                        }} value={data.objetivo} className="w-full mt-3 border-black border-2 rounded p-2 min-h-20" placeholder="Uma breve descrição de seus objetivos de carreira e o que você busca na posição desejada." autoComplete="no">

                        </textarea>
                    </div>
                </Section>
                <footer className="flex mb-8 gap-2 w-full">
                    <button className="bg-emerald-400 font-bold rounded-md py-1 px-8 text-white" about="teet" type="submit">Salvar</button>
                    <button onClick={e => confirm('Deseja limpar todos os campos?') ? null : e.preventDefault()} className="bg-red-400 font-bold rounded-md py-1 px-8 text-white" type="reset">Limpar</button>
                </footer>
            </form>
            <button onClick={importData} className="hidden md:visible bg-red-400 font-bold rounded-md py-1 px-8 text-white">Import</button>

        </div>

    )
}