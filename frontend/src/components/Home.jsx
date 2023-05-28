import {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Listing from './Listing';
import ItemDetails from './ItemDetails';

const Home = () => {
  
  const [currentItem, setCurrentItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    const response = await fetch('http://localhost:8000/api/v1/listings/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
        }
    });
    const data = await response.json();
    setListings(data ? data : []);
  }

  useEffect(() => {
    fetchListings().then(console.log);
  }, []);

  const handleShowDetails = (e) => {
    let itemId = e.target.id;
    setCurrentItem(listings[itemId]);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <ItemDetails show={showDetails} onClose={handleCloseDetails} {...currentItem}></ItemDetails>
      <div className='text-center welcome-text'>
        <h2>Current listings</h2>
      </div>
      <Container className='listings-container mt-5'>
        <Row>
          {listings.map((listing) => (
            <Col lg='4' className='mt-2'>
              <Listing {...listing} onClick={handleShowDetails}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home;
