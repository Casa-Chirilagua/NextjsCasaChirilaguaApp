import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';
import HandleName from '../HandleName';
import {generateParamStringForGrid} from '../generateParamStringForGrid';


function ParentProfileCardConfig(parent) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={generateParamStringForGrid({objName: HandleName(parent), id: parent._id, objToRetrieve: "students", objMakingRequest: "parent"})}
            state={{ from: parent.students }}
          >
            {`Children (${parent.students.length})`}
          </Link>
        ),
      },
    ],
  ];
  return data;
}

export default ParentProfileCardConfig;
