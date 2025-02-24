import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchQuotes = async () => {
  // Use ZenQuotes API (More Reliable)
  const response = await axios.get('https://zenquotes.io/api/quotes');
  return response.data;
};

const DataFetcher = () => {
  const [query, setQuery] = useState(''); // User input
  const [filteredQuotes, setFilteredQuotes] = useState([]); // Filtered results

  // React Query for fetching all quotes
  const { data, isLoading, error } = useQuery({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
    enabled: true, // Fetch on load
  });

  // Handle input change
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Trigger filtering when button is clicked
  const handleSearchClick = () => {
    if (!query.trim()) {
      alert('กรุณาใส่หัวข้อคำคม เช่น happiness, success, love');
      return;
    }

    // Filter quotes based on user input
    const results = data.filter(
      (quote) =>
        quote.q.toLowerCase().includes(query.toLowerCase()) || // Filter by quote text
        quote.a.toLowerCase().includes(query.toLowerCase()) // Filter by author
    );

    setFilteredQuotes(results);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold my-4">💬 ค้นหาคำคมตามธีม</h2>

      {/* Search Input & Button */}
      <div className="flex justify-center gap-2 my-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="พิมพ์ธีม เช่น happiness, success, love..."
          className="p-2 border rounded text-black w-1/2"
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔍 ค้นหา
        </button>
      </div>

      {/* Loading & Error Messages */}
      {isLoading && <p className="my-4">⏳ กำลังโหลดคำคม...</p>}
      {error && <p className="my-4 text-red-500">❌ เกิดข้อผิดพลาด: {error.message}</p>}
      {!isLoading && filteredQuotes.length === 0 && query && <p className="text-gray-500">😢 ไม่พบผลลัพธ์</p>}

      {/* Display Quotes */}
      <div className="grid grid-cols-1 gap-4 my-6">
        {filteredQuotes.length > 0
          ? filteredQuotes.map((quote, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                <p className="text-lg font-semibold">❝ {quote.q} ❞</p>
                <p className="text-gray-600 mt-2">— {quote.a || 'Unknown'}</p>
              </div>
            ))
          : data &&
            data.slice(0, 5).map((quote, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                <p className="text-lg font-semibold">❝ {quote.q} ❞</p>
                <p className="text-gray-600 mt-2">— {quote.a || 'Unknown'}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DataFetcher;
