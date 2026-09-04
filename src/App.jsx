import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Steps from './components/Steps';
import Stats from './components/Stats';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-container font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Steps />
        <Stats />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
