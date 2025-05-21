// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.common && country.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="countries-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div className="countryCard" key={index}>
              <img src={country.png} alt={`${country.common} flag`} />
              <p>{country.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;