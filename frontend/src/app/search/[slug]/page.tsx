'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import { ProductItem } from '../../components/Search/Product';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
  // Add other properties as needed
}

function Page ({ params }: { params: { slug: string } }) {
    const [results, setResults] = useState<Product[]>([]);
    // const searchParams = useSearchParams()
    // const result = searchParams.get('q')
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const result = params.slug;
          console.log(result);
          const response = await axios.get(`/api/search/${result}`);
          setResults(response.data);
          console.log("Products found:", response.data); // Log the updated product
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProduct();
    }, [params.slug]);
  return (
    <div className='text-white'>
      <Navbar />
      <Link href={'/home'}>Back to home</Link>
        <h1>Search results for: {params.slug}</h1>
        <div className='w-full h-auto grid grid-cols-4 px-10'>
          {results?.map((product)=> {
            return (
              <ProductItem key={product?.title} title={product?.title} desc={product?.category} brand={product?.brand} image={product?.images} productLink={product._id} />
            )
          })}
        </div>
    </div>
  )
}

export default Page