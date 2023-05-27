import {Container} from "react-bootstrap";
import React from "react";
import AddItem from "./AddItem";
import SellItem from "./SellItem";
import {useState} from "react";

function Items(){

    const [showAddItem, setShowAddItem] = useState(false);
    const [showSellItem, setShowSellItem] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    const items = [
        {id: 0, title: "Item 1"},
        {id: 1, title: "Item 2"}
    ];

    const handleOpenSellItemModal = (id) => {
        for(let i = 0; i < items.length; i++){
            if(items[i].id === id){
                setCurrentItem(items[i]);
                setShowSellItem(true);
            }
        }
    };

    return(
        <Container style={{marginTop: "100px"}}>
            <AddItem show={showAddItem} onClose={() => setShowAddItem(false)}/>
            <SellItem show={showSellItem} onClose={() => setShowSellItem(false)} item={currentItem}/>
            <div className="container">
                <div className="">
                    <h1 className="d-inline">My Items</h1>
                    <button className="btn btn-primary btn-sm ms-3 mb-3" onClick={() => setShowAddItem(true)}>Add Item</button>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-9">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td><button onClick={() => handleOpenSellItemModal(item.id)} className="btn btn-warning btn-sm">Sell</button></td>
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