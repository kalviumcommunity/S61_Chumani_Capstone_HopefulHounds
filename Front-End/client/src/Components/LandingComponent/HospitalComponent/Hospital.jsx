import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hospital.css';

function Hospital() {
  const [entities, setEntities] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/read`);
        console.log(response.data);
        setEntities(response.data.data);
        setLoading(false);
      }catch(error){
        console.log('Error fetching entities:', error);
        setError('Failed to fetch data.  Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  },[]);


  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    const filteredEntity = entities.find(entity => entity.city === place || entity.state === place);
    if (filteredEntity) {
      setFilteredHospitals(filteredEntity.hospitals.length ? filteredEntity.hospitals : filteredEntity.clinics);
    } else {
      setFilteredHospitals([]);
    }
  };

  return (
    <div className='place'>
      <h1>Choose your location</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='placeContainer'>
        {entities.map((entity) => (
          <div key={entity._id} className='placeItem' onClick={() => handlePlaceClick(entity.city)}>
            <p><strong>City:</strong> {entity.city}</p>
            <p><strong>State:</strong> {entity.state}</p>
          </div>
        ))}
      </div>
      )}
      {selectedPlace && entities.length > 0 && (
        <div>
          <h2>Hospitals in {selectedPlace}</h2>
          <div className='hospitalDataContainer'>
            {filteredHospitals.map((hospital, index) => (
              <div key={index} className='hospital'>
                <p><strong>Name:</strong> {hospital.name}</p>
                <p><strong>Address:</strong> {hospital.address.street}, {hospital.address.area}, {hospital.address.pin_code}</p>
                <p><strong>Contact:</strong> {hospital.address.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospital;

