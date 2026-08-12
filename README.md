# 🤖 IA Classificador - Drag & Drop

Um site interativo de inteligência artificial que permite arrastar e soltar itens em categorias corretas. A IA valida as classificações e fornece análise de precisão.

## 🎯 Funcionalidades

- ✅ **Drag & Drop Intuitivo**: Arraste itens entre categorias
- 🤖 **Análise da IA**: Validação automática de classificações
- 📊 **Estatísticas em Tempo Real**: Contador de acertos e percentual de precisão
- 🎨 **Design Moderno**: Interface responsiva e atraente
- 💬 **Feedback Instantâneo**: Mensagens de sucesso e erro
- 🔄 **Função Reset**: Reinicie o jogo a qualquer momento

## 📁 Estrutura do Projeto

```
.
├── index.html      # Estrutura HTML
├── styles.css      # Estilos e responsividade
├── script.js       # Lógica de drag & drop e IA
└── README.md       # Este arquivo
```

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** em seu navegador
2. **Arraste os itens** do painel esquerdo para as categorias corretas
3. **A IA vai validar** se você colocou na categoria correta
4. **Veja sua pontuação** na seção de análise
5. **Clique em "Resetar"** para começar novamente

## 📋 Categorias Disponíveis

### 🍎 Frutas
- Maçã
- Banana
- Laranja
- Uva

### 🐾 Animais
- Gato
- Cachorro
- Borboleta
- Leão

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados com gradientes e animações
- **JavaScript** - Lógica de drag & drop e validação
- **API Drag and Drop** - Funcionalidade nativa do navegador

## ⚙️ Como Personalizar

### Adicionar Novos Itens

Edite o arquivo `index.html` e adicione na seção `items-container`:

```html
<div class="item" draggable="true" data-category="categoria">
    🎯 Nome do Item
</div>
```

### Adicionar Novas Categorias

1. Adicione uma nova `category-box` no HTML:
```html
<div class="category-box" id="sua-categoria">
    <h3>🎯 Sua Categoria</h3>
    <div class="drop-zone"></div>
    <p class="count">0 itens</p>
</div>
```

2. Use o mesmo `id` no atributo `data-category` dos itens

## 🌐 Responsividade

O site é totalmente responsivo e se adapta para:
- 📱 Dispositivos móveis
- 📱 Tablets
- 🖥️ Desktops

## 🎓 Aprendizado

Este projeto demonstra:
- Implementação de Drag & Drop API
- Manipulação do DOM com JavaScript
- Validação de dados em tempo real
- Design responsivo com CSS Grid
- Animações CSS
- Feedback de usuário

## 📝 Licença

Projeto educacional - Sinta-se livre para modificar e melhorar!

---

**Desenvolvido por:** Isabela Benetti 🚀
