'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AllAnimal() {
  const [allData, setAllData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('https://my-farm-server.vercel.app/animalData');
    const data = await res.json();
    setAllData(data);
    setLoading(false);
  };
  const fetchCategory = async () => {
    setLoading(true);
    const res = await fetch('https://my-farm-server.vercel.app/allCategory');
    const data = await res.json();
    setAllCategory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  console.log(allCategory);

  if (loading) {
    return <p className='text-center text-white'>Loading...</p>;
  }

  return (
    <div className=''>
      {/* category */}
      <div className='flex justify-between item-center '>
        <div>
          {allCategory.length > 0
            ? allCategory.map((category) => (
                <button key={category._id} className='button'>
                  {category.categoryName}{' '}
                </button>
              ))
            : ''}
      
          <Link href={'/addAnimal'} className='link'>
            Add Animal
          </Link>

          <Link href={'/addCategory'} className='link'>
            Add Category
          </Link>
        
        </div>
      </div>
      {/* animal */}
      {allData.length > 0 ? (
        <div className='grid grid-cols-6 gap-x'>
          {allData.map((singleData) => (
            <div key={singleData._id} className='single-cart'>
              <Image
                src={singleData?.imgURL}
                alt='animal image'
                width={150}
                height={120}
              />
              <p className='text-center text-white uppercase'>
                {singleData?.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h4 className='text-center text-white'>No data</h4>
      )}
    </div>
  );
}
