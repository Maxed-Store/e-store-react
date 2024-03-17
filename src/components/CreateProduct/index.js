import React, { useState } from 'react';

function ProductPage() {
  const [name, setName] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  

  const [images, setImages] = useState([]);


  const handleImageAddition = (e, index) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(e.target.files[0]);
    setImages(newImages);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Image upload section */}
          <h2>Add Images</h2>
          {/* Bootstrap classes for styling */}
          <input className="form-control mb-2" type="file" onChange={(e) => handleImageAddition(e, 0)} />
          <input className="form-control mb-2" type="file" onChange={(e) => handleImageAddition(e, 1)} />
          <input className="form-control mb-2" type="file" onChange={(e) => handleImageAddition(e, 2)} />
          <input className="form-control mb-2" type="file" onChange={(e) => handleImageAddition(e, 3)} />
          <input className="form-control mb-2" type="file" onChange={(e) => handleImageAddition(e, 4)} />
          {/* Render added images here */}
          <div className="d-flex flex-wrap">
            {images.map((image, index) => (
              <img key={index} className="img-thumbnail mr-2 mb-2" src={image} alt={`Product Image ${index}`} />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          {/* Product details form */}
          <h2>Product Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Bootstrap classes for styling */}
            <input className="form-control mb-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
            <input className="form-control mb-2" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price" />
            <input className="form-control mb-2" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price" />
            <input className="form-control mb-2" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <textarea className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <select className="form-control mb-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Select Payment Method</option>
              <option value="visa">Visa Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="credit">Credit Card</option>
            </select>
            {/* Bootstrap classes for styling */}
            <button className="btn btn-primary mr-2" type="submit">Save to Draft</button>
            <button className="btn btn-primary" type="submit">Publish Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
