import { Button, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

const useStyles = makeStyles({
  removeButton: {
    background: 'linear-gradient(45deg, #ff0000 30%, #ff4040 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 2px 4px 1px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 25,
    padding: '0 30px',
    '&:hover': {
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
  proceedButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 25,
    padding: '0 30px',
  },
  checkoutButton: {
    background: '#FF9800',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 10px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 25,
    padding: '0 30px',
    '&:hover': {
      background: '#cc7a00',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  },
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
      item: null,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  Cart = () => {
    const classes = useStyles();
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Carrinho está vazio.</div>
        ) : (
          <div className="cart cart-header">
            {cartItems.length === 1
              ? `Você tem ${cartItems.length} produto no carrinho.${' '}`
              : `Você tem ${cartItems.length} produtos no carrinho.${' '}`}
          </div>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{' '}
                        <Button
                          onClick={() => this.props.removeFromCart(item)}
                          className={classes.removeButton}
                        >
                          REMOVER
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{' '}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    variant="contained"
                    color="primary"
                  >
                    PROSSEGUIR
                  </Button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <TextField
                            required
                            name="name"
                            label="Nome"
                            variant="outlined"
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <TextField
                            required
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <TextField
                            select
                            required
                            name="gender"
                            label="Gênero"
                            onChange={this.handleInput}
                            variant="outlined"
                          >
                            <MenuItem key="male" value="male">
                              Masculino
                            </MenuItem>
                            <MenuItem key="female" value="female">
                              Feminino
                            </MenuItem>
                          </TextField>
                        </li>
                        <li>
                          <Button
                            type="submit"
                            className={classes.checkoutButton}
                          >
                            FINALIZAR COMPRA
                          </Button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  render() {
    const Cart = this.Cart;
    return (
      <div>
        <Cart />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  {
    removeFromCart,
  }
)(Cart);
