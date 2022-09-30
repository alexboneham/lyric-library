import './button-group.styles.scss';

const ButtonGroup = ({ buttonProps }) => {
  const { inLibrary = undefined, handler = undefined, handleDelete = undefined, handleEdit = undefined } = buttonProps;

  return (
    <div className="button-group">
      {inLibrary !== undefined && (
        <button disabled={inLibrary ? true : false} onClick={handler}>
          {inLibrary ? 'Added to library!' : 'Add to library'}
        </button>
      )}
      {handleDelete && <button onClick={handleDelete}>Delete</button>}
      {handleEdit && <button onClick={handleEdit}>Edit</button>}
    </div>
  );
};

export default ButtonGroup;
