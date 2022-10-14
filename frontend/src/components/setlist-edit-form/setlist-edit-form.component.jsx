import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const SetlistEditForm = ({
  handleFormSubmit,
  handleSelectChange,
  setlistNameValue,
  setSetlistNameValue,
  selectSongs,
  librarySongs,
  buttonMessage,
}) => {
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formGroupName">
        <Form.Label>Setlist name</Form.Label>
        <Form.Control
          type="text"
          autoComplete='off'
          value={setlistNameValue}
          onChange={(e) => setSetlistNameValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGroupSongs">
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
      <Button type="submit" className="mt-2">
        {buttonMessage}
      </Button>
    </Form>
  );
};

export default SetlistEditForm;
