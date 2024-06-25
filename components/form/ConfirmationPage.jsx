import React from 'react';

/**
 * Displays the confirmation page of the form with each section and it'scorresponding data
 * @param {*} param0 
 * @returns 
 */
const ConfirmationPage = ({sectionsWithData}) => {
  return (
    <div>
        <h1>Does everything look correct?</h1>
        {sectionsWithData.map((section, index) => {
            return (
            <div key={index}>
                <h2>{section.title}</h2>
                <ul>
                {/* {section.data.map((data, index) => {
                    return (
                    <li key={index}>
                        <strong>{data.label}:</strong> {data.value}
                    </li>
                    )
                })} */}
                </ul>
            </div>
            )
        })}
    </div>
  )
}

export default ConfirmationPage