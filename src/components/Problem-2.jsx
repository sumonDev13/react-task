import React, { useState,useEffect } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);


  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);

  useEffect(() => {
    // Fetch all contacts
    fetch('https://contact.mediusware.com/api/contacts')
      .then(res => res.json())
      .then(data => setAllContacts(data));

    // Fetch US contacts
    fetch('https://contact.mediusware.com/api/contacts?country=US')
      .then(res => res.json())
      .then(data => setUsContacts(data));
  }, []);

  const openModalA = () => {
    setShowModalA(true);
  };

  const openModalB = () => {
    setShowModalB(true);
  };

  const closeModals = () => {
    setShowModalA(false); 
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" onClick={openModalA}>All Contacts</button>
          <button className="btn btn-lg btn-outline-warning" onClick={openModalB}>US Contacts</button>
        </div>

        <Modal show={showModalA} onHide={closeModals}>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            {allContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => handleContactClick(contact)}
              >
                {contact.name}
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={openModalA}>All Contacts</Button>
            <Button onClick={openModalB}>US Contacts</Button>
            <Button onClick={closeModals}>Close</Button>

            <Form.Check 
              type="checkbox"
              label="Only Even"
              checked={onlyEven}
              onChange={() => setOnlyEven(!onlyEven)} 
            />
          </Modal.Footer>
        </Modal>

        <Modal show={showModalB} onHide={closeModals}>
          // Similar to Modal A
        </Modal>

        <Modal show={showModalC} onHide={closeModals}>
          // Show contact details
        </Modal>

      </div>
    </div>
  );
}

export default Problem2;