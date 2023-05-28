import {Container} from "react-bootstrap";
import React, {useEffect} from "react";
import AddItem from "./AddItem";
import SellItem from "./SellItem";
import {useState} from "react";
import Badge from "react-bootstrap/Badge";

function Items(){

    const [showAddItem, setShowAddItem] = useState(false);
    const [showSellItem, setShowSellItem] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const response = await fetch(
            'http://localhost:8000/api/v1/items/?' + new URLSearchParams({user_uuid: localStorage.getItem('user_uuid')}),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('login_vc')
                }
            });
        const data = await response.json();
        setItems(data ? data : []);
    }

    useEffect(() => {
        fetchItems().then(console.log);
    }, []);

    const handleOpenSellItemModal = (idx) => {
        setCurrentItem(items[idx]);
        setShowSellItem(true);
    };

    return(
        <Container style={{marginTop: "100px"}}>
            <AddItem show={showAddItem} onClose={() => {
                setShowAddItem(false);
                fetchItems().then(console.log);
            }}/>
            <SellItem show={showSellItem}
                      onClose={() => {
                          setShowSellItem(false);
                          fetchItems().then(console.log);
                      }} item={currentItem}/>
            <div className="container">
                <div className="">
                    <h1 className="d-inline">My Items</h1>
                    <button className="btn btn-primary btn-sm ms-3 mb-3" onClick={() => setShowAddItem(true)}>Add Item</button>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-9">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr>
                                        <td><img src={item.image} style={{maxHeight: '100%', width: '5em', objectFit: 'cover'}}></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        { !item.listed ?
                                            <td><button onClick={() => handleOpenSellItemModal(index)} className="btn btn-success btn-sm">Sell</button></td>
                                            :   <td><Badge bg="warning">Listed</Badge></td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Items;