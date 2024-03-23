'use client'
import Navbar from '@/components/Navbar'
import { IoMdHeartEmpty } from 'react-icons/io'


const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='h-screen w-screen'>
        <Navbar />
        <div className='flex justify-center items-center gap-10 h-full w-full'>
            <div className='flex justify-center w-[45%] h-full bg-red-50 text-black'>
              {params.slug}
            </div>
            <div className='flex flex-col w-[30%] min-h-full overflow-y-scroll bg-red-50'></div>
        </div>
    </div>
  )
}

export default page