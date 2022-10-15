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
    toggleFormOpen = undefined,
  } = buttonProps;

  return (
    <Container className="mt-2">
      {inLibrary !== undefined && (
        <Button disabled={inLibrary ? true : false} onClick={handler} variant={inLibrary ? 'success' : 'primary'}>
          {inLibrary ? 'Added to library!' : 'Add to library'}
        </Button>
      )}
      {deleteButtonClick && (
        <Stack gap={2} direction="horizontal" className="">
          <Button variant="primary" onClick={toggleFormOpen}>
            Edit
          </Button>
          <Button variant="danger" onClick={deleteButtonClick}>
            Delete
          </Button>
          {song && <AddToSetlistDropdown song={song} />}
        </Stack>
      )}
    </Container>
  );
};

export default EditButtons;
