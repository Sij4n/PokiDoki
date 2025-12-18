import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import FilterButton from './FilterButton';

const NavigationBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedType, 
  setSelectedType,
  comparisonMode,
  setComparisonMode,
  comparedPokemons,
  setComparedPokemons
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'sticky',
        top: isScrolled ? '0.5rem' : '1rem',
        zIndex: 100,
        maxWidth: '1400px',
        margin: '0 auto 2rem auto',
        padding: '0 1rem',
        transition: 'top 0.3s ease'
      }}
    >
      <motion.div
        animate={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          padding: isScrolled ? '0.75rem 1.25rem' : '1rem 1.5rem',
          boxShadow: isScrolled 
            ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
            : '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        {/* Left side - Filter button (hamburger icon style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <FilterButton selectedType={selectedType} setSelectedType={setSelectedType} isNavBar={true} isLeftSide={true} />
        </div>

        {/* Center - Search bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1',
            padding: '0 2rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: isScrolled ? '350px' : '400px', position: 'relative' }}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isNavBar={true} isScrolled={isScrolled} />
          </div>
        </div>

        {/* Right side - App name and Compare button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <motion.img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokeball"
              animate={{
                width: isScrolled ? '24px' : '28px',
                height: isScrolled ? '24px' : '28px'
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.h1
              animate={{
                fontSize: isScrolled ? '1.25rem' : '1.5rem'
              }}
              transition={{ duration: 0.3 }}
              style={{
                margin: 0,
                fontWeight: '600',
                color: '#000000',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              PookieMoN
            </motion.h1>
          </div>
          <motion.button
            onClick={() => {
              setComparisonMode(!comparisonMode);
              if (!comparisonMode) {
                setComparedPokemons([]);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              padding: isScrolled ? '0.6rem 1.25rem' : '0.75rem 1.5rem',
              fontSize: isScrolled ? '0.85rem' : '0.95rem'
            }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              background: comparisonMode ? '#4caf50' : '#000000',
              color: '#ffffff',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>{comparisonMode ? 'Exit Compare' : 'Compare'}</span>
            {comparedPokemons.length > 0 && (
              <span style={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                padding: '0.2rem 0.5rem',
                fontSize: '0.85rem'
              }}>
                {comparedPokemons.length}
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavigationBar;

