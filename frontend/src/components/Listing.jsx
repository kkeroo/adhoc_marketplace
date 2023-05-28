import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function Listing(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.listing.item.image} />
      <Card.Body>
        <Card.Title>{props.listing.item.name}</Card.Title>
        <Card.Text>
            {props.listing.item.description}
        </Card.Text>
        <p className='text-primary'>Price: {props.listing.price} WEI</p>
          {props.listing.user_uuid !== localStorage.getItem('user_uuid') && ['CREATED', 'LOCKED'].includes(props.listing.status) ?
              <Button variant={props.state.variant} onClick={props.onClick}>{props.state.button_text}</Button>
                : props.listing.user_uuid === localStorage.getItem('user_uuid') && props.listing.status === 'RELEASE' ?
                  <Button variant={props.state.variant} onClick={props.onClick}>{props.state.button_text}</Button>
                  : <Badge bg={props.state.variant}>{props.state.badge_text}</Badge>
          }
      </Card.Body>
    </Card>
  );
}

export default Listing;