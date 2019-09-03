import React, { Component } from "react";
import axios from "axios";
import StoreFront from "./Components/StoreFront/StoreFront";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  // Issue here was that they were trying to call for parameters,
  // when they wanted to bring in the body.
  // For body use "/products" NOT "/products/:respnse"
  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/products")
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }

  // Originally, a new cart item would just overwrite whats already there.
  // Changed code so that the cart array was set to a placeholder variable,
  // and then the new item was pushed on to the array. After that, newArr is set-stated
  // to state.cart.
  addToCart(item) {
    console.log(`Old Cart: ${this.state.cart}`)

    let newArr = this.state.cart;
    newArr.push(item);

    
    this.setState({
      cart: newArr
    });

    console.log(this.state.cart)
  }
  removeFromCart(index) {
    let cartCopy = this.state.products.slice();
    cartCopy.splice(index, 1);
    this.setState({
      cart: cartCopy
    });
  }
  navigate(location) {
    if (location === "cart") {
      this.setState({
        showCart: true
      });
    } else {
      this.setState({
        showCart: false
      });
    }
  }
  render() {
    const { products, cart, showCart } = this.state;

    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart cart={cart} removeFromCart={this.removeFromCart} />
          ) : (
            <StoreFront products={products} addToCart={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
