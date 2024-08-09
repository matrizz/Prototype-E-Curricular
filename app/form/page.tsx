'use client'
import React, { Dispatch, DOMAttributes, FormEvent, KeyboardEventHandler, MouseEventHandler, SetStateAction, useEffect } from "react"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import InputMask from 'react-input-mask'
import Section from "../components/accordion"
import { Styles } from "../components/styles/input"
import { Style } from "@mui/icons-material"


export type StateHandlerProps = {
    state: string
    arr: string[]
    setState: Dispatch<SetStateAction<string>>
    event: ChangeEvent<HTMLInputElement>
}


export class StateHandler {

    changeStateHandler?({ state, arr, setState, event }: StateHandlerProps): void {
        setState(event.target.value)
    };

    maskKeyHandler?({ state, arr, setState, event }: StateHandlerProps): void {
        // @ts-ignore
        if (event.key === ' ' && !state.endsWith(',') && !state.endsWith(' ')) {
            event.preventDefault();
            setState(state + ', ');
        }
    }
}

export default function Curriculo() {

    const [imageSrc, setImageSrc] = useState('https://img.freepik.com/vetores-premium/icones-e-notificacoes-planas-do-instagram_619991-50.jpg')
    const [cep, setCep] = useState('')
    const [celular, setCelular] = useState('')
    const [celular2, setCelular2] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [isClear, setIsClear] = useState<boolean>(false)


    const handler = new StateHandler()
    const changeStateHandler = handler.changeStateHandler

    const maskKeyHandler = handler.maskKeyHandler
    function handleCep(e: ChangeEvent<HTMLInputElement>) {
        setCep(e.target.value)
    }
    function handleCelular(e: ChangeEvent<HTMLInputElement>) {
        setCelular(e.target.value)
    }
    function handleCelular2(e: ChangeEvent<HTMLInputElement>) {
        setCelular2(e.target.value)
    }


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                // @ts-ignore
                img.src = e.target.result;
            };

            img.onload = () => {
                const width = img.width;
                const height = img.height;

                // Verifica se a imagem é 3:4 ou menor que 500x500
                if ((width === 0 || height === 0) ||
                    ((width / height !== 3 / 4) && (width > 1200 || height > 1200))) {
                    alert('A imagem deve ter proporção 3:4 ou ser menor que 500x500 pixels.')
                    setImageSrc('');
                } else {
                    setImageSrc(img.src);
                }
            };

            reader.readAsDataURL(file);
        }



    };


    const [fields] = useState([
        'nome',
        'nascimento',
        // 'genero',
        'rua',
        'numero_da_rua',
        'cep',
        'bairro',
        'cidade',
        'uf',
        'pais',
        'celular',
        'celular2',
        'email',
        'empresa',
        'cargo',
        'data_fim_servico',
        'data_inicio_servico',
        'instituto',
        'curso',
        'data_inicio_curso',
        'data_fim_curso',
        'idiomas',
        'nivel',
        'habilidades',
        'objetivo',
        'test',
    ])

    function handleFormData(data: FormData) {
        fields.map(field => {
            const fieldValue = data.get(field)
        }
        )

    }
    function clearForm(e: any) {
        e.preventDefault()
        if (confirm('Deseja limpar todos os campos do formulário?')) {
            setImageSrc('')
            setCep('')
            setCelular('')
            setCelular2('')
            setNascimento('')
        } else {
            return
        }
    }
    const [genero, setGenero] = useState('')

    function handleGenero(e: ChangeEvent<HTMLInputElement>) {
        setGenero(e.target.value)
    }

    function handleNascimento(e: ChangeEvent<HTMLInputElement>) {
        setNascimento(e.target.value)
    }

    return (

        <div className="flex justify-center items-center">
            <form action={handleFormData} className="w-[35rem] flex flex-col mt-7 p-2">

                <div className="py-8">
                    <div className="flex flex-col justify-center w-full items-center gap-3 mt-8">
                        <label htmlFor="profile_pic" className="w-48 h-48 border-2 bg-contain rounded overflow-hidden cursor-pointer"><img className="" src={imageSrc} /></label>
                        <input type="file" onChange={handleImageChange} accept="image/*" placeholder="Nome:" id="profile_pic" className="hidden w-72 h-72 border-2  " />
                    </div>
                </div>
                <Section legend="Dados Pessoais">
                    <input className={`${Styles.input} capitalize`} type="text" name="nome" autoFocus placeholder="Nome*" />


                    <InputMask
                        mask={'99/99/9999'}
                        name="nascimento"
                        value={nascimento}
                        onChange={handleNascimento}
                        placeholder="Data de Nascimento*"
                        id="nascimento"
                    >
                        {/* @ts-ignore*/}
                        {(inputProps: any) => <input className={`${Styles.input}`} {...inputProps} type="text" />}
                    </InputMask>
                    <div className="my-2 flex flex-col gap-2">
                        <div className="items-center flex">
                            <input className={`${Styles.input} mt-1 mr-2`} checked={genero === 'masculino'} value='masculino' onChange={handleGenero} name="genero" id="masculino" type="radio" />
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div>
                            <input className={`${Styles.input} mt-1 mr-2`} checked={genero === 'feminino'} value='feminino' onChange={handleGenero} name="genero" id="feminino" type="radio" />
                            <label htmlFor="feminino">Feminino</label>
                        </div>
                    </div>
                </Section>

                <Section subsection legend="Endereço">
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <input className={`${Styles.input} flex-1`} name="rua" type="text" placeholder="Rua* " />
                        <input className={`${Styles.input} w-32`} name="numero_da_rua" type="number" placeholder="Número* " />
                        <input className={`${Styles.input} flex-1`} name="bairro" type="text" placeholder="Bairro* " />
                        <input className={`${Styles.input}`} name="cidade" type="text" placeholder="Cidade*" />

                        <div className="flex w-full gap-4">

                            <InputMask
                                mask="99999-999"
                                placeholder="Cep*"
                                value={cep}
                                onChange={handleCep}
                                name="cep"
                                id="cep"
                            >
                                {/* @ts-ignore*/}
                                {(inputProps: any) => <input className={`${Styles.input} flex-1`} {...inputProps} type="text" />}
                            </InputMask>
                            <input className={`${Styles.input} w-12 uppercase`} name="uf" type="text" placeholder="UF*" maxLength={2} />
                            <input className={`${Styles.input}`} name="pais" type="text" placeholder="País*" value="Brasil" readOnly disabled />
                        </div>
                    </div>

                </Section>


                <Section subsection legend="Contato" >
                    <div className="flex flex-wrap gap-y-0 gap-3">
                        <InputMask
                            mask="(99) 99999-9999"
                            name="celular"
                            value={celular}
                            onChange={handleCelular}
                            placeholder="Celular*"
                            id="celular"
                        >
                            {/* @ts-ignore*/}
                            {(inputProps: any) => <input className={`${Styles.input}`} {...inputProps} type="tel" />}
                        </InputMask>
                        <InputMask
                            mask="(99) 99999-9999"
                            name="celular2"
                            value={celular2}
                            onChange={handleCelular2}
                            placeholder="Celular 2 (opcional)"
                            id="celular2"
                        >
                            {/* @ts-ignore*/}
                            {(inputProps: any) => <input className={`${Styles.input}`} {...inputProps} type="tel" />}
                        </InputMask>
                        <input name="email" type="email" className={`${Styles.input} flex-1`} placeholder="Email*" />
                    </div>
                </Section>

                <Section expandable legend="Formação acadêmica">
                    <input className={`${Styles.input}`} name="instituto" type="text" placeholder="Nome da instituição:" value="Etec de Itanhaém" readOnly disabled />
                    <select className="border-black border-2 rounded p-1 mt-3 " name="curso">
                        <option>Selecione um curso</option>
                        <option value="min">MIN - Técnico em Informática para Internet</option>
                        <option value="mam">MAM - Técnico em Meio Ambiente</option>
                        <option value="mad">MAD - Técnico em Administração</option>
                    </select>
                    <input className={`${Styles.input}`} name="data_inicio_curso" type="number" maxLength={4} placeholder="Ano de inicio" />
                    <input className={`${Styles.input}`} name="data_fim_curso" type="number" maxLength={4} placeholder="Ano de Conclusão (ou previsão de término)" />
                </Section>

                {/* 
                <IconButton onClick={addNewSection} className="gap-2 mt-4">
                    <AddBox />
                    <strong>
                        Adicionar nova sessão
                    </strong>
                </IconButton> */}
                <Section expandable legend="Experiência profissional">
                    <input className={`${Styles.input}`} name="empresa" type="text" placeholder="Nome da empresa:" />
                    <input className={`${Styles.input}`} name="cargo" type="text" placeholder="Cargo:" />

                    <input className={`${Styles.input}`} name="data_inicio_servico" type="number" maxLength={4} placeholder="Ano de inicio" />
                    <input className={`${Styles.input}`} name="data_fim_servico" type="number" maxLength={4} placeholder="Ano de término" />
                </Section>
                <Section expandable legend="Idiomas">
                    {/*@ts-ignore*/}
                    <input name="idiomas" type="text" className={`${Styles.input} mb-2`} placeholder='Idiomas (ex.: "Inglês, Espanhol")' maskKeyHandler={maskKeyHandler} changeStateHandler={changeStateHandler} />
                    <select className="border-black border-2 rounded p-1" name="nivel">
                        <option value="basico">Básico</option>
                        <option value="intermediario">Intermediario</option>
                        <option value="fluente">Fluente</option>
                    </select>
                </Section>

                <Section expandable legend="Habilidades">
                    <textarea className="w-full mt-3 border-black border-2 rounded p-2 min-h-20" placeholder={`• Técnicas\n• Interpessoais (comunicação, trabalho em equipe, etc.)`} autoComplete="no" name="habilidades">

                    </textarea>
                </Section>

                <Section expandable legend="Objetivos">


                    <div className="w-full mt-3 pb-4">
                        <textarea className="w-full mt-3 border-black border-2 rounded p-2 min-h-20" placeholder="Uma breve descrição de seus objetivos de carreira e o que você busca na posição desejada." autoComplete="no" name="objetivo" defaultValue={''}>

                        </textarea>
                    </div>
                </Section>
                <footer className="flex mb-8 gap-2 w-full">
                    <button className="bg-emerald-400 font-bold rounded-md py-1 px-8 text-white" about="teet" type="submit">Salvar</button>
                    <button onClick={clearForm} className="bg-red-400 font-bold rounded-md py-1 px-8 text-white" type="reset">Limpar</button>
                </footer>
            </form>

        </div>

    )
}