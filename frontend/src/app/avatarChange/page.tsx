'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ImageUpload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(); // Create a FormData object
      formData.append('image', data.image[0]); // Add image to FormData

      const response = await axios.put('/api/auth/avatar', {
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.data;
      setImageUrl(responseData.url); // Update image URL from backend response

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('image', { required: true })} />
      {errors.image && <span>Image is required</span>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default ImageUpload;
