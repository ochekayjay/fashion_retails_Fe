

import React from 'react'

export  const handleDragStart = ({id,reffs,setOffset,setCurrentRef,setIsDragging}:any) => (e:any) => {
    const { offsetLeft, offsetTop } = reffs[id-1].current!;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;
    setOffset({ x, y });
    setCurrentRef(reffs[id-1])
    setIsDragging(true);        
}

export  const handleDragEnd = (setIsDragging:any) => {
    setIsDragging(false);
  };


  export const handleDragOver = (e:any) => {
    e.preventDefault();
  }

  export const handleDrop = ({droppableRef,currentRef}:any) => (e:any) => {
    e.preventDefault();
    const { offsetLeft, offsetTop } = droppableRef.current!;
    const x = e.clientX - offsetLeft - 25;
    const y = e.clientY - offsetTop - 25;
    if(currentRef?.current){
        currentRef.current.style.left = `${x}px`;
        currentRef.current.style.top = `${y}px`;
        droppableRef.current!.appendChild(currentRef.current!);
    }
  };



