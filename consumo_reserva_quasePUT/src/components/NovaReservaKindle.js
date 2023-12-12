import React, { useState } from 'react';
import api from '../api';

const NovaReservaKindle = () => {
  const [novaReserva, setNovaReserva] = useState({
    idKindle: 1,
    nome: '',
    turma: '',
    data: '',
    horario_inicial: '',
    horario_final: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar se a data de início é menor que a data final
    if (novaReserva.data && novaReserva.horario_inicial && novaReserva.horario_final) {
      const inicio = new Date(`${novaReserva.data}T${novaReserva.horario_inicial}`);
      const fim = new Date(`${novaReserva.data}T${novaReserva.horario_final}`);

      if (inicio >= fim) {
        setError('A data de início deve ser anterior à data final da reserva.');
        return;
      }
    }

    try {
      const response = await api.post('/kindle', novaReserva);
      console.log('Reserva de kindle criada:', response.data);
      // Limpar campos ou fazer outras ações após a criação bem-sucedida
    } catch (error) {
      console.error('Erro ao criar reserva de kindle:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaReserva({
      ...novaReserva,
      [name]: value,
    });
    setError(''); // Limpar mensagem de erro ao mudar os valores
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input type="number" name="idKindle" min="1" max="4" placeholder="idKindle" onChange={handleChange} />
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} />
      <input type="text" name="turma" placeholder="Turma" onChange={handleChange} />
      <input type="date" name="data" onChange={handleChange} />
      <input type="time" name="horario_inicial" onChange={handleChange} />
      <input type="time" name="horario_final" onChange={handleChange} />
      {/* Adicione inputs para os outros atributos da reserva */}
      <button type="submit">Criar Reserva</button>
    </form>
  );
};

export default NovaReservaKindle;
