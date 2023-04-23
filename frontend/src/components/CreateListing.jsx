import { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateListing() {

    const [image, setImage] = useState({image: null, url: ''});
    const [form, setForm] = useState({title: '', description: '', price: 0});

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
    const handlePriceChange = e => {
        setForm({...form, price: parseInt(e.target.value)});
    };

    return (
        <div>
            <div className='text-center welcome-text'>
                <h2>Create new listing</h2>
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col lg='6'>
                        {image.url !== '' &&
                            <img src={image.url} alt="asd" style={{maxHeight: '60vh', width: '100%', objectFit: 'cover'}}/>
                        }
                    </Col>
                  <Col lg='6'>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload image</Form.Label>
                                <Form.Control type="file" onChange={e => handleFileChange(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Listing title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Listing title" onChange={e => handleTitleChange(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as='textarea' rows={4} onChange={e => handleDescriptionChange(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" min={0} onChange={e => handlePriceChange(e)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateListing;