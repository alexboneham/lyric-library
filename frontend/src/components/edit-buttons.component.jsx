import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
    <Container>
      {inLibrary !== undefined && (
        <Button disabled={inLibrary ? true : false} onClick={handler} variant="primary">
          {inLibrary ? 'Added to library!' : 'Add to library'}
        </Button>
      )}
      {editButtonClick && (
        <Container className='d-flex'>
          <Stack gap={2} direction="horizontal" className="mx-auto">
            <Button variant="primary" onClick={editButtonClick}>
              Edit
            </Button>
            <Button variant="danger" onClick={deleteButtonClick}>
              Delete
            </Button>
            <AddToSetlistDropdown song={song} />
          </Stack>
        </Container>
      )}
    </Container>
  );
};

export default EditButtons;
