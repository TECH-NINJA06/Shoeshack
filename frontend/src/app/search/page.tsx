'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import { ProductItem } from '../components/Search/Product';

const page = () => {
    const [results, setResults] = useState([]);
    const searchParams = useSearchParams()
    useEffect(() => {
        (async () => {
            const result = searchParams.get('q')
          console.log(results);
         const response = await axios.get(`/api/search/${result}`);
         setResults(response.data)
         console.log("search updated" + results);
        })();
      }, []);
  return (
    <div className='text-white'>
        {results ? results[0]?.title : "Hola"}
        <ProductItem title={results[0]?.title}/>
    </div>
  )
}

export default page