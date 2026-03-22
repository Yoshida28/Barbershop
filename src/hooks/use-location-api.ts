import { useState, useEffect } from 'react';

export const useLocationAPI = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
        const data = await res.json();
        if (!data.error) {
          setCountries(data.data.map((c: any) => c.name).sort());
        }
      } catch (error) {
        console.error('Failed to fetch countries', error);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when Country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) {
        setStates([]);
        setSelectedState('');
        return;
      }
      try {
        setLoadingStates(true);
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: selectedCountry }),
        });
        const data = await res.json();
        if (!data.error) {
          setStates(data.data.states.map((s: any) => s.name).sort());
        } else {
          setStates([]);
        }
      } catch (error) {
        console.error('Failed to fetch states', error);
        setStates([]);
      } finally {
        setLoadingStates(false);
        // Reset state & city
        setSelectedState('');
        setSelectedCity('');
        setCities([]);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  // Fetch Cities when State changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry || !selectedState) {
        setCities([]);
        setSelectedCity('');
        return;
      }
      try {
        setLoadingCities(true);
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: selectedCountry, state: selectedState }),
        });
        const data = await res.json();
        if (!data.error) {
          setCities(data.data.sort());
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('Failed to fetch cities', error);
        setCities([]);
      } finally {
        setLoadingCities(false);
        setSelectedCity('');
      }
    };
    fetchCities();
  }, [selectedState, selectedCountry]);

  return {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
  };
};
