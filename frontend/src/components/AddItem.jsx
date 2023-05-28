import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const AddItem = (props) => {

    const [image, setImage] = useState('');
    const [form, setForm] = useState({name: '', description: ''});

    const handleFileChange = e => {
        let uploadedImage = e.target.files;
        if (uploadedImage.length > 0) {
            const [imageFile] = uploadedImage;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                setImage(srcData.toString());
            };
            fileReader.readAsDataURL(imageFile);
        }
    };

    const handleTitleChange = e => {
        setForm({...form, name: e.target.value});
    };
    const handleDescriptionChange = e => {
        setForm({...form, description: e.target.value});
    };
    
    const handleAddItem = async () => {
        const didResponse = await fetch('http://localhost:8000/api/v1/did/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            }

        })
        const didData = await didResponse.json();

        await fetch('http://localhost:8000/api/v1/items/', {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
            body: JSON.stringify({
                did: didData.did,
                user_uuid: localStorage.getItem('user_uuid'),
                name: form.name,
                description: form.description,
                image: image})
        })
        props.onClose();
    };

    return(
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title='Add Item' closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className={'mb-3 text-center'}>
                        {image !== '' &&
                                <img src={image} alt="item_image" style={{maxHeight: '50%', width: '50%', objectFit: 'cover'}}/>
                        }
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload image</Form.Label>
                        <Form.Control id={"imagePicker"} type="file" onChange={e => handleFileChange(e)}/>
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