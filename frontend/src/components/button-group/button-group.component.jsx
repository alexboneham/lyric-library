import './button-group.styles.scss';

const ButtonGroup = ({ buttonProps }) => {
  // Destructure variables and functions from props
  // Each has a defult value to avoid errors when running conditionally logic in render.
  const {
    inLibrary = undefined,
    handler = undefined,
    deleteButtonClick = undefined,
    editButtonClick = undefined,
  } = buttonProps;

  return (
    <div className="button-group">
      {inLibrary !== undefined && (
        <button disabled={inLibrary ? true : false} onClick={handler}>
          {inLibrary ? 'Added to library!' : 'Add to library'}
        </button>
      )}
      {editButtonClick && <button onClick={editButtonClick}>Edit</button>}
      {deleteButtonClick && <button onClick={deleteButtonClick}>Delete</button>}
    </div>
  );
};

export default ButtonGroup;
