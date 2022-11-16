import React from 'react';

type PropsType = {
    text: string
    handleClick: (id: number)=> void
}

export default function CartButton({text, handleClick}: PropsType) {
  return (
    <button 
        className="transition-all w-full rounded-full bg-indigo-600 h-10 text-white hover:bg-indigo-500/75" 
        onClick={()=>handleClick(2)}>
        <span>{"+ "+text}</span>
    </button>
  )
}
