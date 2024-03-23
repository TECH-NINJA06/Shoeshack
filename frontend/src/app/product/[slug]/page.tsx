'use client'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

const Page = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = params.slug
        const response = await axios.get(`/api/product/${result}`);
        setProduct(response.data);
        console.log("Product found:", response.data); // Log the updated product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.slug]); // Run the effect whenever params.slug changes

  return (
    <div className='h-screen w-screen'>
      <Navbar />
      <div className='flex justify-center items-center gap-10 h-full w-full'>
        <div className='flex justify-center w-[45%] h-full bg-red-50 text-black'>
          {params.slug}
        </div>
        <div className='flex flex-col w-[30%] min-h-full overflow-y-scroll bg-red-50'>
          {/* Render product details */}
          {product && (
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {/* Render other product details as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
