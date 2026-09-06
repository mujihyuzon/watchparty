const SUPABASE_URL = 'https://odspcuyuwgxljbuqiwjv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OKNl6-y_I-5EASJoBX6sIA_WT9-ZUYh';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarCatalogo(categoriaFiltro = 'Todos') {
  const containerGrid = document.getElementById('catalog-grid');
  if (!containerGrid) return;
  
  containerGrid.innerHTML = '<p style="color: #aaa;">Carregando catálogo...</p>';

  try {
    let query = supabaseClient.from('conteudos').select('*');

    if (categoriaFiltro !== 'Todos') {
      query = query.eq('categoria', categoriaFiltro);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro no Supabase:', error);
      containerGrid.innerHTML = '<p style="color: #ff0055;">Erro ao carregar os dados.</p>';
      return;
    }

    if (!data || data.length === 0) {
      containerGrid.innerHTML = '<p style="color: #aaa;">Nenhum item encontrado nesta categoria.</p>';
      return;
    }

    containerGrid.innerHTML = '';

    data.forEach(item => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      
      cardElement.innerHTML = `
        <img src="${item.capa}" alt="${item.titulo}">
        <div class="card-info">
          <div class="card-title">${item.titulo}</div>
          <div class="card-type">${item.categoria}</div>
        </div>
      `;

      cardElement.addEventListener('click', () => {
        alert(`Você escolheu: ${item.titulo}`);
      });

      containerGrid.appendChild(cardElement);
    });

  } catch (err) {
    console.error('Erro inesperado:', err);
    containerGrid.innerHTML = '<p style="color: #ff0055;">Erro ao conectar com o banco de dados.</p>';
  }
}

function configurarNavegacao() {
  const linksNav = document.querySelectorAll('.navbar nav a');

  linksNav.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      linksNav.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const categoriaSelecionada = link.textContent.trim();

      if (categoriaSelecionada === 'Início') {
        carregarCatalogo('Todos');
      } else {
        carregarCatalogo(categoriaSelecionada);
      }
    });
  });

  const btnLogin = document.getElementById('btn-login');
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      alert('Em breve: tela de Login e Cadastro!');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCatalogo();
  configurarNavegacao();
});
