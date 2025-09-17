// Financial JavaScript for MVP Lazaro System

class FinancialManager {
    constructor() {
        this.financialData = {
            todayRevenue: 0,
            monthlyRevenue: 0,
            pendingPayments: 0,
            totalReceivables: 0
        };
        
        this.transactions = [];
        this.payouts = [];
        
        this.init();
    }

    init() {
        this.loadFinancialPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadFinancialPage() {
        const financialPage = document.getElementById('financial-page');
        if (!financialPage) return;

        financialPage.innerHTML = `
            <div class="financial-container">
                <div class="financial-card">
                    <div class="financial-header">
                        <div class="financial-title">Recebíveis</div>
                        <div class="financial-actions">
                            <button class="btn btn-sm btn-outline" onclick="financialManager.exportReceivables()">
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="financialManager.addReceivable()">
                                <i class="fas fa-plus"></i>
                                Adicionar
                            </button>
                        </div>
                    </div>
                    <div class="financial-content">
                        <div class="financial-summary">
                            <div class="financial-summary-item">
                                <div class="financial-summary-value positive" id="todayRevenue">R$ 0</div>
                                <div class="financial-summary-label">Receita Hoje</div>
                            </div>
                            <div class="financial-summary-item">
                                <div class="financial-summary-value positive" id="monthlyRevenue">R$ 0</div>
                                <div class="financial-summary-label">Receita Mensal</div>
                            </div>
                            <div class="financial-summary-item">
                                <div class="financial-summary-value negative" id="pendingPayments">R$ 0</div>
                                <div class="financial-summary-label">Pendentes</div>
                            </div>
                            <div class="financial-summary-item">
                                <div class="financial-summary-value positive" id="totalReceivables">R$ 0</div>
                                <div class="financial-summary-label">Total a Receber</div>
                            </div>
                        </div>
                        
                        <table class="financial-table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Paciente</th>
                                    <th>Procedimento</th>
                                    <th>Convênio</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="receivablesTableBody">
                                <!-- Receivables will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="financial-card">
                    <div class="financial-header">
                        <div class="financial-title">Repasses</div>
                        <div class="financial-actions">
                            <button class="btn btn-sm btn-outline" onclick="financialManager.exportPayouts()">
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="financialManager.processPayouts()">
                                <i class="fas fa-calculator"></i>
                                Processar
                            </button>
                        </div>
                    </div>
                    <div class="financial-content">
                        <div class="payouts-summary">
                            <div class="payout-item">
                                <div class="payout-professional">Dr. João Silva</div>
                                <div class="payout-amount">R$ 1.250,00</div>
                                <div class="payout-status pending">Pendente</div>
                            </div>
                            <div class="payout-item">
                                <div class="payout-professional">Dra. Maria Santos</div>
                                <div class="payout-amount">R$ 980,00</div>
                                <div class="payout-status pending">Pendente</div>
                            </div>
                        </div>
                        
                        <table class="financial-table">
                            <thead>
                                <tr>
                                    <th>Profissional</th>
                                    <th>Período</th>
                                    <th>Consultas</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="payoutsTableBody">
                                <!-- Payouts will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.setupFinancialEventListeners();
    }

    setupEventListeners() {
        // This will be called when the financial page is loaded
    }

    setupFinancialEventListeners() {
        // Event listeners for financial features will be set up here
    }

    loadInitialData() {
        this.loadFinancialData();
        this.loadReceivables();
        this.loadPayouts();
        this.updateSummary();
    }

    loadFinancialData() {
        // Mock data - in real app, this would come from API
        this.financialData = {
            todayRevenue: 2450.00,
            monthlyRevenue: 18750.00,
            pendingPayments: 1250.00,
            totalReceivables: 8750.00
        };
    }

    loadReceivables() {
        // Mock data
        this.transactions = [
            {
                id: 1,
                date: '2024-01-15',
                patient: 'Maria Silva Santos',
                procedure: 'Consulta Clínica Geral',
                insurance: 'Unimed',
                amount: 150.00,
                status: 'paid',
                paymentMethod: 'PIX'
            },
            {
                id: 2,
                date: '2024-01-15',
                patient: 'João Santos Oliveira',
                procedure: 'Retorno Cardiologia',
                insurance: 'Bradesco Saúde',
                amount: 200.00,
                status: 'pending',
                paymentMethod: 'Cartão'
            },
            {
                id: 3,
                date: '2024-01-14',
                patient: 'Ana Costa Mendes',
                procedure: 'Teleconsulta',
                insurance: 'SUS',
                amount: 0.00,
                status: 'paid',
                paymentMethod: 'SUS'
            },
            {
                id: 4,
                date: '2024-01-14',
                patient: 'Pedro Oliveira Lima',
                procedure: 'Consulta Dermatologia',
                insurance: 'Amil',
                amount: 180.00,
                status: 'pending',
                paymentMethod: 'Boleto'
            }
        ];

        this.renderReceivables();
    }

    loadPayouts() {
        // Mock data
        this.payouts = [
            {
                id: 1,
                professional: 'Dr. João Silva',
                period: 'Janeiro 2024',
                consultations: 25,
                amount: 3750.00,
                status: 'pending'
            },
            {
                id: 2,
                professional: 'Dra. Maria Santos',
                period: 'Janeiro 2024',
                consultations: 18,
                amount: 2700.00,
                status: 'pending'
            },
            {
                id: 3,
                professional: 'Dr. Pedro Costa',
                period: 'Janeiro 2024',
                consultations: 12,
                amount: 1800.00,
                status: 'paid'
            }
        ];

        this.renderPayouts();
    }

    updateSummary() {
        // Update summary values
        document.getElementById('todayRevenue').textContent = `R$ ${this.financialData.todayRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.getElementById('monthlyRevenue').textContent = `R$ ${this.financialData.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.getElementById('pendingPayments').textContent = `R$ ${this.financialData.pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.getElementById('totalReceivables').textContent = `R$ ${this.financialData.totalReceivables.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    renderReceivables() {
        const tbody = document.getElementById('receivablesTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.transactions.map(transaction => `
            <tr>
                <td>${this.formatDate(transaction.date)}</td>
                <td>${transaction.patient}</td>
                <td>${transaction.procedure}</td>
                <td>${transaction.insurance}</td>
                <td class="financial-amount ${transaction.amount > 0 ? 'positive' : ''}">
                    R$ ${transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span class="status-indicator ${transaction.status}">${this.getStatusText(transaction.status)}</span>
                </td>
                <td>
                    <div class="financial-actions">
                        <button class="btn btn-sm btn-outline" onclick="financialManager.viewTransaction(${transaction.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="financialManager.editTransaction(${transaction.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${transaction.status === 'pending' ? `
                            <button class="btn btn-sm btn-success" onclick="financialManager.markAsPaid(${transaction.id})">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderPayouts() {
        const tbody = document.getElementById('payoutsTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.payouts.map(payout => `
            <tr>
                <td>${payout.professional}</td>
                <td>${payout.period}</td>
                <td>${payout.consultations}</td>
                <td class="financial-amount positive">
                    R$ ${payout.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                    <span class="status-indicator ${payout.status}">${this.getStatusText(payout.status)}</span>
                </td>
                <td>
                    <div class="financial-actions">
                        <button class="btn btn-sm btn-outline" onclick="financialManager.viewPayout(${payout.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${payout.status === 'pending' ? `
                            <button class="btn btn-sm btn-success" onclick="financialManager.processPayout(${payout.id})">
                                <i class="fas fa-money-bill-wave"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Action methods
    addReceivable() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Adicionar Recebível</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="receivableForm">
                        <div class="form-group">
                            <label class="form-label">Paciente</label>
                            <select class="form-control" id="patientSelect" required>
                                <option value="">Selecione um paciente</option>
                                <option value="1">Maria Silva Santos</option>
                                <option value="2">João Santos Oliveira</option>
                                <option value="3">Ana Costa Mendes</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Procedimento</label>
                            <input type="text" class="form-control" id="procedureInput" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Convênio</label>
                            <select class="form-control" id="insuranceSelect" required>
                                <option value="">Selecione o convênio</option>
                                <option value="Unimed">Unimed</option>
                                <option value="Bradesco Saúde">Bradesco Saúde</option>
                                <option value="Amil">Amil</option>
                                <option value="SUS">SUS</option>
                                <option value="Particular">Particular</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Valor</label>
                            <input type="number" class="form-control" id="amountInput" step="0.01" min="0" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Forma de Pagamento</label>
                            <select class="form-control" id="paymentMethodSelect" required>
                                <option value="">Selecione a forma de pagamento</option>
                                <option value="PIX">PIX</option>
                                <option value="Cartão">Cartão</option>
                                <option value="Boleto">Boleto</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="SUS">SUS</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data</label>
                            <input type="date" class="form-control" id="dateInput" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="financialManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="financialManager.saveReceivable()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set default date
        document.getElementById('dateInput').value = new Date().toISOString().split('T')[0];
    }

    saveReceivable() {
        const form = document.getElementById('receivableForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const receivable = {
            id: Date.now(),
            date: document.getElementById('dateInput').value,
            patient: document.getElementById('patientSelect').selectedOptions[0].text,
            procedure: document.getElementById('procedureInput').value,
            insurance: document.getElementById('insuranceSelect').value,
            amount: parseFloat(document.getElementById('amountInput').value),
            status: 'pending',
            paymentMethod: document.getElementById('paymentMethodSelect').value
        };

        this.transactions.push(receivable);
        this.renderReceivables();
        this.closeModal();
        app.showToast('Recebível adicionado com sucesso', 'success');
    }

    markAsPaid(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        if (confirm('Marcar este recebível como pago?')) {
            transaction.status = 'paid';
            this.renderReceivables();
            app.showToast('Recebível marcado como pago', 'success');
        }
    }

    processPayouts() {
        const pendingPayouts = this.payouts.filter(p => p.status === 'pending');
        
        if (pendingPayouts.length === 0) {
            app.showToast('Não há repasses pendentes', 'info');
            return;
        }

        if (confirm(`Processar ${pendingPayouts.length} repasse(s) pendente(s)?`)) {
            pendingPayouts.forEach(payout => {
                payout.status = 'paid';
            });
            
            this.renderPayouts();
            app.showToast(`${pendingPayouts.length} repasse(s) processado(s)`, 'success');
        }
    }

    processPayout(payoutId) {
        const payout = this.payouts.find(p => p.id === payoutId);
        if (!payout) return;

        if (confirm(`Processar repasse de ${payout.professional} no valor de R$ ${payout.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}?`)) {
            payout.status = 'paid';
            this.renderPayouts();
            app.showToast('Repasse processado com sucesso', 'success');
        }
    }

    viewTransaction(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        app.showToast(`Visualizando transação de ${transaction.patient}`, 'info');
    }

    editTransaction(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        app.showToast(`Editando transação de ${transaction.patient}`, 'info');
    }

    viewPayout(payoutId) {
        const payout = this.payouts.find(p => p.id === payoutId);
        if (!payout) return;

        app.showToast(`Visualizando repasse de ${payout.professional}`, 'info');
    }

    exportReceivables() {
        app.showToast('Exportando recebíveis...', 'info');
    }

    exportPayouts() {
        app.showToast('Exportando repasses...', 'info');
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    // Utility methods
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    getStatusText(status) {
        const statusMap = {
            'paid': 'Pago',
            'pending': 'Pendente',
            'cancelled': 'Cancelado'
        };
        return statusMap[status] || status;
    }
}

// Initialize financial manager when financial page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('financial-page')) {
        window.financialManager = new FinancialManager();
    }
});

// Override the loadFinancial method in main.js
if (window.app) {
    window.app.loadFinancial = function() {
        if (!window.financialManager) {
            window.financialManager = new FinancialManager();
        }
    };
}
