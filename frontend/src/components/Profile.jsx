import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";

function Profile(){

    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${localStorage.getItem('user_uuid')}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
            },
        });
        const data = await res.json();
        setProfile(data);
    }

    useEffect(() => {
        fetchProfile().then(console.log);
    }, [])

    return(
        <Container style={{marginTop: "100px"}}>
            <Card className="text-center">
                <Card.Header>Profile of user<br></br> <b>{profile.first_name} {profile.last_name}</b></Card.Header>
                <Card.Body>
                    <Card.Title>UUID</Card.Title>
                    <Card.Text>
                        {profile.uuid}
                    </Card.Text>
                    <Card.Title>DID</Card.Title>
                    <Card.Text>
                        {profile.did}
                    </Card.Text>
                    <Card.Title>Username</Card.Title>
                    <Card.Text>
                        {profile.username}
                    </Card.Text>
                    <Card.Title>Ethereum Address</Card.Title>
                    <Card.Text>
                        check your balance ---> <a href={`https://sepolia.etherscan.io/address/${profile.eth_address}`}>{profile.eth_address}</a>
                    </Card.Text>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default Profile;