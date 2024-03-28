'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import { ProductItem } from '../components/Search/Product';
import Link from 'next/link';

const page = () => {
    const [results, setResults] = useState([]);
    const searchParams = useSearchParams()
    const result = searchParams.get('q')
    useEffect(() => {
        (async () => {
          console.log(results);
         const response = await axios.get(`/api/search/${result}`);
         setResults(response.data)
         console.log("search updated" + results);
        })();
      }, []);
  return (
    <div className='text-white'>
      <Link href={'/home'}>Back to home</Link>
        <h1>Search results for: {result}</h1>
        <div className='w-full h-auto grid grid-cols-4 px-10'>
          {results?.map((product)=> {
            return (
              <ProductItem title={product?.title} desc={product?.category} brand={product?.brand} image={product?.images} productLink={product._id} />
            )
          })}
        </div>
    </div>
  )
}

export default page