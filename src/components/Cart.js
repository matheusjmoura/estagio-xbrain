import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  render() {
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
                        variant="contained"
                        color="primary"
                      >
                        REMOVER
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total:{' '}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <Button variant="contained" color="primary">
                  Finalizar Compra
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
