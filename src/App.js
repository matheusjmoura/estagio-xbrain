import React from 'react';
import Products from './components/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      sort: '',
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Produtos</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Carrinho</div>
          </div>
        </main>
        <footer>Criado por Matheus José de Moura.</footer>
      </div>
    );
  }
}

export default App;
