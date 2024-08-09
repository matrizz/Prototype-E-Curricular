import { ChangeEventHandler, ComponentProps, ReactHTMLElement, useEffect, useState } from "react"
import { StateHandler, StateHandlerProps } from "../form/page"

interface InputProps extends ComponentProps<'input'>, StateHandler {
    addClassList?: string
    capitalize?: boolean
    maskKeyHandler?: any
    clear?: boolean
}

export const Input = (props: InputProps) => {


    const [state, setState] = useState('')

    const array: string[] = []
    const classList = props.className
    const { changeStateHandler } = props
    const { maskKeyHandler } = props
    const { clear: isClear } = props

    useEffect(clearForm, [isClear])
    function clearForm() {
        if (isClear) {
            setState('')
        }
    }



    return (
        <>
            {/*@ts-ignore*/}
            <input value={state} onKeyDown={maskKeyHandler ? (e) => maskKeyHandler({ state, arr: array, setState, event: e }) : null} onChange={changeStateHandler ? (e) => changeStateHandler({ state, arr: array, setState, event: e }) : (e) => setState(e.target.value)} className={classList ? classList : `border-black px-2 border-2 rounded-md mt-3 ${props.capitalize} ${props.addClassList}`} {...props} />
        </>
    )
}
