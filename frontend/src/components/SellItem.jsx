import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

const SellItem = (props) => {

    const [price, setPrice] = useState(0);

    const handlePriceChange = e => {
        setPrice(e.target.value);
    };
    
    const handleListItem = async () => {
        await fetch('http://localhost:8000/api/v1/listings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
            body: JSON.stringify({
                item_uuid: props.item.uuid,
                price: price,
                user_uuid: props.item.user_uuid,
                private: false
            })
        })
        props.onClose();
    };

    return(
        <Modal size='lg' show={props.show} onHide={props.onClose} centered>
            <Modal.Header title='Sell Item' closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" value={props.item.name} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Price</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" min={0} placeholder="Enter item price" onChange={e => handlePriceChange(e)}/>
                            <InputGroup.Text>wei</InputGroup.Text>
                        </InputGroup>
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