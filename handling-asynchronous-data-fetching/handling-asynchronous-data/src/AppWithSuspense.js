// AppWithSuspense.js
import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

// Fungsi untuk mengambil data
const fetchImages = async () => {
  const startTime = performance.now(); // Start timing
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const endTime = performance.now(); // End timing
  console.log(`Load time: ${endTime - startTime} ms`); // Log fetch time
  return response.json();
};

// Komponen untuk menampilkan data
const DataComponent = () => {
  // Menggunakan useQuery dengan bentuk objek yang benar
  const { data } = useQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
    suspense: true,
  });

  return (
    <div>
      {data.map((item) => (
        <img key={item.id} src={item.url} alt={item.title} style={{ width: '200px', margin: '10px' }} />
      ))}
    </div>
  );
};

// Komponen utama yang menggunakan Suspense
const AppWithSuspense = () => (
  <Suspense fallback={<div>Loading data...</div>}>
    <DataComponent />
  </Suspense>
);

export default AppWithSuspense;