import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Produtos</div>
        <div className="filter-sort">
          Ordenar{' '}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option value="latest">Lançamentos</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
          </select>
        </div>
      </div>
    );
  }
}
