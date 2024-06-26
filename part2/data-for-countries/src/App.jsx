import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import countryQuery from './services/countries';
import ShowCountryInfo from './components/ShowCountryInfo'

/* 
What we need to do:
- store a search value in a state variable -> {country}
- this state should initially be null
- use {country} as input to API that queries database for country names
- store the API data in a state variable -> {countriesFound}
- whenever {country} updates state, run the API query again and store new countriesFound
- if the length of {countriesFound} > 10; return too many matches text.
- if there is 1 < x <= 10, display the {countriesFound} JSON list
- if there is only 1 result, run another API query with {country}; get full information on target country -> {countryDetails}
- display information in a particular way with fields language, capital, area and flag image
 */

const App = () => {
  let [listOfAllCountries, setListOfAllCountries] = useState([]);
  // store the string we will be querying the database for
  const [country, setCountry] = useState('')
  // store any country names that match the searched string
  const [countriesFound, setCountriesFound] = useState([]);
  // specific country details
  const [countryDetails, setCountryDetails] = useState(null);

  // creates an array of all country objects
  useEffect(() => {
    countryQuery
      .getAllCountries()
      .then(allCountryInfo => {
        const countryList = allCountryInfo.map(countryInfo => countryInfo.name.common);
        setListOfAllCountries(countryList); // Set state
        console.log('All the countries:', countryList);
    });
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    <div>
      <Filter 
      country={country}
      setCountry={setCountry} 
      setCountriesFound={setCountriesFound}
      countriesFound={countriesFound}
      listOfAllCountries={listOfAllCountries}
      />
      <ShowCountryInfo 
      countriesFound={countriesFound}
      country={country}
      countryDetails={countryDetails}
      setCountryDetails={setCountryDetails}
      setCountriesFound={setCountriesFound}
      />
    </div>
  )
  }

export default App