import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get('http://localhost:3001/api/orders');
        const customersResponse = await axios.get('http://localhost:3001/api/customers');
        const productsResponse = await axios.get('http://localhost:3001/api/products');

        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate summary information (replace with your logic)
  const totalAmount = orders.reduce((total, order) => total + order.amountRs, 0);
  const taxableValue = totalAmount; // Placeholder, replace with actual logic
  const cgstPercentage = 5; // Placeholder, replace with actual value
  const sgstPercentage = 5; // Placeholder, replace with actual value
  const roundedOffValue = Math.round(totalAmount) - totalAmount;
  const invoiceTotal = Math.round(totalAmount);

  return (
    <div>
      <h2>Item Details</h2>
      <table>
        <thead>
          <tr>
            <th>Particulars</th>
            <th>HSN Code</th>
            <th>QTY</th>
            <th>Rate</th>
            <th>Amount Rs</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.particulars}</td>
              <td>{order.hsnCode}</td>
              <td>{order.qty}</td>
              <td>{order.rate}</td>
              <td>{order.amountRs}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Summary Information</h2>
      <table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Taxable Value</th>
            <th>CGST%</th>
            <th>SGST%</th>
            <th>Rounded Off</th>
            <th>Invoice Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalAmount}</td>
            <td>{taxableValue}</td>
            <td>{cgstPercentage}</td>
            <td>{sgstPercentage}</td>
            <td>{roundedOffValue}</td>
            <td>{invoiceTotal}</td>
          </tr>
        </tbody>
      </table>

      <h2>Bank Details</h2>
      <div>
        {/* Add your bank details here */}
      </div>
    </div>
  );
};

export default App;




