// Insurance (Convênios/TISS) JavaScript for MVP Lazaro System

class InsuranceManager {
    constructor() {
        this.guides = [];
        this.batches = [];
        this.insuranceCompanies = [];
        
        this.init();
    }

    init() {
        this.loadInsurancePage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadInsurancePage() {
        const insurancePage = document.getElementById('insurance-page');
        if (!insurancePage) return;

        insurancePage.innerHTML = `
            <div class="insurance-container">
                <div class="insurance-header">
                    <div class="insurance-title">
                        <h1>Convênios e TISS</h1>
                    </div>
                    <div class="insurance-actions">
                        <button class="btn btn-outline" onclick="insuranceManager.exportTISS()">
                            <i class="fas fa-download"></i>
                            Exportar TISS
                        </button>
                        <button class="btn btn-primary" onclick="insuranceManager.createGuide()">
                            <i class="fas fa-plus"></i>
                            Nova Guia
                        </button>
                    </div>
                </div>
                
                <div class="insurance-content">
                    <div class="insurance-section">
                        <div class="insurance-section-header">
                            <i class="fas fa-file-medical"></i>
                            Guias TISS
                        </div>
                        <div class="insurance-section-content">
                            <div class="guide-form">
                                <div class="guide-form-row">
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">Tipo de Guia</label>
                                        <select class="guide-form-input" id="guideType">
                                            <option value="consulta">Consulta</option>
                                            <option value="sp">SP/SADT</option>
                                            <option value="internacao">Internação</option>
                                        </select>
                                    </div>
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">Convênio</label>
                                        <select class="guide-form-input" id="guideInsurance">
                                            <option value="">Selecione o convênio</option>
                                            <option value="unimed">Unimed</option>
                                            <option value="bradesco">Bradesco Saúde</option>
                                            <option value="amil">Amil</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="guide-form-row">
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">Paciente</label>
                                        <input type="text" class="guide-form-input" id="guidePatient" placeholder="Nome do paciente">
                                    </div>
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">CPF</label>
                                        <input type="text" class="guide-form-input" id="guideCPF" placeholder="000.000.000-00">
                                    </div>
                                </div>
                                
                                <div class="guide-form-row">
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">Procedimento</label>
                                        <input type="text" class="guide-form-input" id="guideProcedure" placeholder="Código TUSS">
                                    </div>
                                    <div class="guide-form-group">
                                        <label class="guide-form-label">Data</label>
                                        <input type="date" class="guide-form-input" id="guideDate">
                                    </div>
                                </div>
                                
                                <div class="guide-actions">
                                    <button class="btn btn-outline" onclick="insuranceManager.clearGuideForm()">
                                        <i class="fas fa-eraser"></i>
                                        Limpar
                                    </button>
                                    <button class="btn btn-primary" onclick="insuranceManager.generateGuide()">
                                        <i class="fas fa-file-medical"></i>
                                        Gerar Guia
                                    </button>
                                </div>
                            </div>
                            
                            <div class="guides-list" id="guidesList">
                                <!-- Guides will be loaded here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="insurance-section">
                        <div class="insurance-section-header">
                            <i class="fas fa-layer-group"></i>
                            Lotes TISS
                        </div>
                        <div class="insurance-section-content">
                            <div class="batch-actions">
                                <button class="btn btn-outline" onclick="insuranceManager.createBatch()">
                                    <i class="fas fa-plus"></i>
                                    Novo Lote
                                </button>
                                <button class="btn btn-outline" onclick="insuranceManager.validateBatch()">
                                    <i class="fas fa-check-circle"></i>
                                    Validar Lote
                                </button>
                            </div>
                            
                            <div class="batch-list" id="batchList">
                                <!-- Batches will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupInsuranceEventListeners();
    }

    setupEventListeners() {
        // This will be called when the insurance page is loaded
    }

    setupInsuranceEventListeners() {
        // Set default date
        document.getElementById('guideDate').value = new Date().toISOString().split('T')[0];
    }

    loadInitialData() {
        this.loadGuides();
        this.loadBatches();
        this.renderGuides();
        this.renderBatches();
    }

    loadGuides() {
        // Mock data
        this.guides = [
            {
                id: 1,
                type: 'consulta',
                insurance: 'Unimed',
                patient: 'Maria Silva Santos',
                cpf: '123.456.789-00',
                procedure: 'Consulta Clínica Geral',
                tussCode: '31001013',
                date: '2024-01-15',
                status: 'generated',
                batchId: null
            },
            {
                id: 2,
                type: 'sp',
                insurance: 'Bradesco Saúde',
                patient: 'João Santos Oliveira',
                cpf: '987.654.321-00',
                procedure: 'Eletrocardiograma',
                tussCode: '40301012',
                date: '2024-01-14',
                status: 'in_batch',
                batchId: 1
            },
            {
                id: 3,
                type: 'consulta',
                insurance: 'Amil',
                patient: 'Ana Costa Mendes',
                cpf: '456.789.123-00',
                procedure: 'Consulta Cardiologia',
                tussCode: '31001014',
                date: '2024-01-13',
                status: 'sent',
                batchId: 1
            }
        ];
    }

    loadBatches() {
        // Mock data
        this.batches = [
            {
                id: 1,
                name: 'Lote Janeiro 2024 - Unimed',
                insurance: 'Unimed',
                date: '2024-01-15',
                guidesCount: 15,
                totalValue: 2250.00,
                status: 'sent',
                xmlGenerated: true
            },
            {
                id: 2,
                name: 'Lote Janeiro 2024 - Bradesco',
                insurance: 'Bradesco Saúde',
                date: '2024-01-14',
                guidesCount: 8,
                totalValue: 1200.00,
                status: 'pending',
                xmlGenerated: false
            }
        ];
    }

    renderGuides() {
        const guidesList = document.getElementById('guidesList');
        if (!guidesList) return;

        guidesList.innerHTML = this.guides.map(guide => `
            <div class="guide-item">
                <div class="guide-info">
                    <div class="guide-header">
                        <div class="guide-type">${this.getGuideTypeText(guide.type)}</div>
                        <div class="guide-status">
                            <span class="status-indicator ${guide.status}">${this.getStatusText(guide.status)}</span>
                        </div>
                    </div>
                    <div class="guide-details">
                        <div class="guide-patient">${guide.patient}</div>
                        <div class="guide-meta">
                            <span>${guide.insurance}</span>
                            <span>•</span>
                            <span>${guide.procedure}</span>
                            <span>•</span>
                            <span>${this.formatDate(guide.date)}</span>
                        </div>
                    </div>
                </div>
                <div class="guide-actions">
                    <button class="btn btn-sm btn-outline" onclick="insuranceManager.viewGuide(${guide.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="insuranceManager.editGuide(${guide.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="insuranceManager.downloadGuide(${guide.id})">
                        <i class="fas fa-download"></i>
                    </button>
                    ${guide.status === 'generated' ? `
                        <button class="btn btn-sm btn-primary" onclick="insuranceManager.addToBatch(${guide.id})">
                            <i class="fas fa-layer-group"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderBatches() {
        const batchList = document.getElementById('batchList');
        if (!batchList) return;

        batchList.innerHTML = this.batches.map(batch => `
            <div class="batch-item">
                <div class="batch-info">
                    <div class="batch-name">${batch.name}</div>
                    <div class="batch-meta">
                        <span>${batch.guidesCount} guias</span>
                        <span>•</span>
                        <span>R$ ${batch.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span>•</span>
                        <span>${this.formatDate(batch.date)}</span>
                    </div>
                </div>
                <div class="batch-status">
                    <span class="status-indicator ${batch.status}">${this.getStatusText(batch.status)}</span>
                </div>
                <div class="batch-actions">
                    <button class="btn btn-sm btn-outline" onclick="insuranceManager.viewBatch(${batch.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="insuranceManager.downloadBatchXML(${batch.id})" ${!batch.xmlGenerated ? 'disabled' : ''}>
                        <i class="fas fa-download"></i>
                    </button>
                    ${batch.status === 'pending' ? `
                        <button class="btn btn-sm btn-success" onclick="insuranceManager.sendBatch(${batch.id})">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    // Action methods
    createGuide() {
        const guideType = document.getElementById('guideType').value;
        const insurance = document.getElementById('guideInsurance').value;
        const patient = document.getElementById('guidePatient').value;
        const cpf = document.getElementById('guideCPF').value;
        const procedure = document.getElementById('guideProcedure').value;
        const date = document.getElementById('guideDate').value;

        if (!insurance || !patient || !cpf || !procedure || !date) {
            app.showToast('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        const guide = {
            id: Date.now(),
            type: guideType,
            insurance: insurance,
            patient: patient,
            cpf: cpf,
            procedure: procedure,
            tussCode: this.generateTUSSCode(),
            date: date,
            status: 'generated',
            batchId: null
        };

        this.guides.push(guide);
        this.renderGuides();
        this.clearGuideForm();
        app.showToast('Guia TISS gerada com sucesso', 'success');
    }

    generateGuide() {
        this.createGuide();
    }

    clearGuideForm() {
        document.getElementById('guideType').value = 'consulta';
        document.getElementById('guideInsurance').value = '';
        document.getElementById('guidePatient').value = '';
        document.getElementById('guideCPF').value = '';
        document.getElementById('guideProcedure').value = '';
        document.getElementById('guideDate').value = new Date().toISOString().split('T')[0];
    }

    createBatch() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Novo Lote TISS</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="batchForm">
                        <div class="form-group">
                            <label class="form-label">Convênio</label>
                            <select class="form-control" id="batchInsurance" required>
                                <option value="">Selecione o convênio</option>
                                <option value="unimed">Unimed</option>
                                <option value="bradesco">Bradesco Saúde</option>
                                <option value="amil">Amil</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nome do Lote</label>
                            <input type="text" class="form-control" id="batchName" placeholder="Ex: Lote Janeiro 2024 - Unimed" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data de Referência</label>
                            <input type="date" class="form-control" id="batchDate" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="insuranceManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="insuranceManager.saveBatch()">Criar Lote</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set default date
        document.getElementById('batchDate').value = new Date().toISOString().split('T')[0];
    }

    saveBatch() {
        const form = document.getElementById('batchForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const insurance = document.getElementById('batchInsurance').value;
        const name = document.getElementById('batchName').value;
        const date = document.getElementById('batchDate').value;

        const batch = {
            id: Date.now(),
            name: name,
            insurance: insurance,
            date: date,
            guidesCount: 0,
            totalValue: 0.00,
            status: 'pending',
            xmlGenerated: false
        };

        this.batches.push(batch);
        this.renderBatches();
        this.closeModal();
        app.showToast('Lote TISS criado com sucesso', 'success');
    }

    addToBatch(guideId) {
        const guide = this.guides.find(g => g.id === guideId);
        if (!guide) return;

        const availableBatches = this.batches.filter(b => b.status === 'pending' && b.insurance === guide.insurance);
        
        if (availableBatches.length === 0) {
            app.showToast('Não há lotes disponíveis para este convênio', 'warning');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Adicionar Guia ao Lote</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Selecione o Lote</label>
                        <select class="form-control" id="batchSelect" required>
                            ${availableBatches.map(batch => `
                                <option value="${batch.id}">${batch.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="insuranceManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="insuranceManager.confirmAddToBatch(${guideId})">Adicionar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    confirmAddToBatch(guideId) {
        const batchId = parseInt(document.getElementById('batchSelect').value);
        const guide = this.guides.find(g => g.id === guideId);
        const batch = this.batches.find(b => b.id === batchId);

        if (guide && batch) {
            guide.status = 'in_batch';
            guide.batchId = batchId;
            batch.guidesCount++;
            batch.totalValue += 150.00; // Mock value

            this.renderGuides();
            this.renderBatches();
            this.closeModal();
            app.showToast('Guia adicionada ao lote com sucesso', 'success');
        }
    }

    validateBatch() {
        const pendingBatches = this.batches.filter(b => b.status === 'pending');
        
        if (pendingBatches.length === 0) {
            app.showToast('Não há lotes pendentes para validar', 'info');
            return;
        }

        app.showToast('Validando lotes TISS...', 'info');
        
        // Simulate validation
        setTimeout(() => {
            app.showToast('Validação concluída. Todos os lotes estão válidos.', 'success');
        }, 2000);
    }

    sendBatch(batchId) {
        const batch = this.batches.find(b => b.id === batchId);
        if (!batch) return;

        if (confirm(`Enviar lote "${batch.name}" para o convênio?`)) {
            batch.status = 'sent';
            batch.xmlGenerated = true;
            this.renderBatches();
            app.showToast('Lote enviado com sucesso', 'success');
        }
    }

    viewGuide(guideId) {
        const guide = this.guides.find(g => g.id === guideId);
        if (!guide) return;

        app.showToast(`Visualizando guia de ${guide.patient}`, 'info');
    }

    editGuide(guideId) {
        const guide = this.guides.find(g => g.id === guideId);
        if (!guide) return;

        app.showToast(`Editando guia de ${guide.patient}`, 'info');
    }

    downloadGuide(guideId) {
        const guide = this.guides.find(g => g.id === guideId);
        if (!guide) return;

        app.showToast(`Download da guia de ${guide.patient} iniciado`, 'success');
    }

    viewBatch(batchId) {
        const batch = this.batches.find(b => b.id === batchId);
        if (!batch) return;

        app.showToast(`Visualizando lote "${batch.name}"`, 'info');
    }

    downloadBatchXML(batchId) {
        const batch = this.batches.find(b => b.id === batchId);
        if (!batch) return;

        app.showToast(`Download do XML do lote "${batch.name}" iniciado`, 'success');
    }

    exportTISS() {
        app.showToast('Exportando dados TISS...', 'info');
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    // Utility methods
    getGuideTypeText(type) {
        const typeMap = {
            'consulta': 'Consulta',
            'sp': 'SP/SADT',
            'internacao': 'Internação'
        };
        return typeMap[type] || type;
    }

    getStatusText(status) {
        const statusMap = {
            'generated': 'Gerada',
            'in_batch': 'Em Lote',
            'sent': 'Enviada',
            'pending': 'Pendente',
            'approved': 'Aprovada',
            'rejected': 'Rejeitada'
        };
        return statusMap[status] || status;
    }

    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    generateTUSSCode() {
        // Mock TUSS code generation
        const codes = ['31001013', '31001014', '40301012', '40301015'];
        return codes[Math.floor(Math.random() * codes.length)];
    }
}

// Initialize insurance manager when insurance page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('insurance-page')) {
        window.insuranceManager = new InsuranceManager();
    }
});

// Override the loadInsurance method in main.js
if (window.app) {
    window.app.loadInsurance = function() {
        if (!window.insuranceManager) {
            window.insuranceManager = new InsuranceManager();
        }
    };
}
