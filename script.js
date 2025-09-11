document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade de Curtir
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Alterna a classe 'liked' para mudar o estilo e o ícone
            button.classList.toggle('liked');
            const icon = button.querySelector('i');

            if (button.classList.contains('liked')) {
                icon.classList.remove('far'); // Ícone de coração vazio
                icon.classList.add('fas');    // Ícone de coração preenchido
                console.log('Artigo curtido!');
            } else {
                icon.classList.remove('fas'); // Ícone de coração preenchido
                icon.classList.add('far');    // Ícone de coração vazio
                console.log('Artigo descurtido!');
            }
            // Aqui você pode adicionar lógica para salvar o "curtir" em um backend
        });
    });

    // Funcionalidade de Compartilhar
    const shareButtons = document.querySelectorAll('.share-button');

    shareButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const articleTitle = button.dataset.title;
            const articleUrl = button.dataset.url; // Use a URL real do artigo

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: articleTitle,
                        url: articleUrl
                    });
                    console.log('Artigo compartilhado com sucesso!');
                } catch (error) {
                    console.error('Erro ao compartilhar:', error);
                }
            } else {
                // Fallback para navegadores que não suportam a API Web Share
                alert(`Compartilhe este artigo: ${articleTitle}\n${articleUrl}`);
                // Ou você pode abrir uma nova janela com opções de compartilhamento
                // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
            }
        });
    });

    // Funcionalidade de Pesquisa
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const posts = document.querySelectorAll('.post'); // Seleciona todos os posts

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase(); // Converte para minúsculas para pesquisa sem distinção de maiúsculas/minúsculas

        posts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const description = post.querySelector('.post-description').textContent.toLowerCase();

            // Verifica se o termo de pesquisa está no título ou na descrição
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                post.style.display = 'block'; // Mostra o post
            } else {
                post.style.display = 'none'; // Esconde o post
            }
        });
    };

    searchButton.addEventListener('click', performSearch);

    // Também pesquisa ao pressionar "Enter" no campo de busca
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});