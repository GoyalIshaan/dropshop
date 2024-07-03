import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-64">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-2 px-4 rounded-full border text-black focus:ring focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-2xl z-10 text-slate-950"
      >
        <RiSearchLine />
      </button>
    </form>
  );
};

export default SearchBox;
