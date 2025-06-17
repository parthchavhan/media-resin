"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    images: [''],
    category: '',
    featured: false,
    note: '',
    dimensions: '',
    materials: [''],
    inStock: false,
    faqs: [{ question: '', answer: '' }],
    thicknessOptions: [{ value: '', priceModifier: 0 }],
    colorOptions: [{ value: '', priceModifier: 0 }],
  });

  const [jsonOutput, setJsonOutput] = useState(''); // State to hold the generated JSON

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    const value = e.target.value;
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'images' | 'materials' | 'thicknessOptions' | 'colorOptions'
  ) => {
    const value = e.target.value;
    setProduct((prev) => {
      if (Array.isArray(prev[field])) {
        const newArray = [...prev[field]];
        newArray[index] = value;
        return { ...prev, [field]: newArray };
      }
      return prev; // Return previous state if field is not an array
    });
  };

  const addImage = () => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const addThicknessOption = () => {
    setProduct((prev) => ({
      ...prev,
      thicknessOptions: [...prev.thicknessOptions, { value: '', priceModifier: 0 }],
    }));
  };

  const addColorOption = () => {
    setProduct((prev) => ({
      ...prev,
      colorOptions: [...prev.colorOptions, { value: '', priceModifier: 0 }],
    }));
  };

  const addFAQ = () => {
    setProduct((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const handleFAQChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'question' | 'answer') => {
    const value = e.target.value;
    setProduct((prev) => {
      const newFAQs = [...prev.faqs];
      newFAQs[index] = { ...newFAQs[index], [field]: value };
      return { ...prev, faqs: newFAQs };
    });
  };

  const handleThicknessChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'value' | 'priceModifier') => {
    const value = e.target.value;
    setProduct((prev) => {
      const newThicknessOptions = [...prev.thicknessOptions];
      newThicknessOptions[index] = { ...newThicknessOptions[index], [field]: value };
      return { ...prev, thicknessOptions: newThicknessOptions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonOutput(JSON.stringify(product, null, 2)); // Set the JSON output
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID:</label>
        <Input type="text" value={product.id} onChange={(e) => handleChange(e, 'id')} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <Input type="text" value={product.name} onChange={(e) => handleChange(e, 'name')} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea value={product.description} onChange={(e) => handleChange(e, 'description')} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price:</label>
        <Input type="number" value={product.price} onChange={(e) => handleChange(e, 'price')} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Images:</label>
        {product.images.map((image, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => handleArrayChange(e, index, 'images')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <Button type="button" onClick={addImage} className="mt-2 text-blue-500 hover:underline">+ Add Image</Button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category:</label>
        <Input type="text" value={product.category} onChange={(e) => handleChange(e, 'category')} required className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Featured:</label>
        <Input type="checkbox" checked={product.featured} onChange={(e) => handleChange(e, 'featured')} className="mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Note:</label>
        <Input type="text" value={product.note} onChange={(e) => handleChange(e, 'note')} className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Dimensions:</label>
        <Input type="text" value={product.dimensions} onChange={(e) => handleChange(e, 'dimensions')} className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Materials (comma-separated):</label>
        <Input type="text" value={product.materials.join(',')} onChange={(e) => handleArrayChange(e, 0, 'materials')} className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">In Stock:</label>
        <Input type="checkbox" checked={product.inStock} onChange={(e) => handleChange(e, 'inStock')} className="mt-1" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">FAQs:</label>
        {product.faqs.map((faq, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Question"
              value={faq.question}
              onChange={(e) => handleFAQChange(e, index, 'question')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => handleFAQChange(e, index, 'answer')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <Button type="button" onClick={addFAQ} className="mt-2 text-blue-500 hover:underline">+ Add FAQ</Button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Thickness Options:</label>
        {product.thicknessOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Thickness"
              value={option.value}
              onChange={(e) => handleThicknessChange(e, index, 'value')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Price Modifier"
              value={option.priceModifier}
              onChange={(e) => handleThicknessChange(e, index, 'priceModifier')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <Button type="button" onClick={addThicknessOption} className="mt-2 text-blue-500 hover:underline">+ Add Thickness Option</Button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Color Options:</label>
        {product.colorOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Color"
              value={option.value}
              onChange={(e) => handleArrayChange(e, index, 'colorOptions')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Price Modifier"
              value={option.priceModifier}
              onChange={(e) => handleArrayChange(e, index, 'colorOptions')}
              className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <Button type="button" onClick={addColorOption} className="mt-2 text-blue-500 hover:underline">+ Add Color Option</Button>
      </div>
      <Button type="submit" className="mt-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">Generate JSON</Button>

      {/* Text area to display the generated JSON */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Generated JSON:</label>
        <textarea
          value={jsonOutput}
          readOnly
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default ProductForm;
