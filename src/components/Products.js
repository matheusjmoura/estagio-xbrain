import React, { Component } from 'react';
import formatCurrency from '../util';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { Button } from '@material-ui/core';

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

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
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
      <div className="products">
        <Fade bottom cadade>
          {this.props.products.map((product) => (
            <Card className={classes.root} key={product._id} elevation={0}>
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
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button onClick={this.closeModal}>x</button>
              <Button
                onClick={() => this.props.addToCart(product)}
                variant="contained"
                color="primary"
              >
                ADICIONAR AO CARRINHO
              </Button>
              <div>Modal</div>
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
