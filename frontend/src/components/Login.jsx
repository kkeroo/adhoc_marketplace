import {Container, Form} from "react-bootstrap";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";

function Login(){

    const navigate = useNavigate();
    const [form, setForm] = useState({id: '', username: '', first_name: '', last_name: ''});
    const [showDIDCreate, setShowDIDCreate] = useState(false);


    const handleLoginVCIssue = async () => {
        const response = await fetch('http://localhost:8000/api/v1/vc/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: form.id, details: {username: form.username, first_name: form.first_name, last_name: form.last_name}})
        });
        const data = await response.json();
        console.log(data.proof.jwt);
        localStorage.setItem('login_vc', data.proof.jwt);
        localStorage.setItem('did', form.id);
        navigate('/');
    }

    const handleDIDCreation = async () => {
        const response = await fetch('http://localhost:8000/api/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: form.username, first_name: form.first_name, last_name: form.last_name})
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem('did', data.did);
        localStorage.setItem('user_uuid', data.uuid);
        setForm({id: data.did, username: data.username, first_name: data.first_name, last_name: data.last_name});
    }


    const handleDIDChange = e => {
        setForm({...form, id: e.target.value});
    };
    const handleUsernameChange = e => {
        setForm({...form, username: e.target.value});
    };
    const handleFirstNameChange = e => {
        setForm({...form, first_name: e.target.value});
    };
    const handleLastNameChange = e => {
        setForm({...form, last_name: e.target.value});
    };

    return(
        <Container style={{marginTop: "100px"}}>
            <Modal size='lg' show={showDIDCreate} onHide={() => setShowDIDCreate(false)} centered>
                <Modal.Header title="Create DID" closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Choose your username" onChange={handleUsernameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your First Name" onChange={handleFirstNameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your Last Name" onChange={handleLastNameChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button className='ms-3' variant='primary'
                                onClick={async () => {
                                    await handleDIDCreation();
                                    setShowDIDCreate(false);
                                }}>Create</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <div>
                <h1>Login</h1>
                <Row className={"my-5"}>
                    <Col className={"text-center"}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>DID</Form.Label>
                                <Form.Control type="text" placeholder="Enter your DID" value={form.id} onChange={e => handleDIDChange(e)}/>
                            </Form.Group>

                            {
                             form.id !== '' ? (
                                 <span>

                                    <Button variant="primary" onClick={() => handleLoginVCIssue()}>Create Login Verifiable Credential</Button>
                                 </span>
                                )   : null
                            }
                        </Form>

                        {form.id === '' ? (
                            <span>
                                <p>Don't have a DID yet?</p>
                                <Button onClick={() => setShowDIDCreate(true)}>Create DID</Button>
                            </span>
                        ) : null}

                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Login;