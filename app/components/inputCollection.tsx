import { Input } from "./input"

export const InputCollection = (sectionName: string, handleSectionName: () => void) => {
    return (
        <div className='flex gap-4'>
            <Input onChange={handleSectionName} value={sectionName} addClassList='flex-1' />
            <Input addClassList='flex-1' />
        </div>
    )
}