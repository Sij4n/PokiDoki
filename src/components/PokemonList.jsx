import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

const PokemonList = ({ pokemon, onPokemonClick, comparisonMode, onCompare, comparedPokemons }) => {
  const [limit, setLimit] = useState(20);
  const displayedPokemon = pokemon.slice(0, limit);

  return (
    <>
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
          width: '100%',
        }}
      >
        {displayedPokemon.map((poke, index) => (
          <FadeIn key={poke.id} delay={index * 0.05} duration={0.3}>
            <PokemonCard 
              pokemon={poke} 
              onClick={onPokemonClick}
              onCompare={onCompare}
              isSelected={comparedPokemons?.some(p => p.id === poke.id)}
              comparisonMode={comparisonMode}
            />
          </FadeIn>
        ))}
      </motion.div>

      {limit < pokemon.length && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLimit(prev => prev + 20)}
            style={{
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(90deg, #ff00cc, #333399)',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            Load More
          </motion.button>
        </div>
      )}

      {pokemon.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.6 }}>
          <h3>No Pokemon Found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </>
  );
};

export default PokemonList;
