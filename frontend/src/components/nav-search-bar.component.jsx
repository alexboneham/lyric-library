import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NavSearch = () => {
  const [formValue, setFormValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?title=${formValue}`);
    setFormValue('');
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        className="me-2"
        placeholder="Search"
        aria-label="Search"
        required
        value={formValue}
        onChange={handleChange}
      />
      <Button type="submit" variant="outline-dark">
        Search
      </Button>
    </Form>
  );
};

export default NavSearch;