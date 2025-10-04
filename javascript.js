// Formatação de CPF
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

// Formatação de Telefone
function formatTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
}

// Formatação de data para exibição
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Validação e geração do relatório
function validateAndGenerate() {
    const form = document.getElementById('funeralForm');
    if (!form.checkValidity()) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    generateReport();
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('report').style.display = 'block';
    
    // Remove botões existentes se houver
    const existingButtons = document.querySelectorAll('.report-button');
    existingButtons.forEach(button => button.remove());
    
    // Adiciona botão de impressão
    const printButton = document.createElement('button');
    printButton.textContent = 'Imprimir Relatório';
    printButton.className = 'print-button report-button';
    printButton.onclick = () => window.print();
    document.getElementById('report').appendChild(printButton);
    
    // Adiciona botão para voltar ao formulário
    const backButton = document.createElement('button');
    backButton.textContent = 'Voltar ao Formulário';
    backButton.className = 'report-button';
    backButton.style.marginTop = '10px';
    backButton.onclick = () => {
        document.querySelector('.form-container').style.display = 'block';
        document.getElementById('report').style.display = 'none';
    };
    document.getElementById('report').appendChild(backButton);
}

// Geração do relatório
function generateReport() {
    // Atualiza a data atual
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();

    // Lista de campos para copiar
    const fields = [
        'nome', 'cpf', 'dataFalecimento', 'horarioFalecimento', 'localFalecimento', 'causaMorte',
        'nomeContratante', 'cpfContratante', 'telefoneContratante', 'enderecoContratante',
        'tipoUrna', 'localVelorio', 'horarioVelorio', 'localSepultamento'
    ];

    // Copia os valores para o relatório
    fields.forEach(field => {
        const value = document.getElementById(field).value;
        const reportElement = document.getElementById(`report-${field}`);
        if (reportElement) {
            if (field === 'dataFalecimento') {
                reportElement.textContent = formatDate(value);
            } else {
                reportElement.textContent = value;
            }
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Define a data máxima como hoje
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataFalecimento').max = today;
});