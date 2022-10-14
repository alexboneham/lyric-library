import { useContext } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { SetlistsContext } from '../contexts/setlists.context';

const AddToSetlistDropdown = ({ song }) => {
  const { setlists, addSongToSetlist } = useContext(SetlistsContext);

  const handleSelect = (e) => {
    /* 
      Edit setlist
      Send PUT request to API with name and an array of song ids for setlist
      Returns new setlist object
    */
    addSongToSetlist(parseInt(e), song);
  };

  const disableCheck = (setlist) => {
    if (!song) return
    if (setlist.songs.find(({ id }) => id === song.id)) {
      return true;
    }
    return false;
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      title="Add to setlist"
      id="add-to-setlist-dropdown"
      variant="outline-dark"
      menuVariant="dark"
      onSelect={handleSelect}
    >
      {setlists &&
        setlists.map((setlist) => {
          // Check if song already in list, if so disable item
          let check = disableCheck(setlist);
          return (
            <Dropdown.Item key={setlist.id} eventKey={setlist.id} disabled={check}>
              {setlist.name}
            </Dropdown.Item>
          );
        })}
    </DropdownButton>
  );
};

export default AddToSetlistDropdown;
