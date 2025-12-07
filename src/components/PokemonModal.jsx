import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PokemonModal = ({ selectedPokemon, onClose }) => {
    if (!selectedPokemon) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(15px)',
                    zIndex: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <motion.div
                    layoutId={`card-${selectedPokemon.id}`}
                    className="glass-panel"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                        padding: '2rem',
                        position: 'relative',
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>

                    <div style={{ textAlign: 'center' }}>
                        <motion.img
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src={selectedPokemon.sprites.other['official-artwork'].front_default}
                            alt={selectedPokemon.name}
                            style={{ width: '200px', height: '200px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                        />

                        <motion.h2
                            style={{ textTransform: 'capitalize', fontSize: '2.5rem', margin: '1rem 0' }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {selectedPokemon.name}
                        </motion.h2>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            {selectedPokemon.types.map((type) => (
                                <span key={type.type.name} style={{
                                    background: `var(--type-${type.type.name})`,
                                    padding: '0.4rem 1rem',
                                    borderRadius: '20px',
                                    fontWeight: 'bold'
                                }}>
                                    {type.type.name}
                                </span>
                            ))}
                        </div>

                        <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                            <h3 style={{ marginTop: 0 }}>Base Stats</h3>
                            {selectedPokemon.stats.map((stat, i) => (
                                <div key={stat.stat.name} style={{ marginBottom: '0.8rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.9rem' }}>
                                        <span style={{ textTransform: 'capitalize' }}>{stat.stat.name}</span>
                                        <span>{stat.base_stat}</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                                            transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                            style={{
                                                height: '100%',
                                                background: stat.base_stat > 50 ? '#4caf50' : '#ff9800',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PokemonModal;
