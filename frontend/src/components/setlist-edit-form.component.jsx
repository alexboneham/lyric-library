import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const SetlistEditForm = ({
  handleFormSubmit,
  handleSelectChange,
  setlistNameValue,
  setSetlistNameValue,
  selectSongs,
  librarySongs,
  buttonMessage,
  toggleFormOpen = undefined,
  alertMsg,
}) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          value={setlistNameValue}
          onChange={(e) => setSetlistNameValue(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formGroupSongs" className="mt-2">
        <Form.Label>Songs</Form.Label>
        <Form.Select aria-label="select songs" value={selectSongs} onChange={handleSelectChange} multiple>
          {librarySongs &&
            librarySongs.map((song) => (
              <option value={song.id} key={song.id}>
                {song.title}
              </option>
            ))}
        </Form.Select>
        <Form.Text>Hold down “Control”, or “Command” on a Mac, to select more than one.</Form.Text>
      </Form.Group>
      <Stack direction="horizontal" className="mt-2">
        <Button type="submit">{buttonMessage}</Button>
        <Button variant="outline-secondary" className="ms-2" onClick={toggleFormOpen}>
          Cancel
        </Button>
      </Stack>
      {alertMsg && (
        <Alert variant="warning" className='mt-2'>
          <p>{alertMsg}</p>
        </Alert>
      )}
    </Form>
  );
};

export default SetlistEditForm;
