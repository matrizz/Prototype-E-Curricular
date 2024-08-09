import { ArrowBack, ArrowCircleUp, ArrowDropDown, ArrowDropUp, ArrowRight, ChevronRight } from "@mui/icons-material"

interface DividerProps {
    flex1?: boolean
    label?: string
    textCase?: 'uppercase' | 'captalize'
    clickHandler?: () => void
    expanded?: boolean
    expandable?: boolean
}

export const Divider = ({flex1, label, textCase, clickHandler, expanded, expandable}: DividerProps) => {
    return (
        <div onClick={expandable? clickHandler : () => {}} className={`justify-center ${textCase? 'uppercase' : null} ${label? 'flex-col' : 'flex'} cursor-pointer items-center w-full ${flex1 === true? 'flex-1' : ''}`}>
            {expandable?  <ChevronRight className={`transition-all duration-500 ease-in-out ${expanded? 'rotate-90': null}`} />: null}
            {label? <strong className="font-bold mt-6 ml-3">{label}</strong> : null}
            <hr className="bg-slate-800 w-[96.8%] h-[3px]"></hr>
        </div>
    )
}