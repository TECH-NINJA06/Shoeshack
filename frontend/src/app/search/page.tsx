'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'

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
    </div>
  )
}

export default page