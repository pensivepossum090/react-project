import "./App.css";

import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./Components/BakeryItem.js";
import React from "react";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
});
/* ############################################################## */
 
function App() {
  // TODO: use useState to create a state variable to hold the state of the Cart
  /* add your Cart state code here */
  const[Cart, setCart] = useState([])
  const[price, setPrice] = useState(0)
  const[inventory, setInventory] = useState([])
  const [type, setType] = useState("All");
  const [roundStatus, setRoundStatus] = useState(2)
  const [tastyStatus, setTastyStatus] = useState(2)
  const [bakeryDataCurrent, setBakeryDataCurrent] = useState(bakeryData)
  const sortedData = getSorted(bakeryData.slice())
  const [priceStatus, setPriceStatus] = useState(2)

  function sortItems(){
    setPriceStatus(priceStatus + 1)
    if ((priceStatus % 2) === 0){
        setBakeryDataCurrent(getSorted(bakeryDataCurrent))
    } else {
        setBakeryDataCurrent(getUnsorted(bakeryDataCurrent))
    }

  }

  function getSorted(dataList) {
      dataList.sort((a, b) => {
        return (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0;
      })
    return dataList
  }

  function getUnsorted(dataList) {
    dataList.sort((a, b) => {
      return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
    })
  return dataList
}

  function checkInput(inputBox){
    if (inputBox==="round"){
      if (((roundStatus % 2)!==0) && ((tastyStatus % 2)===0)){
        setType("None")
        //switched to All
        filterItems("All")
      } else if (((roundStatus % 2)!==0) && ((tastyStatus % 2)!==0)){
        setType("Tasty")
        //switched to Tasty
        filterItems("Tasty")
      } else if (((roundStatus % 2)===0) && ((tastyStatus % 2)===0)){
        setType("All")
        //switched to Round
        filterItems("Round")
      } else {
        setType("Round")
        //switched to None
        filterItems("None")
      }  
        setRoundStatus(roundStatus + 1)
      } else if (inputBox==="tasty"){
      if (((roundStatus % 2)===0) && ((tastyStatus % 2)!==0)){
        setType("All")
        //switched to All
        filterItems("All")
      } else if (((roundStatus % 2)===0) && ((tastyStatus % 2)===0)){
        setType("Tasty")
        //switched to Tasty
        filterItems("Tasty")
      } else if (((roundStatus % 2)!==0) && ((tastyStatus % 2)!==0)){
        setType("Round")
        //switched to Round
        filterItems("Round")
      } else {
        setType("None")
        //switched to none
        filterItems("None")
      }  
        setTastyStatus(tastyStatus + 1)
    }
  }

  function filterItems(filter){
    if ((priceStatus % 2) == 0) {
    if (filter === "Round"){
      setBakeryDataCurrent(bakeryData.filter((item) => item.isRound === true))
    } else if (filter === "Tasty"){
      setBakeryDataCurrent(bakeryData.filter((item) => item.isTasty === true))
    } else if (filter === "All") {
      setBakeryDataCurrent(bakeryData)
    } else {
      setBakeryDataCurrent(bakeryData.filter((item) => ((item.isTasty === true) && (item.isRound === true))))
    }
  } else{
    if (filter === "Round"){
      setBakeryDataCurrent(sortedData.filter((item) => item.isRound === true))
    } else if (filter === "Tasty"){
      setBakeryDataCurrent(sortedData.filter((item) => item.isTasty === true))
    } else if (filter === "All") {
      setBakeryDataCurrent(sortedData)
    } else {
      setBakeryDataCurrent(sortedData.filter((item) => ((item.isTasty === true) && (item.isRound === true))))
    }
  }
  }


  function addItemToCart(item, price, id){
    setCart([...Cart, item + " $" + price])
    totalPrice(price);
    setInventory([...inventory, id])
  }

  function totalPrice(toAdd){
    setPrice(price + toAdd);
  }

  function lowerPrice(toAdd){
    setPrice(price - toAdd);
  }
  function removeItem(removeId, price){
    const shouldRemove = (i) => i === removeId
    let idx = inventory.findIndex(shouldRemove)
    if (idx !== -1){
    setCart((i) =>
    i.filter((_, index) => index !== idx)
    );  
    setInventory((i) =>
    i.filter((_, index) => index !== idx)
    );  
    lowerPrice(price)
    }

  }


  function reset(){
      setCart((current) =>
        current.filter((item) => item === 'Zebra')
      );  
      setPrice(0)
      setInventory((curr) =>
        curr.filter((item) => item === 'Zebra')
      );  
    }
  

  return (
    <div className="App">
      <h1>My Bakery</h1> {}

      <div className="filters">
        <h3>Sort By Price?</h3>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{sortItems()}} type="checkbox" id="sortPrice"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="sortPrice">
         Sort by Price
        </label>
        </div>


        <h3>Filters:</h3>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{checkInput("round")}} type="checkbox" id="round"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="round">
          Round
        </label>
        </div>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{checkInput("tasty")}} type="checkbox" id="tasty"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="tasty">
          Tastes Good
        </label>
        </div>

      </div>

      {bakeryDataCurrent?.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        <BakeryItem removeItem ={removeItem} id = {item.id} name={item.name} desc={item.description} price={item.price} image={item.image} addItemToCart={addItemToCart}/>
      ))}



      <div class="cart">
        <h2>Cart</h2>
        <ul>
        {Cart.map((item) => (
          <li>{item}</li>
        ))}
        </ul>
        <h3>Total Price: ${price.toFixed(2)}</h3>
        <button class="reset" onClick={() =>{
          reset();
        }}>Reset Cart</button>
      </div>
    </div>
  );
}

export default App;