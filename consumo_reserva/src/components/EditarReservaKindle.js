import React, { useState, useEffect } from 'react';
import api from '../api';

const EditarReservaKindle = ({ _id }) => {
  const [reserva, setReserva] = useState({
    _id: '',
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
        const response = await api.get(`/kindle/${_id}`);
        setReserva(response.data);
      } catch (error) {
        console.error('Erro ao buscar reserva de kindle para edição:', error);
      }
    };

    fetchReserva();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/kindle/${_id}`, reserva);
      console.log(`Reserva com ID ${_id} foi atualizada com sucesso.`);
      // Limpar campos ou fazer outras ações após a atualização bem-sucedida
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
      <input type="number" name="idKindle" min="1" max="4" placeholder="idKindle" value={reserva.idKindle} onChange={handleChange} />
      <input type="text" name="nome" placeholder="Nome" value={reserva.nome} onChange={handleChange} />
      <input type="text" name="turma" placeholder="Turma" value={reserva.turma} onChange={handleChange} />
      <input type="date" name="data" value={reserva.data} onChange={handleChange} />
      <input type="time" name="horario_inicial" value={reserva.horario_inicial} onChange={handleChange} />
      <input type="time" name="horario_final" value={reserva.horario_final} onChange={handleChange} />
      {/* Adicione inputs para os outros atributos da reserva */}
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditarReservaKindle;
