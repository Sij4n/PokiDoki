import React from 'react';
import { motion } from 'framer-motion';

const types = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ selectedType, setSelectedType }) => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
                display: 'flex',
                gap: '0.8rem',
                overflowX: 'auto',
                padding: '1rem 0.5rem',
                maxWidth: '100%',
                flex: '1',
                minWidth: '300px',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE 10+ */
            }}
            className="no-scrollbar"
        >
            {types.map((type) => (
                <motion.button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        background: selectedType === type
                            ? `var(--type-${type}, #fff)`
                            : 'rgba(255, 255, 255, 0.1)',
                        color: selectedType === type ? '#fff' : '#e0e0e0',
                        textTransform: 'capitalize',
                        fontWeight: selectedType === type ? 'bold' : 'normal',
                        boxShadow: selectedType === type ? '0 0 10px rgba(0,0,0,0.3)' : 'none',
                        flexShrink: 0
                    }}
                >
                    {type}
                </motion.button>
            ))}
        </motion.div>
    );
};

export default TypeFilter;
