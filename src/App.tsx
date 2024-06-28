import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-slate-950 mx-6 my-4">
        Welcome To DropShop,
      </h1>
      <Footer />
    </>
  );
}
