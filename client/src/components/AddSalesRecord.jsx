// src/components/AddSalesRecord.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSale } from '../redux/sales/salesSlice';

const AddSalesRecord = () => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSale = {
        customerName,
        productName,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
      };
      console.log('Payload being sent:', newSale); // Log the payload
      // Dispatch the addSale action
      await dispatch(addSale(newSale));
      setCustomerName('');
      setProductName('');
      setQuantity('');
      setPrice('');
      alert('Sale record added successfully!');
    } catch (error) {
      console.error('Error adding sale record:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Sales Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSalesRecord;
