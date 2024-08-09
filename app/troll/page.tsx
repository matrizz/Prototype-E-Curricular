'use client'
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Input } from "../components/input"
import InputMask from 'react-input-mask'

export default function CardLeakTest() {

    const [cardNumber, setCardNumber] = useState('')
    const [cardExp, setCardExp] = useState('')

    function handleCardNumber(e: ChangeEvent<HTMLInputElement>) {
        setCardNumber(e.target.value)
    }
    function handleCardExp(e: ChangeEvent<HTMLInputElement>) {
        setCardExp(e.target.value)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <div className="flex items-center justify-center text-2xl font-bold mt-4">

                <h1>Leaked Card Test</h1>
            </div>
            <div className="flex justify-center items-center">
                <form className="w-[35rem] h-max flex flex-col mt-7 p-2">

                    <Input type="text" addClassList="capitalize" placeholder="Nome no Cartão" />
                    <InputMask
                        mask="9999 9999 9999 9999"
                        value={cardNumber}
                        placeholder="Número do Cartão"
                        onChange={handleCardNumber}
                        id="numero"
                    >
                        {/* @ts-ignore*/}
                        {(inputProps: any) => <Input {...inputProps} type="text" />}
                    </InputMask>
                    <div className="flex gap-2 flex-wrap">
                        <Input addClassList="w-20" placeholder="dd" maxLength={2} />
                        <Input addClassList="w-20" placeholder="mm" maxLength={2} />
                        <Input addClassList="w-32" placeholder="CVV" maxLength={3} />
                    </div>
                    <Input type="password" addClassList="mb-3" placeholder="Senha do cartão" />

                    <strong><p className="font-normal text-sm text-gray-700"><i className="text-red-400">* </i>Para sua segurança, faça o <i className="text-blue-500 font-normal underline">rCaptcha</i>.</p></strong>

                    <div className="w-60 mt-2 items-center text-gray-600 gap-2 flex h-14 p-2 border rounded-sm mb-8">
                        <input type="checkbox" className="size-6 ml-1 cursor-pointer transition-all duration-1000 ease-out" />
                        <p className="text-md">

                            Não sou um robô!
                        </p>
                        <img className="size-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/2048px-RecaptchaLogo.svg.png" />
                    </div>
                    <label htmlFor="cb" className="flex mb-4 gap-2 text-xs">
                        <input type="checkbox" name="cb" id="cb" />
                        Li e concordo com os termos de <p>Política e Privacidade</p>.
                    </label>

                    <button className="rounded bg-emerald-500 text-white font-bold w-full mb-2 px-4 py-2">verificar</button>
                    <footer className="flex items-center justify-center">
                        <img className="w-96" src="https://i.pinimg.com/736x/d3/01/77/d30177517298122098c26a5598679ad3.jpg" />
                    </footer>

                </form>
            </div>
        </div>
    )
}