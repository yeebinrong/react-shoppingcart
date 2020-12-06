import './App.css';
import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: ''
    };

    this.handleInputChange  = this.handleInputChange .bind(this);
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
    alert('A name was submitted: ' + this.state.name + ' ' + this.price.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mt-5 column">
        <div className="row">
          <label>Product name: <input type="text" value={this.state.name} onChange={this.handleInputChange } />
          </label>
        </div>
        <div className="row">
          <label>Product price: <input type="text" value={this.state.price} onChange={this.handleInputChange }/>
          </label>
        </div>
        <div className="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

function App() {
  return (
      <div className="column">
        <div className="row">
          <NameForm></NameForm>
        </div>
      </div>
  );
}

export default App;
