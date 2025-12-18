import React from 'react';
import { motion } from 'framer-motion';

const PokemonCard = ({ pokemon, onClick, onCompare, isSelected, comparisonMode }) => {
  const handleClick = (e) => {
    if (comparisonMode && onCompare) {
      e.stopPropagation();
      onCompare(pokemon);
    } else if (onClick) {
      onClick(pokemon);
    }
  };

  return (
    <motion.div
      layoutId={`card-${pokemon.id}`}
      onClick={handleClick}
      className="glass-panel"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: isSelected 
          ? `linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.1))`
          : `linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.05))`,
        border: isSelected ? '2px solid #4caf50' : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isSelected ? '0 0 20px rgba(76, 175, 80, 0.5)' : 'none',
      }}
    >
      {comparisonMode && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: isSelected ? '#4caf50' : 'rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          zIndex: 10
        }}>
          {isSelected ? '✓' : '+'}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          fontSize: '6rem',
          opacity: 0.1,
          fontWeight: 'bold',
          color: '#fff',
          zIndex: 0
        }}
      >
        #{pokemon.id.toString().padStart(3, '0')}
      </div>

      <motion.img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        style={{ width: '120px', height: '120px', zIndex: 1 }}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      <h3 style={{
        textTransform: 'capitalize',
        zIndex: 1,
        margin: '1rem 0 0.5rem 0',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        {pokemon.name}
      </h3>

      <div style={{ display: 'flex', gap: '0.5rem', zIndex: 1 }}>
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            style={{
              background: `var(--type-${type.type.name})`,
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default PokemonCard;
