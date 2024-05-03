

import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';

function FamilyProfileCardConfig(family) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={`/students-table/${family.family_name}/${family._id}/Family`}
            state={{ from: family.students }}
          >
            {`Children (${family.students? family.students.length : '0'})`}
          </Link>
        ),
      },
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link href={`/parents-table/${family.family_name}/${family._id}/Family`} state={{ from: family.parents }}>
            {`Parents (${family.parents.length})`}
          </Link>
        ),
      },
    ],
  ];
  return data;
}

export default FamilyProfileCardConfig;
