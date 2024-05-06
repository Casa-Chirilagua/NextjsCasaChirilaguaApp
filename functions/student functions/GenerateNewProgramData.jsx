
function GenerateNewProgramData(data){
    const program = {
        name: data.name,
          description: data.description,
          start_date: data.start_date,
          cost: data.cost,
          
          volunteer_capacity: data.volunteer_capacity,
          program_capacity: data.program_capacity,
          when: data.when,
          commitment: data.commitment,
          location: data.location,
          responsibility: data.responsibility,
          additional_notes: data.additional_notes,
          training: data.training,
          students: [
          ],

    }

    return program;
}

export default GenerateNewProgramData;