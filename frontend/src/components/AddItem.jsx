import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const AddItem = (props) => {

    const [image, setImage] = useState({image: null, url: ''});
    const [form, setForm] = useState({title: '', description: ''});

    const handleFileChange = e => {
        let uploadedImage = e.target.files[0];
        let uploadedImageURL = URL.createObjectURL(uploadedImage);
        setImage({image: uploadedImage, url: uploadedImageURL});
    };

    const handleTitleChange = e => {
        setForm({...form, title: e.target.value});
    };
    const handleDescriptionChange = e => {
        setForm({...form, description: e.target.value});
    };
    
    const handleAddItem = () => {
        console.log(image);
        console.log(form);
        props.onClose();
    };

    return(
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title='Add Item' closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='mb-3'>
                        {image.url !== '' &&
                            <img src={image.url} alt="asd" style={{maxHeight: '60vh', width: '100%', objectFit: 'cover'}}/>
                        }
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload image</Form.Label>
                        <Form.Control type="file" onChange={e => handleFileChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item title</Form.Label>
                        <Form.Control type="text" placeholder="Enter item title" onChange={e => handleTitleChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows={4} onChange={e => handleDescriptionChange(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div>
                <Button className='ms-3' variant='success' onClick={() => handleAddItem()}>Add</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default AddItem; 