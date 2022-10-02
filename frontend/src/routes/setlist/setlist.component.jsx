import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { isResponseOk } from '../../utils/helper-functions';
import ButtonGroup from '../../components/button-group/button-group.component';

import './setlist.styles.scss';

const Setlist = () => {
  const [setlist, setSetlist] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/setlists/${id}`)
      .then((res) => isResponseOk(res))
      .then((data) => {
        setSetlist(data);
      });
  }, [id]);

  const editButtonClick = () => console.log('Setlist edit');
  const deleteButtonClick = () => console.log('Setlist delete');

  return (
    <div className="setlist-container">
      <h1>{setlist.name}</h1>
      <p>{setlist.timestamp}</p>
      {setlist.songs && (
        <div className="song-list">
          {setlist.songs.map((item) => (
            <Link key={item.id} to={`/library/${item.id}`}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
      <ButtonGroup buttonProps={{editButtonClick, deleteButtonClick}}/>
    </div>
  );
};

export default Setlist;
