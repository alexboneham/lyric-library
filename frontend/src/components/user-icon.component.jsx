import Button from 'react-bootstrap/Button';
import {ReactComponent as Icon } from '../assets/icons/person-circle.svg'

const UserIcon = () => {
  const username = 'lucy';
  return (
    <Icon style={{height: '30px', width: '30px', marginTop: '4px' }}/>
  );
};

export default UserIcon;
