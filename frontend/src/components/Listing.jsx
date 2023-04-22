import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Listing(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.description}
        </Card.Text>
        <p className='text-primary'>Price: {props.price} €</p>
        <Button variant="primary" id={props.id} onClick={props.onClick}>Buy</Button>
      </Card.Body>
    </Card>
  );
}

export default Listing;