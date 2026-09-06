// Substitua o conteúdo das aspas abaixo pelas suas credenciais do Supabase
const SUPABASE_URL = 'https://odspcuyuwgxljbuqiwjv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OKNl6-y_I-5EASJoBX6sIA_WT9-ZUYh';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para buscar e exibir os itens do banco de dados
async function carregarCatalogo() {
  const containerGrid = document.getElementById('catalog-grid');

  try {
    // Busca todos os dados da tabela 'conteudos'
    const { data, error } = await supabaseClient.from('conteudos').select('*');

    if (error) {
      console.error('Erro ao buscar dados:', error);
      return;
    }

    // Limpa a div antes de preencher
    containerGrid.innerHTML = '';

    // Cria o card no HTML para cada item do banco
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

      // Ação de clique para ir ao player futuro
      cardElement.addEventListener('click', () => {
        alert(`Você clicou em: ${item.titulo}`);
      });

      containerGrid.appendChild(cardElement);
    });

  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

// Roda a função quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', carregarCatalogo);
