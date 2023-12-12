import React, { useState, useEffect } from 'react';
import api from '../api';

const EditarReservaKindle = ({ idReserva }) => {
  const [reserva, setReserva] = useState({
    idKindle: '',
    nome: '',
    turma: '',
    data: '',
    horario_inicial: '',
    horario_final: '',
  });

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await api.get(`/kindle/${idReserva}`);
        setReserva(response.data);
      } catch (error) {
        console.error('Erro ao buscar reserva de kindle para edição:', error);
      }
    };

    fetchReserva();
  }, [idReserva]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados a serem enviados para atualização:', reserva); // Adicione essa linha para verificar os dados
  
    try {
      await api.put(`/kindle/${idReserva}`, reserva);
      console.log(`Reserva com ID ${idReserva} foi atualizada com sucesso.`);
    } catch (error) {
      console.error('Erro ao editar reserva de kindle:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({
      ...reserva,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="idKindle" value={reserva.idKindle} onChange={handleChange} />
      <input type="text" name="nome" value={reserva.nome} onChange={handleChange} />
      <input type="text" name="turma" value={reserva.turma} onChange={handleChange} />
      <input type="date" name="data" value={reserva.data} onChange={handleChange} />
      <input type="time" name="horario_inicial" value={reserva.horario_inicial} onChange={handleChange} />
      <input type="time" name="horario_final" value={reserva.horario_final} onChange={handleChange} />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditarReservaKindle;
