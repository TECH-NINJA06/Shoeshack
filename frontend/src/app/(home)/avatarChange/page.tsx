'use client'

import { Input } from "@/components/ui/input";
import { useState } from "react";

const ImageUpload = () => {
  const [avatar, setAvatar] = useState(null)

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const onSubmit = () => {
    console.log("hola from Submit");
  }
  return (
    <div className='flex justify-center items-center my-40'>
    <div className="grid w-full max-w-sm items-center gap-1.5 text-white">
      <h1>Avatar</h1>
      <Input id="picture" type="file" onChange={handleFileChange} />
      <button onClick={onSubmit} className='mt-5 mx-40 font-semibold h-14 w-20 border rounded-lg'>Submit</button>
    </div>
    </div>
  )
};

export default ImageUpload;
