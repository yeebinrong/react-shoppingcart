import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form'

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: ''
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
    alert('A name was submitted: ' + this.state.name + ' ' + this.state.price);
    event.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="mt-5 column" noValidate>
        <div className="row">
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name: </Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter product name." value={this.state.name} onChange={this.handleInputChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group> 
        </div>
        <div className="row">
          <label>Product price: <input type="text" name="price" value={this.state.price} onChange={this.handleInputChange }/>
          </label>
        </div>
        <div className="row-6">
          <button type="submit">Submit</button>
        </div>
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
        <th>
          <tr>
            <td className="pl-5 pr-5">Id</td>
            <td className="pl-5 pr-5">Name</td>
            <td className="pl-5 pr-5">Price</td>
            <td className="pl-5 pr-5">Qty</td>
          </tr>
        </th>
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
