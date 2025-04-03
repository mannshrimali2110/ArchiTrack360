import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/order/orderSlice'; // Import the addOrder action

const AddOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrder(order)) // Dispatch the addOrder action
      .then(() => {
        console.log('Order saved successfully');
        // Optionally reset the form after submission
        // setOrder({ customerName: '', productName: '', quantity: '', price: '' });
      })
      .catch((error) => {
        console.error('Failed to save order:', error);
      });
  };

  return (
    <div>
      <h3>Add Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={order.productName}
            onChange={(e) => setOrder({ ...order, productName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={order.price}
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddOrder;
