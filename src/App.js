import React from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from './store';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    };
  }
  createOrder = (order) => {
    alert('Pedido precisa ser salvo para ' + order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  addToCart = (product, quantity) => {
    const cartItems = this.state.cartItems.slice();
    for (var i = 0; i < quantity; i++) {
      let alreadyInCart = false;
      cartItems.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
    }
    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Produtos</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;
