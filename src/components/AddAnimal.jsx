'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function AddAnimal() {
  const img_hosting_url ='https://api.imgbb.com/1/upload?key=d587fe35facb984ebe5250193519c219';
  const [imgName, setImgName] = useState('Image');
  const router = useRouter();  

  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.animalName.value;
    const imgFile = target.chooseFile.files[0];
    // console.log(file.name);
    const formData = new FormData();
    formData.append('image', imgFile);
    try {
      const res = await fetch(img_hosting_url, {
        method: 'POST',
        body: formData,
        headers: {  
        },
      });

      const data = await res.json();
      if (data)
      {
        const imgURL = data.data.display_url;
        const animalData = {
          name,imgURL
        };
        console.log(data.data.display_url);
        fetch('https://my-farm-server.vercel.app/animalData', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(animalData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data?.insertedId)
            {
              router.push('/');
              console.log('Successfully done');
            }
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <div className=''>
      {' '}
      <div className='container'>
        <p className='title'>Add Animal</p>
        <form action='' onSubmit={onSubmit}>
          <input
            type='text'
            name='animalName'
            placeholder='Animal Name'
            className='inputField'
          />
          <div className='fileUploadWrapper '>
            <p className='image-name'>
              {imgName.length > 8 ? imgName.substring(0, 8) + '...' : imgName}
            </p>
            <input
              type='file'
              name='chooseFile'
              onChange={(e)=>setImgName(e.target.files[0].name)}
              id='choose-image'
              className='fileInput'
            />
            <label htmlFor='choose-image' className='fileLabel'>
              Upload
            </label>
          </div>
          <input
            type='submit'
            className='submitButton2'
            value='Create Animal'
          />
        </form>
      </div>
    </div>
  );
}
