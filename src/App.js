import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      validated: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.info(value)
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    console.info(form.checkValidity())
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      alert('A name was submitted: ' + this.state.name + ' ' + this.state.price);
      this.setState({
        name: '',
        price: '',
      })
    }

    this.setState({validated: true});
  }

  render() {
    return (
      <Form className="mt-5 column" ref="form" onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
        <Form.Row>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name: </Form.Label>
            <Form.Control type="text" required name="name" placeholder="Enter product name." value={this.state.name} onChange={this.handleInputChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </Form.Group> 
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="formProductName">
              <Form.Label>Product Price: </Form.Label>
              <Form.Control type="text" required name="price" placeholder="Enter product price." value={this.state.price} onChange={this.handleInputChange} />
            </Form.Group> 
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">Submit</Button>
        </Form.Row>
      </Form>
    );
  }
}

class ShoppingCart extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <table className="border m-3">
        <thead>
          <tr>
            <td className="pl-5 pr-5">Id</td>
            <td className="pl-5 pr-5">Name</td>
            <td className="pl-5 pr-5">Price</td>
            <td className="pl-5 pr-5">Qty</td>
          </tr>
        </thead>
        <tbody>
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
