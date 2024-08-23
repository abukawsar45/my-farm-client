'use client';
import React, { useEffect, useState } from 'react';


export default function Navbar() {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchCategory = async () => {
    setLoading(true);
    const res = await fetch('https://my-farm-server.vercel.app/allCategory');
    const data = await res.json();
    setAllCategory(data);
    setLoading(false);
  };

  useEffect(() => {
  
    fetchCategory();
  }, []);

  return (
      <div className='flex justify-between ' >
        <div>
          {allCategory.length > 0
            ? allCategory.map((category) => (
                <button key={category._id} className='button'>
                  {category.categoryName}{' '}
                </button>
              ))
            : ''}
        </div>
        <div>

        </div>
      </div>);
}
