import Link from 'next/link';
import { RiParentLine } from 'react-icons/ri';
import HandleName from '../HandleName';

function ParentProfileCardConfig(parent) {
  const data = [
    [
      {
        icon: <RiParentLine className="icon" />,
        text: (
          <Link
            href={`/students-table/${HandleName(parent)}/${parent._id}/Parent`}
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
