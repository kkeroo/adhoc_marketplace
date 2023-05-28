import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

const CreateDID = (props) => {
    return(
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title="Create DID" closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Choose your username" value={props.username}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your First Name" value={props.first_name}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Last Name" value={props.last_name}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button className='ms-3' variant='primary' onClick={props.onClose}>Create</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateDID;