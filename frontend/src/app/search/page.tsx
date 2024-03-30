'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import { ProductItem } from '../components/Search/Product';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  category: string;
  brand: string;
  images: string;
  // Add other properties as needed
}

function Page () {
    const [results, setResults] = useState<Product[]>([]);
    const searchParams = useSearchParams()
    const result = searchParams.get('q')
    useEffect(() => {
        (async () => {
          console.log(results);
         const response = await axios.get(`/api/search/${result}`);
         setResults(response.data)
         console.log("search updated" + results);
        })();
      }, [result]);
  return (
    <div className='text-white'>
      <Link href={'/home'}>Back to home</Link>
        <h1>Search results for: {result}</h1>
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