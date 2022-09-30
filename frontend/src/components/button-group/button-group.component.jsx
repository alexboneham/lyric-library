import './button-group.styles.scss';

const ButtonGroup = () => {
  return (
    <div className="button-group">
      <button className="edit">Edit</button>
      <button className="delete">Delete</button>
      <button className="save">Save to library</button>
    </div>
  );
};

export default ButtonGroup;
