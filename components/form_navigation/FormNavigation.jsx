import React from 'react'

const FormNavigation = ({ currentStepIndex, steps, sections, goToStep }) => {

    return (
        <div style={{ color: "#343a40" }} className=' border-r border-zinc-200 text-white w-full flex flex-col text-xl col-span-1 row-span-2 rounded-l-[12px] my-[36%] p-6 gap-2'>
            {sections.map((section, index) => {
                if (currentStepIndex === index) {
                    return (
                        <button type="button" style={{ backgroundColor: "#343a40" }} className="p-8 bg-zinc-100 font-medium text-white rounded-md" key={index}>
                            {section.title}
                        </button>
                    )
                }
                return (
                    <button type="button" onClick={() => goToStep(index)} className="p-8 hover:bg-zinc-100 hover:font-medium rounded-md" key={index}>
                        {section.title}
                    </button>
                )
            })}
        </div>
    )
}

export default FormNavigation