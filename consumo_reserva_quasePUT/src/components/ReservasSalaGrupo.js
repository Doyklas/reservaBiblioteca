import React, { useState, useEffect } from 'react';
import api from '../api';

const ReservasSalasGrupo = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get('/salagrupo');
        setReservas(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas de salas de grupo:', error);
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
    // Lógica para edição: redirecionar para página de edição ou abrir um modal, por exemplo
    // Implemente a lógica de edição aqui
    console.log(`Editar reserva com ID ${_id}`);
  };

  return (
    <div>
      <h2>Reservas de Salas de Grupo</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.idSala}>
            <strong>ID Sala:</strong> {reserva.idSala}<br />
            <strong>Nome:</strong> {reserva.nome}<br />
            <strong>Quantidade de Pessoas:</strong> {reserva.qtd_pessoas}<br />
            <strong>Turma:</strong> {reserva.turma}<br />
            <strong>Motivo:</strong> {reserva.motivo}<br />
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

export default ReservasSalasGrupo;
