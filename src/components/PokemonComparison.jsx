import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PokemonComparison = ({ comparedPokemons, onRemove, onClose }) => {
    if (comparedPokemons.length === 0) return null;

    const getStatValue = (pokemon, statName) => {
        const stat = pokemon.stats.find(s => s.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };

    const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '2px solid rgba(255, 255, 255, 0.2)',
                    padding: '2rem',
                    zIndex: 150,
                    maxHeight: '70vh',
                    overflowY: 'auto',
                }}
            >
                <div style={{ 
                    maxWidth: '1400px', 
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Pokemon Comparison</h2>
                    <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'rgba(255, 0, 0, 0.3)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1.5rem',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </motion.button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${comparedPokemons.length}, 1fr)`,
                    gap: '2rem',
                    overflowX: 'auto'
                }}>
                    {comparedPokemons.map((pokemon) => (
                        <motion.div
                            key={pokemon.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                minWidth: '250px'
                            }}
                        >
                            <div style={{ position: 'relative', textAlign: 'center' }}>
                                <motion.button
                                    onClick={() => onRemove(pokemon.id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        background: 'rgba(255, 0, 0, 0.7)',
                                        border: 'none',
                                        color: '#fff',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ×
                                </motion.button>

                                <img
                                    src={pokemon.sprites.other['official-artwork'].front_default}
                                    alt={pokemon.name}
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', margin: '1rem 0' }}>
                                    {pokemon.name}
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {pokemon.types.map((type) => (
                                        <span
                                            key={type.type.name}
                                            style={{
                                                background: `var(--type-${type.type.name})`,
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '12px',
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Base Stats</h4>
                                    {statNames.map((statName) => {
                                        const value = getStatValue(pokemon, statName);
                                        return (
                                            <div key={statName} style={{ marginBottom: '0.6rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                                                    <span style={{ textTransform: 'capitalize' }}>
                                                        {statName.replace('-', ' ')}
                                                    </span>
                                                    <span style={{ fontWeight: 'bold' }}>{value}</span>
                                                </div>
                                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
                                                        transition={{ duration: 0.8 }}
                                                        style={{
                                                            height: '100%',
                                                            background: value > 75 ? '#4caf50' : value > 50 ? '#ff9800' : '#f44336',
                                                            borderRadius: '3px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PokemonComparison;

