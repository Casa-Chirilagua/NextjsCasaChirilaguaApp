
import { updateProgramById } from '@/lib/features/program/programSlice';
import { updateParentById } from '@/lib/features/parent/parentSlice';
import { useThunk } from '@/hooks/use-thunk';


const AddStudentIdToParentAndProgram = (guardianOneId, guardianTwoId, studentId, programIds) => {

    doUpdateParent({
        id: guardianOneId,
        updatedFields: { students: studentId },
    });

    doUpdateParent({
        id: guardianTwoId,
        updatedFields: { students: studentId },
    });

    programIds.map((programs) => {
        doUpdateProgram({
            id: programs,
            updatedFields: { students: studentId },
        });
    });
}

export default AddStudentIdToParentAndProgram