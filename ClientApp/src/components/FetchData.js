import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
      this.state = { product: [], loading: true };
  }



  componentDidMount() {
    this.populateWeatherData();
  }

  static renderproductTable(product) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel" >
        <thead>
          <tr>
            <th>ID</th>
            <th>Admins Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map(product =>
              <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name_}</td>
                  <td>{product.email}</td>
                  <td>{product.phone}</td>
                  <td>{product.actions}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderproductTable(this.state.product);

    return (
      <div className="animated bounceInRight admin">
        <h1 id="tabelLabel" >Admins</h1>
        <p>These are the current Admins available.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('api/Product');
    const data = await response.json();
    this.setState({ product: data, loading: false });
  }
}
