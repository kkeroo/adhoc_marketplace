import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const SellItem = (props) => {

    const [price, setPrice] = useState(0);

    const handlePriceChange = e => {
        setPrice(e.target.value);
    };
    
    const handleListItem = () => {
        console.log(props.item);
        console.log(price);
        props.onClose();
    };

    return(
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title='Sell Item' closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Item ID</Form.Label>
                        <Form.Control type="text" value={props.item.id} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item title</Form.Label>
                        <Form.Control type="text" value={props.item.title} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Price</Form.Label>
                        <Form.Control type="number" min={0} placeholder="Enter item price" onChange={e => handlePriceChange(e)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button className='ms-3' variant='success' onClick={() => handleListItem()}>Sell</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default SellItem; 