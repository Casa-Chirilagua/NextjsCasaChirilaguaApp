'use client'
import { useState } from 'react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { RiPencilFill } from 'react-icons/ri';

const Profile = ({
  headings,
  fields,
  color,
  setOpenModal,
  setNameOfJson,
}) => {

  const [collapsedSections, setCollapsedSections] = useState([]);
  const toggleSection = (section) => {
    if (collapsedSections.includes(section)) {
      setCollapsedSections(
        collapsedSections.filter((item) => item !== section),
      );
    } else {
      setCollapsedSections([...collapsedSections, section]);
    }
  };

  try {
    return (
      <>
        <div className="profile-container">
          {headings &&
            headings.map((heading, index) => (
              <div key={index}>
                <div
                  style={{ backgroundColor: color }}
                  className={`profile-heading-container ${collapsedSections.includes(heading) ? 'collapsed' : ''
                    }`}
                  onClick={() => toggleSection(heading)}
                >
                  {collapsedSections.includes(heading) ? (
                    <IoChevronForward className="chevron-icon" />
                  ) : (
                    <IoChevronDown className="chevron-icon" />
                  )}
                  <h3>{heading}</h3>
                </div>
                {!collapsedSections.includes(heading) && (
                  <ul className="field-list">
                    {fields[heading] &&
                      Object.entries(fields[heading]).map(([key, obj]) => (

                        <li id={color} key={key} className="row-item">
                          <span className="field-key">{key}</span>
                          <span className="field-value">{obj.value}</span>
                          <div className="edit-icon-container">
                            {obj.can_edit && <div
                              type="button"
                              className="edit-profile-button"
                              onClick={() => {
                                setOpenModal(true);
                                setNameOfJson(obj);

                              }}
                            >
                              <RiPencilFill className="edit-icon" />
                            </div>}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </>
    );
  } catch (error) {
    //error);
  }
};

export default Profile;
