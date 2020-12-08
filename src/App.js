import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReactDOM from 'react-dom';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      qty: 1,
      validated: false

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
    this.setState({validated: true});
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    console.info(form.checkValidity())
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      alert('A submission was made: ' + this.state.name + ' ' + this.state.price + ' ' + this.state.qty);
      const product = Object.assign({},this.state);
      delete product.validated;
      this.setState({
        name: '',
        price: '',
        qty: 1
      })
      this.setState({validated: false});
      this.postData(product);
    }
  }

  postData (product) {
    axios.post('https://27h7h6zsj5.execute-api.us-east-1.amazonaws.com/dev/products', product);
  }

  render() {
    return (
      <Form className="mt-5 column" ref="form" onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" required name="name" placeholder="Enter product name." value={this.state.name} onChange={this.handleInputChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a product name.
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="text" required name="price" placeholder="Enter product price." value={this.state.price} onChange={this.handleInputChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
            Please enter a product price.
            </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group>
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control as="select" name="qty" value={this.state.qty} onChange={this.handleInputChange} className="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.testObj = [];
    this.state = {
      listItems: []
    }
  }

  getList = () => {
    axios.get(`https://27h7h6zsj5.execute-api.us-east-1.amazonaws.com/dev/products`)
    .then (res => {
      const data = res['data'].map(d => {
      return(
        <tr key={d.name}>
        {/* <td>{d.id}</td> */}
        <td>{d.name}</td>
        <td>{d.price}</td>
        <td>{d.qty}</td>
      </tr>)})
      this.setState({listItems: data});
      ReactDOM.render(this.state.listItems, document.getElementById('tableData'));
    })
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <table className="border m-3">
        <thead>
          <tr>
            {/* <td className="pl-5 pr-5">Id</td> */}
            <td className="pl-5 pr-5">Name</td>
            <td className="pl-5 pr-5">Price</td>
            <td className="pl-5 pr-5">Qty</td>
          </tr>
        </thead>
        <tbody id="tableData">
        </tbody>
      </table>
    );
  }
}

function App() {
  return (
      <div className="row">
        <div className="col-6">
            <ProductForm></ProductForm>
        </div>
        <div className="col-6">
            <ShoppingCart></ShoppingCart>
        </div>
      </div>
  );
}

export default App;
