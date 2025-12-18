import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal';
import PokemonComparison from './components/PokemonComparison';
import NavigationBar from './components/NavigationBar';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedPokemons, setComparedPokemons] = useState([]);

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
      <NavigationBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        comparisonMode={comparisonMode}
        setComparisonMode={setComparisonMode}
        comparedPokemons={comparedPokemons}
        setComparedPokemons={setComparedPokemons}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {loading ? (
          <div style={{ color: 'white', marginTop: '50px' }}>Loading Amazing Pokemon...</div>
        ) : (
          <PokemonList 
            pokemon={filteredPokemon} 
            onPokemonClick={setSelectedPokemon}
            comparisonMode={comparisonMode}
            onCompare={(pokemon) => {
              if (comparedPokemons.find(p => p.id === pokemon.id)) {
                setComparedPokemons(comparedPokemons.filter(p => p.id !== pokemon.id));
              } else if (comparedPokemons.length < 6) {
                setComparedPokemons([...comparedPokemons, pokemon]);
              } else {
                alert('You can compare up to 6 Pokemons at once!');
              }
            }}
            comparedPokemons={comparedPokemons}
          />
        )}
      </div>

      <PokemonModal
        selectedPokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />

      {comparisonMode && (
        <PokemonComparison
          comparedPokemons={comparedPokemons}
          onRemove={(id) => setComparedPokemons(comparedPokemons.filter(p => p.id !== id))}
          onClose={() => {
            setComparisonMode(false);
            setComparedPokemons([]);
          }}
        />
      )}
    </div>
  );
}

export default App;
