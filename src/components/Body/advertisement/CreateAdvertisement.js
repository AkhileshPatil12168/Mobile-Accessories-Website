import React, { useState } from 'react';

const AdvertisementForm = () => {
  const [formData, setFormData] = useState({
    productId: '',
    advertisementImage: '',
    advertisementType: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          advertisementImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send data to the backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Advertisement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-gray-600">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="advertisementImage" className="block text-sm font-medium text-gray-600">
            Advertisement Image
          </label>
          <input
            type="file"
            id="advertisementImage"
            name="advertisementImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {formData.advertisementImage && (
            <img
              src={formData.advertisementImage}
              alt="Advertisement Preview"
              className="mt-2 max-h-36 object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="advertisementType" className="block text-sm font-medium text-gray-600">
            Advertisement Type
          </label>
          <select
            id="advertisementType"
            name="advertisementType"
            value={formData.advertisementType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select Type</option>
            {[
              'top banner',
              'left side box',
              'right side box',
              '1st priority',
              '2nd priority',
              '3rd priority',
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Advertisement
        </button>
      </form>
    </div>
  );
};

export default AdvertisementForm;
