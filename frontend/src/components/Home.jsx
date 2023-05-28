import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Listing from './Listing';
import ItemDetails from './ItemDetails';

const Home = () => {
  
  const [currentItem, setCurrentItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const buyItem = async (listing) => {
      await fetch('http://localhost:8000/api/v1/listings/' + listing.uuid + '/buy/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
            body: JSON.stringify({user_uuid: localStorage.getItem('user_uuid')})
      })
      await fetchListings();
  }

    const confirmReceived = async (listing) => {
      await fetch('http://localhost:8000/api/v1/listings/' + listing.uuid + '/accept/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
            body: JSON.stringify({user_uuid: localStorage.getItem('user_uuid')})
      })
      await fetchListings();
    }

    const claimFunds = async (listing) => {
        await fetch('http://localhost:8000/api/v1/listings/' + listing.uuid + '/finish/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
            body: JSON.stringify({user_uuid: localStorage.getItem('user_uuid')})
        })
        await fetchListings();
    }

  const listingStates = {
      CREATED: {
        variant: 'success',
        button_text: 'Buy',
        badge_text: 'Listed'
      },
      LOCKED: {
        variant: 'warning',
        button_text: 'Confirm Received',
        badge_text: 'In Delivery'
      },
      RELEASE: {
        variant: 'success',
        button_text: 'Claim Funds',
        badge_text: 'Completed'
      },
      COMPLETED: {
        variant: 'dark',
        badge_text: 'Completed'
      }

  }

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

  const handleButtonClick = async (e) => {
      switch (e.status) {
            case 'CREATED':
                await buyItem(e);
                break;
            case 'LOCKED':
                await confirmReceived(e);
                break;
            case 'RELEASE':
                await claimFunds(e);
                break;
            default:
                break;
      }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {/*<ItemDetails show={showDetails} onClose={handleCloseDetails} {...currentItem}></ItemDetails>*/}
      <div className='text-center welcome-text'>
        <h2>Current listings</h2>
      </div>
      <Container className='listings-container mt-5'>
        <Row>
          {listings.map((listing) => (
            <Col lg='4' className='mt-2'>
              <Listing listing={listing}
                       state={listingStates[listing.status]}
                       onClick={() => handleButtonClick(listing)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home;
