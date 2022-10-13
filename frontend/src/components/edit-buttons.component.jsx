import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import AddToSetlistDropdown from './add-to-setlist-dropdown.component';

const EditButtons = ({ buttonProps, song }) => {
  // Destructure variables and functions from props
  // Each has a defult value to avoid errors when running conditionally logic in render.
  const {
    inLibrary = undefined,
    handler = undefined,
    deleteButtonClick = undefined,
    editButtonClick = undefined,
  } = buttonProps;

  return (
    <Container className="text-center">
      {inLibrary !== undefined && (
        <Button disabled={inLibrary ? true : false} onClick={handler} variant="primary">
          {inLibrary ? 'Added to library!' : 'Add to library'}
        </Button>
      )}
      {editButtonClick && (
        <ButtonGroup className="mb-2">
          <Button variant="secondary" onClick={editButtonClick}>
            Edit
          </Button>
          <Button variant="secondary" onClick={deleteButtonClick}>
            Delete
          </Button>
          <AddToSetlistDropdown song={song} />
        </ButtonGroup>
      )}
    </Container>
  );
};

export default EditButtons;
