import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Listing(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.item.image} />
      <Card.Body>
        <Card.Title>{props.item.name}</Card.Title>
        <Card.Text>
            {props.item.description}
        </Card.Text>
        <p className='text-primary'>Price: {props.price} WEI</p>
        <Button variant="primary" id={props.id} onClick={props.onClick}>Buy</Button>
      </Card.Body>
    </Card>
  );
}

export default Listing;