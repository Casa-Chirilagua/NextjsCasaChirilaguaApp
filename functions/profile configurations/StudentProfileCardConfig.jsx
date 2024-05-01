import React from 'react'
import Link from 'next/link';
import { MdOutlineDiversity2 } from 'react-icons/md';
import { RiParentLine } from 'react-icons/ri';
import HandleName from '../HandleName';

function StudentProfileCardConfig(student) {
    const data = [
        [
          {
            icon: <RiParentLine className="icon" />,
            text: (
              <Link
                href={`/parents-table/${HandleName(student)}/${student._id}/Student`}
                state={{ from: student.parents }}
              >
                {`Parents (${student.parents.length})`}
              </Link>
            ),
            objectName: "Parent",
          },
          {
            icon: <MdOutlineDiversity2 className="icon"></MdOutlineDiversity2>,
            text: (
              <Link
                href={`/programs-table/${HandleName(student)}/${student._id}/Student`}
                state={{ from: student.programs }}
              >
                {`Programs (${student.programs.length})`}
              </Link>
            ),
            objectName: "Program",

          },
        ],
      ];
  return data;
}

export default StudentProfileCardConfig