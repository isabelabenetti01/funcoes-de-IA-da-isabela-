// Estado da aplicação
let draggedElement = null;
let correctCount = 0;
let totalItems = 0;

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', function() {
    initializeDragAndDrop();
    totalItems = document.querySelectorAll('.item').length;
});

// Funções de Drag and Drop
function initializeDragAndDrop() {
    const items = document.querySelectorAll('.item');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Event listeners para os itens
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    // Event listeners para as zonas de drop
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

// Ao começar a arrastar
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

// Ao terminar de arrastar
function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove a classe 'over' de todas as zonas
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('over');
    });
}

// Ao passar sobre a zona de drop
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

// Ao entrar na zona de drop
function handleDragEnter(e) {
    if (this.classList.contains('drop-zone')) {
        this.classList.add('over');
    }
}

// Ao sair da zona de drop
function handleDragLeave(e) {
    if (e.target === this) {
        this.classList.remove('over');
    }
}

// Ao soltar no drop zone
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (!draggedElement) return;

    // Encontrar a categoria (id do parent)
    const categoryBox = this.closest('.category-box');
    if (!categoryBox) return;

    const categoryId = categoryBox.id;
    const itemCategory = draggedElement.dataset.category;

    // Validar se foi colocado na categoria correta
    const isCorrect = categoryId === itemCategory;

    if (isCorrect) {
        // Remover item original
        const itemText = draggedElement.textContent;
        draggedElement.style.display = 'none';

        // Criar novo item no drop zone
        const droppedItem = document.createElement('div');
        droppedItem.className = 'dropped-item';
        droppedItem.textContent = itemText;
        this.appendChild(droppedItem);

        correctCount++;
        showFeedback('✅ Correto!', 'success');
    } else {
        showFeedback('❌ Incorreto! Tente novamente.', 'error');
        
        // Voltar o item para a posição original com animação
        draggedElement.style.animation = 'none';
        setTimeout(() => {
            draggedElement.style.animation = '';
        }, 10);
    }

    // Atualizar contadores
    updateCounts();

    // Verificar se completou
    checkCompletion();

    this.classList.remove('over');
    return false;
}

// Atualizar contadores de itens
function updateCounts() {
    const categories = document.querySelectorAll('.category-box');
    
    categories.forEach(category => {
        const dropZone = category.querySelector('.drop-zone');
        const count = dropZone.querySelectorAll('.dropped-item').length;
        const countElement = category.querySelector('.count');
        countElement.textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;
    });
}

// Verificar se o jogo foi completado
function checkCompletion() {
    const allItems = document.querySelectorAll('.item');
    const hiddenItems = document.querySelectorAll('.item[style*="display: none"]');

    if (hiddenItems.length === allItems.length && allItems.length > 0) {
        completeGame();
    }
}

// Análise da IA quando completa
function completeGame() {
    setTimeout(() => {
        const analysisResult = document.getElementById('analysisResult');
        const percentage = Math.round((correctCount / totalItems) * 100);
        
        let message = '';
        let className = '';

        if (percentage === 100) {
            message = `🎉 Perfeito! Você acertou todas as ${totalItems} classificações! A IA reconheceu 100% de precisão.`;
            className = 'result-correct';
        } else if (percentage >= 80) {
            message = `🌟 Excelente! ${correctCount}/${totalItems} itens classificados corretamente (${percentage}% de precisão).`;
            className = 'result-correct';
        } else if (percentage >= 60) {
            message = `👍 Bom trabalho! ${correctCount}/${totalItems} itens corretos (${percentage}% de precisão). Tente melhorar!`;
            className = 'result-correct';
        } else {
            message = `💪 Continue tentando! ${correctCount}/${totalItems} itens corretos (${percentage}% de precisão).`;
            className = 'result-incorrect';
        }

        analysisResult.innerHTML = `<p class="${className}">${message}</p>`;
    }, 300);
}

// Mostrar feedback
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    const feedbackItem = document.createElement('div');
    feedbackItem.className = `feedback-item ${type}`;
    feedbackItem.textContent = message;
    
    feedback.appendChild(feedbackItem);

    // Remove o feedback após 2 segundos
    setTimeout(() => {
        feedbackItem.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            feedbackItem.remove();
        }, 300);
    }, 2000);
}

// Resetar o jogo
function resetGame() {
    // Resetar variáveis
    correctCount = 0;
    draggedElement = null;

    // Remover itens colocados
    document.querySelectorAll('.dropped-item').forEach(item => {
        item.remove();
    });

    // Mostrar todos os itens novamente
    document.querySelectorAll('.item').forEach(item => {
        item.style.display = '';
    });

    // Resetar análise
    document.getElementById('analysisResult').innerHTML = '<p>Arraste os itens para começar a análise...</p>';

    // Atualizar contadores
    updateCounts();

    showFeedback('🔄 Jogo resetado!', 'success');
}

// Análise com IA simulada
function performAIAnalysis() {
    const categories = document.querySelectorAll('.category-box');
    const analysis = [];

    categories.forEach(category => {
        const categoryName = category.querySelector('h3').textContent;
        const itemCount = category.querySelector('.count').textContent;
        analysis.push(`${categoryName}: ${itemCount}`);
    });

    return analysis;
}
