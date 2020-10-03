import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={'#' + product._id}>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{product.price}</div>
                  <Button variant="contained" color="primary">
                    ADICIONAR
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
