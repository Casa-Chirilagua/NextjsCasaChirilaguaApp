

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
    <div style={{ paddingTop: '1rem' }}>
      <h4 style={{width: "100%"}}className="page-title">{title}</h4>
      <div className="button-container">
        <button
          className="login-button-purple login-button-animated"
          onClick={handleAddNewGuardian}
        >
          Add new guardian
        </button>

        <button
          className="login-button-purple login-button-animated"
          onClick={handleLookUpExistingGuardian}
        >
          Look up existing guardian
        </button>
      </div>
      {newGuardian && form}
      {lookUpGuardian && (
        <div className="grids-container">
          <GridList handleItemId={handleItemId} items={guardians? guardians: []} label={selectGuardianLabel} />
          {/* Additional logic based on guardian type */}
        </div>
      )}
    </div>
  );
}

export default GuardianHandler;
