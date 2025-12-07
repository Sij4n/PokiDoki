import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import AnimatedText from './animations/AnimatedText';
import FadeIn from './animations/FadeIn';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setAllPokemon(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = allPokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || pokemon.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="App">
      <header style={{ marginBottom: '3rem', paddingTop: '2rem' }}>
        <FadeIn>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokeball"
              style={{ width: '40px', height: '40px' }}
            />
            <AnimatedText text="Pokedex" className="logo-text" />
          </div>

          <p style={{ opacity: 0.7 }}>A React Bits Inspired Collection</p>
        </FadeIn>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
        </div>

        {loading ? (
          <div style={{ color: 'white', marginTop: '50px' }}>Loading Amazing Pokemon...</div>
        ) : (
          <PokemonList pokemon={filteredPokemon} onPokemonClick={setSelectedPokemon} />
        )}
      </div>

      <PokemonModal
        selectedPokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default App;
