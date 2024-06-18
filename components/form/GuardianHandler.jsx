

//Components
import GridList from '@/components/list/GridList';


function GuardianHandler({
  guardians,
  selectGuardianLabel,
  title,
  form,
  handleItemId,
  setNewGuardian,
  setLookUpGuardian,
  newGuardian,
  lookUpGuardian
}) {

  const handleAddNewGuardian = (event) => {
    event.preventDefault();
    setNewGuardian(true);
    setLookUpGuardian(false);
  };

  const handleLookUpExistingGuardian = (event) => {
    event.preventDefault();
    setNewGuardian(false);
    setLookUpGuardian(true);
  };
  return (
    <div className='flex flex-col gap-6 mt-20'>
      <div  className="" >
        <div className="flex flex-row text-center items-center justify-center  py-6">
          <div style={{ width: "100%", color: "#343a40" }} className="text-5xl font-normal">{title}</div>
        </div>
        <div style={{ color: "#343a40" }} className="button-container my-10 px-20 ">

          <button
            className="p-6 transition ease-in delay-500 bg-zinc-100  text-2xl rounded-md border-black md:border-black hover:bg-black md:hover:bg-black hover:text-white md:hover:text-white"
            onClick={handleAddNewGuardian}
          >
            Add new guardian
          </button>

          <button
            className="p-6 transition ease-in-out delay-500 bg-zinc-100  text-2xl rounded-md font-normal border-black md:border-black hover:bg-black md:hover:bg-black hover:text-white md:hover:text-white"
            onClick={handleLookUpExistingGuardian}
          >
            Look up existing guardian
          </button>
        </div>
      </div>
      {newGuardian && form}
      {lookUpGuardian && (
        <div className="mx-8">
          <GridList handleItemId={handleItemId} items={guardians ? guardians : []} label={selectGuardianLabel} />
        </div>
      )}
    </div>
  );
}

export default GuardianHandler;
