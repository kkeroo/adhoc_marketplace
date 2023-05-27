import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Container} from "react-bootstrap";
import React from "react";

function Profile(){
    return(
        <Container style={{marginTop: "100px"}}>
            <Card className="text-center">
                <Card.Header>Profile</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </Container>
    )
}

export default Profile;