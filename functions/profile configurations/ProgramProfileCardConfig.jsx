import React from 'react';
import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';

function ProgramProfileCardConfig(program) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={`/students-table/${program.name}/${program._id}/Program`}
            state={{ from: program.students }}
          >
            {`Students (${program.students.length})`}
          </Link>
        ),
      },
    ],
  ];
  return data;
}

export default ProgramProfileCardConfig;
