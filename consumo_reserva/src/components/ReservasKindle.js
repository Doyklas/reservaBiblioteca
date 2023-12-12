import React, { useState, useEffect } from 'react';
import api from '../api';
import EditarReservaKindle from './EditarReservaKindle';

const ReservasKindle = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get('/kindle');
        setReservas(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas de kindles:', error);
      }
    };

    fetchReservas();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await api.delete(`/kindle/${_id}`);
      setReservas(prevReservas => prevReservas.filter(reserva => reserva._id !== _id));
      console.log(`Reserva com ID ${_id} foi deletada.`);
    } catch (error) {
      console.error('Erro ao deletar reserva:', error);
    }
  };
  
  

  const handleEdit = (_id) => {
    <EditarReservaKindle />
    console.log(`Editar reserva com ID ${_id}`);
  };

  return (
    <div>
      <h2>Reservas de Kindles</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.idKindle}>
            <strong>ID Kindle:</strong> {reserva.idKindle}<br />
            <strong>Nome:</strong> {reserva.nome}<br />
            <strong>Turma:</strong> {reserva.turma}<br />
            <strong>Data:</strong> {reserva.data}<br />
            <strong>Horário Inicial:</strong> {reserva.horario_inicial}<br />
            <strong>Horário Final:</strong> {reserva.horario_final}<br />
            <button onClick={() => handleEdit(reserva._id)}>Editar</button>
            <button onClick={() => handleDelete(reserva._id)}>Deletar</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservasKindle;
