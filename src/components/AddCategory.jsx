'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AddCategory() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const categoryName = target.categoryName.value;
    const categoryData = {
      categoryName,
    };
    try {
      fetch('https://my-farm-server.vercel.app/allCategory', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.insertedId) {
            router.push('/');
            console.log('Category Added done');
          }
        });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <div className='container'>
      <p className='title'>Add category</p>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='categoryName'
          placeholder='Name'
          className='inputField'
        />
        <input type='submit' className='submitButton' value='Save' />
      </form>
    </div>
  );
}
