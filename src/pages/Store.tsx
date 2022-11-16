import React from 'react';
import { StoreItems } from '../components/StoreItems';
import storeItems from '../data/items.json';

export const Store = () => {
  return (
    <>
      <h1 className='text-4xl mb-4'>Store</h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {storeItems.map((items)=> (
              <StoreItems key={items.id} {...items}/>
          ))}
      </div>
    </>
  )
}
