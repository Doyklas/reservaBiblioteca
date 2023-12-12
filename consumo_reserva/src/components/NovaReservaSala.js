import React, { useState } from 'react';
import api from '../api';

const NovaReservaSala = () => {
  const [novaReserva, setNovaReserva] = useState({
    idSala: 1,
    nome: '',
    qtd_pessoas: '',
    turma: '',
    motivo: '',
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
        setError('A hora de início deve ser anterior à hora final da reserva.');
        return;
      }
    }

    try {
      const response = await api.post('/salagrupo', novaReserva);
      console.log('Reserva de sala criada:', response.data);
      // Limpar campos ou fazer outras ações após a criação bem-sucedida
    } catch (error) {
      console.error('Erro ao criar reserva de sala:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar e ajustar dados conforme necessário (se desejado)
    setNovaReserva({
      ...novaReserva,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input type="number" name="idSala" min="1" max="2" placeholder="idSala" onChange={handleChange} />
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} />
      <input type="number" name="qtd_pessoas" min="1" max="10" placeholder="Quantidade de Pessoas" onChange={handleChange} />
      <input type="text" name="turma" placeholder="Turma" onChange={handleChange} />
      <input type="text" name="motivo" placeholder="Motivo" onChange={handleChange} />
      <input type="date" name="data" onChange={handleChange} />
      <input type="time" name="horario_inicial" onChange={handleChange} />
      <input type="time" name="horario_final" onChange={handleChange} />
      {/* Adicione inputs para os outros atributos da reserva de sala */}
      <button type="submit">Criar Reserva de Sala</button>
    </form>
  );
};

export default NovaReservaSala;
