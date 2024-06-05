

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
  // const [newGuardian, setNewGuardian] = useState(false);
  // const [lookUpGuardian, setLookUpGuardian] = useState(false);

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
    <div className='flex flex-col gap-6'>
      <div style={{
        paddingTop: '1rem', border: `1px solid rgb(221, 221, 221)`,
        borderRadius: `12px`,
        boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`
      }} className="" >
        <div className="flex flex-row text-center items-center justify-center  py-6">
          <div style={{ width: "100%", color: "#343a40" }} className="text-4xl font-normal">{title}</div>
        </div>
        <div style={{color: "#343a40"}}className="button-container my-20 px-20 ">

          <button
            className="p-6  bg-zinc-100  text-2xl rounded-md font-normal border-black md:border-black hover:bg-black md:hover:bg-black hover:text-white md:hover:text-white"
            onClick={handleAddNewGuardian}
          >
            Add new guardian
          </button>

          <button
            className="p-6  bg-zinc-100  text-2xl rounded-md font-normal border-black md:border-black hover:bg-black md:hover:bg-black hover:text-white md:hover:text-white"
            onClick={handleLookUpExistingGuardian}
          >
            Look up existing guardian
          </button>
        </div>
      </div>
      {newGuardian && form}
      {lookUpGuardian && (
        <div className="grids-container">
          <GridList handleItemId={handleItemId} items={guardians ? guardians : []} label={selectGuardianLabel} />
          {/* Additional logic based on guardian type */}
        </div>
      )}
    </div>
  );
}

export default GuardianHandler;
