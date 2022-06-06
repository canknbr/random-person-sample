import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendar,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/1.jpg';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState('a');
  const [title, setTitle] = useState('title');
  const [value, setValue] = useState('random value');

  const getRandomUser = async () => {
    setLoading(true);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const person = data.results[0];
      const { phone, email } = person;
      const { large: image } = person.picture;
      const {
        login: { password },
      } = person;
      const {
        name: { first, last },
      } = person;
      const {
        dob: { age },
      } = person;
      const {
        location: {
          street: { number, name },
        },
      } = person;
      const newPerson = {
        phone,
        email,
        image,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      setPerson(newPerson);
      setTitle('name');
      setValue(newPerson.name);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleValueChange = e => {
    if (e.target.classList.contains('icon')) {
      let val = e.target.dataset.label;
      setTitle(val);
      setValue(person[val]);
    }
  };
  const getRandomPerson = () => {
    getRandomUser();
  };
  useEffect(() => {
    getRandomUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!person) {
    return <div>No person found</div>;
  }
  return (
    <section className="section">
      <div className="random-container">
        <div className="user-img">
          <img src={person?.image || defaultImage} alt="" />
        </div>
        <div className="user-title">{title}</div>
        <div className="user-label">{value}</div>
        <div className="icon-container">
          <button
            className="icon"
            data-label="name"
            onMouseOver={handleValueChange}
          >
            <FaUser />
          </button>
          <button
            className="icon"
            data-label="age"
            onMouseOver={handleValueChange}
          >
            <FaCalendar />
          </button>
          <button
            className="icon"
            data-label="street"
            onMouseOver={handleValueChange}
          >
            <FaMap />
          </button>
          <button
            className="icon"
            data-label="phone"
            onMouseOver={handleValueChange}
          >
            <FaPhone />
          </button>
          <button
            className="icon"
            data-label="email"
            onMouseOver={handleValueChange}
          >
            <FaEnvelopeOpen />
          </button>
          <button
            className="icon"
            data-label="password"
            onMouseOver={handleValueChange}
          >
            <FaLock />
          </button>
        </div>
        <button className="btn" onClick={getRandomPerson}>
          random user
        </button>
      </div>
    </section>
  );
};

export default App;
