import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Divider } from './divider';
import { Input } from './input';
import { AddBox, Close } from '@mui/icons-material';
import { accordionClasses, IconButton } from '@mui/joy';
import { ChangeEvent, ChangeEventHandler, ReactNode, Suspense, use, useEffect, useState } from 'react';



interface MyComponentProps {
    id: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ id }) => {

    const [sectionName, setSectionName] = useState('')
    const [expanded, setExpanded] = useState(false)
    function handleSectionName(event: ChangeEvent<HTMLInputElement>) {
        setSectionName(event.target.value)
    }
    function handleExpandedState() {
        if (expanded) {
            addInput()
        }
        setExpanded(!expanded)

    }
    const [components, setComponents] = useState<JSX.Element[]>([]);
    function addInput() {
        addComponent()
    }
    const addComponent = () => {
        const newComponent = <MyComponent key={components.length} id={components.length} />;
        setComponents([...components, newComponent]);
    };

    return (<><IconButton onClick={handleExpandedState}>
        {expanded ? <Close /> : <AddBox />}
    </IconButton>

        <Accordion expanded={expanded} className='border-0 shadow-none'>
            <AccordionSummary className='flex-col h-max'>
                <strong className='m-0 p-0 border-0'>{sectionName}</strong>
                <Divider flex1={true} />
            </AccordionSummary>
            <AccordionDetails>
                <div className='flex gap-4'>
                    <Input onChange={handleSectionName} value={sectionName} addClassList='flex-1' />
                    <Input addClassList='flex-1' />
                </div>
            </AccordionDetails>
        </Accordion></>)
};

interface SectionProps {
    className?: string
    children?: ReactNode
    legend?: string
    subsection?: boolean
    expandable?: boolean
}


export default function Section({ className, children, legend, subsection, expandable = false }: SectionProps) {


    const [expandSection, setExpandSection] = useState<boolean>(false)

    const [pageLoad, setPageLoad] = useState<boolean>(true)
    const [timeout, setTimeOut] = useState<boolean>(false)

    function handleSectionExpand() {
        setExpandSection(!expandSection)
        setPageLoad(false)
    }

    function handleLoadTimeOut() {
        setTimeout(() => {
            setTimeOut(true)

        }, 75
        )
    }

    useEffect(handleSectionExpand, [])

    return (
        <>
            <fieldset className={`mb-4 transition-none  flex flex-wrap ${className}`}>
                {subsection ?
                    <>
                        <legend className='px-2'>{legend}</legend>
                        {children}
                    </>
                    : <>
                        <Divider expanded={expandSection} expandable={expandable} clickHandler={handleSectionExpand} textCase='uppercase' label={legend} />
                        <Accordion expanded={expandSection} className={`border-none ${pageLoad ? 'h-0' : ''}  transition-all duration-300 ease-in-out shadow-none mt-2 flex flex-wrap flex-col w-full`}>
                            <AccordionSummary className='hidden' />
                            <AccordionDetails className='p-0 flex transition-all duration-300 ease-in-out flex-wrap flex-col flex-1'>
                                {children}
                            </AccordionDetails>
                        </Accordion>
                    </>

                }
            </fieldset>
        </>
    );
}
