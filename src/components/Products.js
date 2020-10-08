import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin: 5,
  },
  media: {
    width: 250,
    height: 250,
  },
});

class Products extends Component {
  constructor(props) {
    super(props);
    this.quantityRef = React.createRef();
    this.state = {
      product: null,
      quantity: 0,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  MediaCard = () => {
    const classes = useStyles();
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>
              <p>Carregando...</p>
            </div>
          ) : (
            <div className="products">
              {this.props.products.map((product) => (
                <Card className={classes.root} elevation={0} key={product._id}>
                  <CardActionArea onClick={() => this.openModal(product)}>
                    <CardMedia
                      className={classes.media}
                      image={product.image}
                      title={product.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        color="textPrimary"
                        component="p"
                      >
                        {product.title}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="p">
                        {formatCurrency(product.price)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Em até 12x de {formatCurrency(product.price / 12)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {formatCurrency(product.price - product.price * 0.1)} à
                        vista (10% de desconto)
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button onClick={this.closeModal}>x</button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    <div>{formatCurrency(product.price)}</div>
                  </p>
                </div>
                <div className="product-buttons">
                  <div>
                    <Fab
                      size="medium"
                      aria-label="add"
                      className={classes.margin}
                      onClick={() => {
                        this.setState({ quantity: this.state.quantity + 1 });
                        this.quantityRef.current.value = this.state.quantity;
                      }}
                    >
                      <AddIcon />
                    </Fab>
                    <TextField
                      id="quantity"
                      value={this.state.quantity}
                      InputProps={{ inputProps: { min: 0 } }}
                      variant="outlined"
                      ref={this.quantityRef}
                    />
                    <Fab
                      size="medium"
                      aria-label="add"
                      className={classes.margin}
                      onClick={() => {
                        if (this.state.quantity !== 0) {
                          this.setState({ quantity: this.state.quantity - 1 });

                          this.quantityRef.current.value = this.state.quantity;
                        }
                      }}
                    >
                      <RemoveIcon />
                    </Fab>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        this.props.addToCart(product, this.state.quantity);
                        this.closeModal();
                      }}
                      variant="contained"
                      color="primary"
                    >
                      ADICIONAR AO CARRINHO
                    </Button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  };

  render() {
    const MediaCard = this.MediaCard;
    return (
      <div>
        <MediaCard />
      </div>
    );
  }
}

export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
