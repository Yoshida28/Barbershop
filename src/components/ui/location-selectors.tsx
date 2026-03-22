import React from 'react';
import { useLocationAPI } from '../../hooks/use-location-api';

interface LocationSelectorsProps {
  variant?: 'floating' | 'outline';
}

export const LocationSelectors = ({ variant = 'outline' }: LocationSelectorsProps) => {
  const {
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
  } = useLocationAPI();

  const renderOutlineSelect = (
    label: string,
    id: string,
    options: string[],
    value: string,
    onChange: (val: string) => void,
    isLoading: boolean,
    disabled: boolean
  ) => (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest font-bold">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || isLoading}
        className="w-full bg-transparent border border-primary border-solid p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all font-sans appearance-none"
        style={{ color: value ? 'inherit' : '#9ca3af' }}
      >
        <option value="" disabled>{isLoading ? 'Loading...' : `Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-primary-bg-bg text-heading-text">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderFloatingSelect = (
    label: string,
    id: string,
    options: string[],
    value: string,
    onChange: (val: string) => void,
    isLoading: boolean,
    disabled: boolean
  ) => (
    <div className="relative z-0 w-full mb-8 group">
      <select
        name={id}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || isLoading}
        className="block py-4 px-0 w-full text-base text-heading-text bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
        required
      >
        <option value="" disabled className="bg-primary-bg-bg text-muted-text"></option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-primary-bg-bg text-heading-text">
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute text-sm text-body-text duration-300 transform -translate-y-8 scale-75 top-4 -z-10 origin-[0] tracking-widest uppercase font-bold ${
          value || isLoading
            ? 'top-4 -translate-y-8 scale-75 text-heading-text'
            : 'top-4'
        } peer-focus:left-0 peer-focus:text-heading-text peer-focus:scale-75 peer-focus:-translate-y-8`}
      >
        {isLoading ? 'Loading...' : label}
      </label>
    </div>
  );

  const renderSelect = variant === 'floating' ? renderFloatingSelect : renderOutlineSelect;

  return (
    <>
      {renderSelect('Country', 'country', countries, selectedCountry, setSelectedCountry, loadingCountries, false)}
      {renderSelect('State', 'state', states, selectedState, setSelectedState, loadingStates, !selectedCountry)}
      {renderSelect('City', 'city', cities, selectedCity, setSelectedCity, loadingCities, !selectedState)}
    </>
  );
};
