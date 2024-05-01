
function UpdateDeleteComponent(object) {
  let componentsDelete = (
    <div>
      <h3 style={{ padding: '1rem', color: 'black' }}>
        Are you sure you want to delete{' '}
        <h3 style={{ fontWeight: '800' }}>{object ? object.name : ''} ?</h3>
      </h3>
      {/* <h6 style={{paddingLeft: '1rem'}}>This action can not be undone</h6> */}
    </div>
  );
  return componentsDelete;
}

export default UpdateDeleteComponent;
