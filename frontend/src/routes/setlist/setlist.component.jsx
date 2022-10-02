import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import ButtonGroup from '../../components/button-group/button-group.component';
import LibraryList from '../../components/library-list/library-list.component';

import './setlist.styles.scss';

const Setlist = () => {
  const [setlist, setSetlist] = useState({});
  const { id } = useParams();
  const naviagate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/setlists/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setSetlist(data);
      });
  }, [id]);

  const editButtonClick = () => console.log('Setlist edit');
  const deleteButtonClick = () => {
    if (window.confirm('Are you sure you want to delete this setlist?')) {
      fetch(`http://localhost:8000/setlists/${id}`, {
        method: 'DELETE',
      })
        .then((res) => isResponseOk(res))
        .then((data) => {
          console.log(data);
          naviagate('/setlists');
        });
    }
  };

  return (
    <div className="setlist-container">
      <h1>{setlist.name}</h1>
      <p>{setlist.timestamp}</p>
      <ButtonGroup buttonProps={{ editButtonClick, deleteButtonClick }} />
      {setlist.songs && <LibraryList songs={setlist.songs} />}
    </div>
  );
};

export default Setlist;
