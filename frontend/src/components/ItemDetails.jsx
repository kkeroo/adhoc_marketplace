import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemDetails = (props) => {
    return (
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title={props.title} closeButton></Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Row className=''>
                        <Col>
                            <img src={props.image} style={{maxHeight: '30vh', width: 'auto'}}></img>
                        </Col>
                        <Col>
                            <h3>{props.title}</h3>
                            <p className='mt-2'>{props.description}</p>
                            <p className='mt-2 text-secondary'><b>{props.price} €</b></p>
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <div>
                  <Button className='ms-3' variant='success' onClick={props.handleBuy}>Buy</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ItemDetails;