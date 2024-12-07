import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

const App = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [reclamacoes, setReclamacoes] = useState([]);

  // Fetch data from the backend
  const fetchReclamacoes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reclamacoes');
      setReclamacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar reclamações:', error);
    }
  };

  // Submit form to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nome || !idade || !endereco || !descricao) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await axios.post('http://localhost:3001/reclamacoes', { nome, idade, endereco, descricao });
      setNome('');
      setIdade('');
      setEndereco('');
      setDescricao('');
      fetchReclamacoes();
    } catch (error) {
      console.error('Erro ao registrar reclamação:', error);
    }
  };

  // Delete a record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/reclamacoes/${id}`);
      fetchReclamacoes();
    } catch (error) {
      console.error('Erro ao remover reclamação:', error);
    }
  };

  // Initialize or update DataTable
  useEffect(() => {
    // Initialize or update the DataTable
    if ($.fn.DataTable.isDataTable('#reclamacoesTable')) {
      $('#reclamacoesTable').DataTable().clear().rows.add(reclamacoes).draw();
    } else {
      const table = $('#reclamacoesTable').DataTable({
        data: reclamacoes,
        columns: [
          { title: 'ID', data: 'id' },
          { title: 'Nome', data: 'nome' },
          { title: 'Idade', data: 'idade' },
          { title: 'Endereço', data: 'endereco' },
          { title: 'Descrição', data: 'descricao' },
          {
            title: 'Ações',
            data: null,
            render: (data) =>
              `<button class="btn btn-danger btn-sm btn-delete" data-id="${data.id}">Remover</button>`,
          },
        ],
        destroy: true, // Allows reinitialization
      });

      // Event delegation for delete buttons
      $('#reclamacoesTable tbody').on('click', '.btn-delete', function () {
        const id = $(this).data('id'); // Get the ID from the button's data attribute
        handleDelete(id);
      });
    }
  }, [reclamacoes]);

  // Fetch data on component load
  useEffect(() => {
    fetchReclamacoes();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cadastro de Reclamações</h1>

      {/* Form Section */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                id="nome"
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="idade" className="form-label">Idade</label>
              <input
                id="idade"
                type="number"
                className="form-control"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input
                id="endereco"
                type="text"
                className="form-control"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição</label>
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
        </div>
      </div>

      {/* Table Section */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Reclamações Registradas</h5>
          <table id="reclamacoesTable" className="table table-striped"></table>
        </div>
      </div>
    </div>
  );
};

export default App;
