

import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';
import {generateParamStringForGrid} from '../generateParamStringForGrid';

function FamilyProfileCardConfig(family) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={generateParamStringForGrid({objName: family.family_name, id: family._id, objToRetrieve: "student", objMakingRequest: "family"})}
            state={{ from: family.students }}
          >
            {`Children (${family.students? family.students.length : '0'})`}
          </Link>
        ),
      },
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link href={generateParamStringForGrid({objName: family.family_name, id: family._id, objToRetrieve: "parents", objMakingRequest: "family"})}>
            {`Parents (${family.parents.length})`}
          </Link>
        ),
      },
    ],
  ];
  return data;
}

export default FamilyProfileCardConfig;
