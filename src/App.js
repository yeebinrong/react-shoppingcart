import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReactDOM from 'react-dom';

class ProductForm extends React.Component {
  render() {
    return (
      <Form className="mt-5 column" onSubmit={this.props.handleSubmit} noValidate validated={this.props.form.validated}>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" required name="name" placeholder="Enter product name." value={this.props.form.name} onChange={this.props.handleInputChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a product name.
          </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="number" required name="price" placeholder="Enter product price." value={this.props.form.price} onChange={this.props.handleInputChange} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
            Please enter a product price.
            </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group>
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control as="select" name="qty" value={this.props.form.qty} onChange={this.props.handleInputChange} className="select">
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{
        name: '',
        price: '',
        qty: "1",
        validated: false,
      },
      listItems: []
    };

  }

  // handle user input to text field
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState( state => {
      state.form[name] = value;
      state.form.validated = true;
      return state;
    });
  }

  // handle user clicking submit button
  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      alert('A submission was made.');
      const product = {...this.state.form};
      delete product.validated;
      this.setState({
        form:{
          name: '',
          price: '',
          qty: "1",
          validated: false
        },
      })
      console.info(product)
      this.postData(product);
    }
  }

  deleteProduct (id) {
    if (window.confirm('Delete this product?')) {
      axios.delete('https://27h7h6zsj5.execute-api.us-east-1.amazonaws.com/dev/products/' + id)
      .then (() => {
        this.getList();
      })
      console.info(id)
    } else {

    }
  }

  postData (product) {
    axios.post('https://27h7h6zsj5.execute-api.us-east-1.amazonaws.com/dev/products', product)
    .then (() => {
      this.getList();
    })
  }

  getList = () => {
    axios.get(`https://27h7h6zsj5.execute-api.us-east-1.amazonaws.com/dev/products`)
    .then (res => {
      const data = res['data'].map(d => {
      return(
        <tr key={d.id}>
        {/* <td>{d.id}</td> */}
        <td>{d.name}</td>
        <td>{d.price}</td>
        <td>{d.qty}</td>
        <td type="button" onClick={() => this.deleteProduct(d.id)} className="border p1 red">X</td>
      </tr>)})
      this.setState({listItems: data});
      ReactDOM.render(this.state.listItems, document.getElementById('tableData'));
    })
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    return  (
      <div className="row">
        <div className="col-6">
            <ProductForm form={this.state.form} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}></ProductForm>
        </div>
        <div className="col-6">
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
        </div>
      </div>
    );
  }
}

function App() {
  return (
      <Main></Main>
  );
}

export default App;
