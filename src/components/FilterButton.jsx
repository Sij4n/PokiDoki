import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const types = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const FilterButton = ({ selectedType, setSelectedType, isNavBar = false, isLeftSide = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: isLeftSide ? '0.5rem' : (isNavBar ? '0.75rem 1.5rem' : '1rem 1.5rem'),
                    borderRadius: isNavBar ? '12px' : '16px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isLeftSide ? 'transparent' : (isNavBar ? '#000000' : 'rgba(255, 255, 255, 0.1)'),
                    backdropFilter: isNavBar && !isLeftSide ? 'none' : (!isNavBar ? 'blur(10px)' : 'none'),
                    color: isLeftSide ? '#000000' : (isNavBar ? '#ffffff' : '#fff'),
                    fontSize: isNavBar ? '0.95rem' : '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isLeftSide ? 'center' : 'flex-start',
                    gap: '0.5rem',
                    boxShadow: isLeftSide ? 'none' : (isNavBar ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)'),
                    position: isNavBar ? 'static' : 'absolute',
                    right: isNavBar ? 'auto' : '0',
                    top: isNavBar ? 'auto' : '50%',
                    transform: isNavBar ? 'none' : 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    minWidth: isLeftSide ? 'auto' : 'auto'
                }}
            >
                {isLeftSide ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ width: '20px', height: '2px', background: '#000000', borderRadius: '2px' }} />
                        <div style={{ width: '20px', height: '2px', background: '#000000', borderRadius: '2px' }} />
                    </div>
                ) : (
                    <>
                        <span>Filter</span>
                        <span style={{ fontSize: isNavBar ? '0.9rem' : '1.2rem' }}>▼</span>
                    </>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(5px)',
                                zIndex: 300,
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: isLeftSide ? 'auto' : '0',
                                left: isLeftSide ? '0' : 'auto',
                                marginTop: '0.5rem',
                                background: isNavBar ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: isNavBar ? 'none' : 'blur(10px)',
                                border: isNavBar ? '1px solid #e0e0e0' : '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                zIndex: 301,
                                minWidth: '300px',
                                maxHeight: '400px',
                                overflowY: 'auto',
                                boxShadow: isNavBar ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                gap: '0.8rem'
                            }}>
                                {types.map((type) => (
                                    <motion.button
                                        key={type}
                                        onClick={() => {
                                            setSelectedType(type);
                                            setIsOpen(false);
                                        }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: '0.6rem 1rem',
                                            borderRadius: '20px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            background: selectedType === type
                                                ? `var(--type-${type}, #fff)`
                                                : isNavBar ? '#f5f5f5' : 'rgba(255, 255, 255, 0.1)',
                                            color: selectedType === type ? '#fff' : (isNavBar ? '#000000' : '#e0e0e0'),
                                            textTransform: 'capitalize',
                                            fontWeight: selectedType === type ? 'bold' : 'normal',
                                            boxShadow: selectedType === type ? '0 0 10px rgba(0,0,0,0.3)' : 'none',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {type}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterButton;

