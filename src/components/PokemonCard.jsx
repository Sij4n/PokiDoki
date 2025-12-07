import React from 'react';
import { motion } from 'framer-motion';

const PokemonCard = ({ pokemon, onClick }) => {
  const typeMain = pokemon.types[0].type.name;

  return (
    <motion.div
      layoutId={`card-${pokemon.id}`}
      onClick={() => onClick(pokemon)}
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
        background: `linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.05))`,
      }}
    >
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
