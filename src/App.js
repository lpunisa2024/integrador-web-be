import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [descricao, setDescricao] = useState('');
  const [reclamacoes, setReclamacoes] = useState([]);
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    fetchReclamacoes();
  }, []);

  const fetchReclamacoes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reclamacoes');
      setReclamacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar reclamações:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!descricao.trim()) return;

    try {
      await axios.post('http://localhost:3001/reclamacoes', { descricao });
      setSucesso('Reclamação registrada com sucesso!');
      setDescricao('');
      fetchReclamacoes();
    } catch (error) {
      console.error('Erro ao registrar reclamação:', error);
      setSucesso('Erro ao registrar reclamação.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cadastro de Reclamações</h1>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição da Reclamação</label>
              <textarea
                id="descricao"
                className="form-control"
                rows="3"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
          {sucesso && <p className="mt-3 text-success">{sucesso}</p>}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Reclamações Registradas</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {reclamacoes.length > 0 ? (
                reclamacoes.map((reclamacao) => (
                  <tr key={reclamacao.id}>
                    <td>{reclamacao.id}</td>
                    <td>{reclamacao.descricao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">Nenhuma reclamação registrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
