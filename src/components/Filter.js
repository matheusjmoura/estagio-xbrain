import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortProducts } from '../actions/productActions';

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>
        <p>Carregando...</p>
      </div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} Produtos
        </div>
        <div className="filter-sort">
          Ordenar{' '}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Lançamentos</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    sortProducts,
  }
)(Filter);
