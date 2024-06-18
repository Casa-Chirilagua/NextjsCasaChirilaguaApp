import React from 'react';
import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';
import {generateParamStringForGrid} from '../generateParamStringForGrid';
function ProgramProfileCardConfig(program) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={generateParamStringForGrid({objName: program.name, id: program._id, objToRetrieve: "students", objMakingRequest: "program"})}
            state={{ from: program.students }}
          >
            {`Students (${program?.students?.length? program.students.length: 0})`}
          </Link>
        ),
      },
    ],
  ];
  return data;
}

export default ProgramProfileCardConfig;
