import { ChangeEventHandler, ComponentProps, ReactHTMLElement, useEffect, useState } from "react"
import { StateHandler, StateHandlerProps } from "../form/page"

interface InputProps extends ComponentProps<'input'>, StateHandler {
    addClassList?: string
    capitalize?: boolean
    maskKeyHandler?: any
    clear?: boolean
}

export const Input = (props: InputProps) => {
    const classList = props.className

    return (
        <>
            {/*@ts-ignore*/}
            <input className={classList ? classList : `border-black px-2 border-2 rounded-md mt-3 ${props.capitalize} ${props.addClassList}`} {...props} />
        </>
    )
}
