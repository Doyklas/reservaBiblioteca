import React, { useState, useEffect } from 'react';
import api from '../api';

const ReservaEspecifica = ({ tipo, id }) => {
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await api.get(`/${tipo}/${id}`);
        setReserva(response.data);
      } catch (error) {
        console.error(`Erro ao buscar reserva de ${tipo} com ID ${id}:`, error);
      }
    };

    fetchReserva();
  }, [tipo, id]);

  return (
    <div>
      <h2>Reserva Específica de {tipo}</h2>
      {reserva ? (
        <div>
          {Object.entries(reserva).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </p>
            
          ))}
        
        </div>
      ) : (
        <p>Carregando reserva...</p>
      )}
    </div>
  );
};

export default ReservaEspecifica;
