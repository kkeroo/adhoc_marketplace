import {Container} from "react-bootstrap";
import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login(){
    return(
        <Container style={{marginTop: "100px"}}>
            <div>
                <h1>Login</h1>
                <Row>
                    <Col className={"text-center"}>
                        <Button>Create Login Verifiable Credential</Button>
                    </Col>
                </Row>

                <Row className={"my-5"}>
                    <Col className={"text-center"}>
                        <p>Don't have a DID yet?</p>
                        <Button>Create DID</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Login;