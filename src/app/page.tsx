"use client";

import DragDropContainer from '@/components/DragDropContainer';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const page = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className=''>
      <Navbar onFilterChange={handleFilterChange} />
      <DragDropContainer activeFilter={activeFilter} />
      <Footer />
    </div>
  )
}

export default page; 
