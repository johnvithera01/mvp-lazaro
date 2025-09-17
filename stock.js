// Stock JavaScript for MVP Lazaro System

class StockManager {
    constructor() {
        this.stockItems = [];
        this.stockMovements = [];
        this.alerts = [];
        
        this.init();
    }

    init() {
        this.loadStockPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadStockPage() {
        const stockPage = document.getElementById('stock-page');
        if (!stockPage) return;

        stockPage.innerHTML = `
            <div class="stock-container">
                <div class="stock-header">
                    <div class="stock-title">
                        <h1>Estoque</h1>
                    </div>
                    <div class="stock-actions">
                        <button class="btn btn-outline" onclick="stockManager.exportStock()">
                            <i class="fas fa-download"></i>
                            Exportar
                        </button>
                        <button class="btn btn-primary" onclick="stockManager.addStockItem()">
                            <i class="fas fa-plus"></i>
                            Novo Item
                        </button>
                    </div>
                </div>
                
                <div class="stock-content">
                    <div class="stock-section">
                        <div class="stock-section-header">
                            <i class="fas fa-boxes"></i>
                            Itens em Estoque
                        </div>
                        <div class="stock-section-content">
                            <div class="stock-alerts" id="stockAlerts">
                                <!-- Alerts will be loaded here -->
                            </div>
                            
                            <div class="stock-items" id="stockItems">
                                <!-- Stock items will be loaded here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="stock-section">
                        <div class="stock-section-header">
                            <i class="fas fa-exchange-alt"></i>
                            Movimentações
                        </div>
                        <div class="stock-section-content">
                            <div class="movement-actions">
                                <button class="btn btn-outline" onclick="stockManager.addMovement()">
                                    <i class="fas fa-plus"></i>
                                    Nova Movimentação
                                </button>
                                <button class="btn btn-outline" onclick="stockManager.importMovements()">
                                    <i class="fas fa-upload"></i>
                                    Importar
                                </button>
                            </div>
                            
                            <div class="movements-list" id="movementsList">
                                <!-- Movements will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupStockEventListeners();
    }

    setupEventListeners() {
        // This will be called when the stock page is loaded
    }

    setupStockEventListeners() {
        // Event listeners for stock features will be set up here
    }

    loadInitialData() {
        this.loadStockItems();
        this.loadStockMovements();
        this.loadAlerts();
        this.renderStockItems();
        this.renderStockMovements();
        this.renderAlerts();
    }

    loadStockItems() {
        // Mock data
        this.stockItems = [
            {
                id: 1,
                name: 'Dipirona 500mg',
                category: 'Medicamentos',
                unit: 'Comprimidos',
                currentStock: 45,
                minStock: 50,
                maxStock: 200,
                unitPrice: 0.15,
                supplier: 'Farmácia Central',
                lastMovement: '2024-01-10',
                expiryDate: '2025-06-15'
            },
            {
                id: 2,
                name: 'Seringa 10ml',
                category: 'Material Médico',
                unit: 'Unidades',
                currentStock: 12,
                minStock: 20,
                maxStock: 100,
                unitPrice: 0.85,
                supplier: 'MedSupply',
                lastMovement: '2024-01-12',
                expiryDate: null
            },
            {
                id: 3,
                name: 'Álcool 70%',
                category: 'Material Médico',
                unit: 'Litros',
                currentStock: 8,
                minStock: 5,
                maxStock: 50,
                unitPrice: 12.50,
                supplier: 'Química Brasil',
                lastMovement: '2024-01-08',
                expiryDate: '2024-12-31'
            },
            {
                id: 4,
                name: 'Paracetamol 750mg',
                category: 'Medicamentos',
                unit: 'Comprimidos',
                currentStock: 0,
                minStock: 30,
                maxStock: 150,
                unitPrice: 0.25,
                supplier: 'Farmácia Central',
                lastMovement: '2024-01-05',
                expiryDate: '2025-03-20'
            }
        ];
    }

    loadStockMovements() {
        // Mock data
        this.stockMovements = [
            {
                id: 1,
                itemId: 1,
                itemName: 'Dipirona 500mg',
                type: 'entrada',
                quantity: 100,
                date: '2024-01-10',
                reason: 'Compra',
                user: 'Dr. João Silva',
                batch: 'LOT001'
            },
            {
                id: 2,
                itemId: 1,
                itemName: 'Dipirona 500mg',
                type: 'saida',
                quantity: 55,
                date: '2024-01-12',
                reason: 'Uso em consultas',
                user: 'Enfermeira Maria',
                batch: 'LOT001'
            },
            {
                id: 3,
                itemId: 2,
                itemName: 'Seringa 10ml',
                type: 'entrada',
                quantity: 50,
                date: '2024-01-12',
                reason: 'Compra',
                user: 'Dr. João Silva',
                batch: 'LOT002'
            },
            {
                id: 4,
                itemId: 2,
                itemName: 'Seringa 10ml',
                type: 'saida',
                quantity: 38,
                date: '2024-01-14',
                reason: 'Uso em consultas',
                user: 'Enfermeira Maria',
                batch: 'LOT002'
            }
        ];
    }

    loadAlerts() {
        // Generate alerts based on stock levels
        this.alerts = [];
        
        this.stockItems.forEach(item => {
            if (item.currentStock <= item.minStock) {
                this.alerts.push({
                    id: Date.now() + Math.random(),
                    type: item.currentStock === 0 ? 'critical' : 'low',
                    item: item.name,
                    currentStock: item.currentStock,
                    minStock: item.minStock,
                    message: item.currentStock === 0 ? 
                        `${item.name} está em falta` : 
                        `${item.name} com estoque baixo (${item.currentStock}/${item.minStock})`
                });
            }
            
            // Check expiry dates
            if (item.expiryDate) {
                const expiryDate = new Date(item.expiryDate);
                const today = new Date();
                const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                
                if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
                    this.alerts.push({
                        id: Date.now() + Math.random(),
                        type: 'expiry',
                        item: item.name,
                        expiryDate: item.expiryDate,
                        daysUntilExpiry: daysUntilExpiry,
                        message: `${item.name} vence em ${daysUntilExpiry} dias`
                    });
                } else if (daysUntilExpiry <= 0) {
                    this.alerts.push({
                        id: Date.now() + Math.random(),
                        type: 'expired',
                        item: item.name,
                        expiryDate: item.expiryDate,
                        daysUntilExpiry: daysUntilExpiry,
                        message: `${item.name} está vencido`
                    });
                }
            }
        });
    }

    renderStockItems() {
        const stockItems = document.getElementById('stockItems');
        if (!stockItems) return;

        stockItems.innerHTML = this.stockItems.map(item => `
            <div class="stock-item">
                <div class="stock-item-info">
                    <div class="stock-item-name">${item.name}</div>
                    <div class="stock-item-details">
                        <span>${item.category}</span>
                        <span>•</span>
                        <span>${item.supplier}</span>
                        <span>•</span>
                        <span>R$ ${item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/${item.unit}</span>
                    </div>
                </div>
                <div class="stock-item-quantity ${this.getStockStatus(item)}">
                    ${item.currentStock} ${item.unit}
                </div>
                <div class="stock-item-actions">
                    <button class="btn btn-sm btn-outline" onclick="stockManager.viewItem(${item.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="stockManager.editItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="stockManager.addMovement(${item.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderStockMovements() {
        const movementsList = document.getElementById('movementsList');
        if (!movementsList) return;

        movementsList.innerHTML = this.stockMovements.map(movement => `
            <div class="movement-item">
                <div class="movement-info">
                    <div class="movement-header">
                        <div class="movement-item-name">${movement.itemName}</div>
                        <div class="movement-type ${movement.type}">
                            <i class="fas fa-${movement.type === 'entrada' ? 'arrow-up' : 'arrow-down'}"></i>
                            ${movement.type === 'entrada' ? 'Entrada' : 'Saída'}
                        </div>
                    </div>
                    <div class="movement-details">
                        <span>Quantidade: ${movement.quantity}</span>
                        <span>•</span>
                        <span>${movement.reason}</span>
                        <span>•</span>
                        <span>${this.formatDate(movement.date)}</span>
                        <span>•</span>
                        <span>${movement.user}</span>
                    </div>
                </div>
                <div class="movement-actions">
                    <button class="btn btn-sm btn-outline" onclick="stockManager.viewMovement(${movement.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="stockManager.editMovement(${movement.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderAlerts() {
        const stockAlerts = document.getElementById('stockAlerts');
        if (!stockAlerts) return;

        if (this.alerts.length === 0) {
            stockAlerts.innerHTML = '<div class="no-alerts">Nenhum alerta de estoque</div>';
            return;
        }

        stockAlerts.innerHTML = this.alerts.map(alert => `
            <div class="stock-alert ${alert.type}">
                <div class="alert-icon">
                    <i class="fas fa-${this.getAlertIcon(alert.type)}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-message">${alert.message}</div>
                    ${alert.expiryDate ? `
                        <div class="alert-details">Vencimento: ${this.formatDate(alert.expiryDate)}</div>
                    ` : ''}
                </div>
                <div class="alert-actions">
                    <button class="btn btn-sm btn-outline" onclick="stockManager.handleAlert('${alert.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Action methods
    addStockItem() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Novo Item de Estoque</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="stockItemForm">
                        <div class="form-group">
                            <label class="form-label">Nome do Item</label>
                            <input type="text" class="form-control" id="itemName" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Categoria</label>
                            <select class="form-control" id="itemCategory" required>
                                <option value="">Selecione a categoria</option>
                                <option value="Medicamentos">Medicamentos</option>
                                <option value="Material Médico">Material Médico</option>
                                <option value="Equipamentos">Equipamentos</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Unidade</label>
                            <input type="text" class="form-control" id="itemUnit" placeholder="Ex: Comprimidos, Unidades, Litros" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Estoque Atual</label>
                            <input type="number" class="form-control" id="currentStock" min="0" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Estoque Mínimo</label>
                            <input type="number" class="form-control" id="minStock" min="0" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Estoque Máximo</label>
                            <input type="number" class="form-control" id="maxStock" min="0" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Preço Unitário</label>
                            <input type="number" class="form-control" id="unitPrice" step="0.01" min="0" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Fornecedor</label>
                            <input type="text" class="form-control" id="supplier" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data de Vencimento (opcional)</label>
                            <input type="date" class="form-control" id="expiryDate">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="stockManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="stockManager.saveStockItem()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveStockItem() {
        const form = document.getElementById('stockItemForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const stockItem = {
            id: Date.now(),
            name: document.getElementById('itemName').value,
            category: document.getElementById('itemCategory').value,
            unit: document.getElementById('itemUnit').value,
            currentStock: parseInt(document.getElementById('currentStock').value),
            minStock: parseInt(document.getElementById('minStock').value),
            maxStock: parseInt(document.getElementById('maxStock').value),
            unitPrice: parseFloat(document.getElementById('unitPrice').value),
            supplier: document.getElementById('supplier').value,
            lastMovement: new Date().toISOString().split('T')[0],
            expiryDate: document.getElementById('expiryDate').value || null
        };

        this.stockItems.push(stockItem);
        this.renderStockItems();
        this.loadAlerts();
        this.renderAlerts();
        this.closeModal();
        app.showToast('Item de estoque adicionado com sucesso', 'success');
    }

    addMovement(itemId = null) {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nova Movimentação</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="movementForm">
                        <div class="form-group">
                            <label class="form-label">Item</label>
                            <select class="form-control" id="movementItem" required>
                                <option value="">Selecione o item</option>
                                ${this.stockItems.map(item => `
                                    <option value="${item.id}" ${itemId === item.id ? 'selected' : ''}>${item.name}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tipo de Movimentação</label>
                            <select class="form-control" id="movementType" required>
                                <option value="">Selecione o tipo</option>
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Quantidade</label>
                            <input type="number" class="form-control" id="movementQuantity" min="1" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Motivo</label>
                            <select class="form-control" id="movementReason" required>
                                <option value="">Selecione o motivo</option>
                                <option value="Compra">Compra</option>
                                <option value="Uso em consultas">Uso em consultas</option>
                                <option value="Ajuste de estoque">Ajuste de estoque</option>
                                <option value="Vencimento">Vencimento</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lote (opcional)</label>
                            <input type="text" class="form-control" id="movementBatch" placeholder="Ex: LOT001">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data</label>
                            <input type="date" class="form-control" id="movementDate" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="stockManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="stockManager.saveMovement()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set default date
        document.getElementById('movementDate').value = new Date().toISOString().split('T')[0];
    }

    saveMovement() {
        const form = document.getElementById('movementForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const itemId = parseInt(document.getElementById('movementItem').value);
        const item = this.stockItems.find(i => i.id === itemId);
        
        if (!item) {
            app.showToast('Item não encontrado', 'error');
            return;
        }

        const movement = {
            id: Date.now(),
            itemId: itemId,
            itemName: item.name,
            type: document.getElementById('movementType').value,
            quantity: parseInt(document.getElementById('movementQuantity').value),
            date: document.getElementById('movementDate').value,
            reason: document.getElementById('movementReason').value,
            user: 'Dr. João Silva', // Mock user
            batch: document.getElementById('movementBatch').value || 'N/A'
        };

        // Update stock
        if (movement.type === 'entrada') {
            item.currentStock += movement.quantity;
        } else {
            item.currentStock -= movement.quantity;
            if (item.currentStock < 0) {
                app.showToast('Estoque insuficiente', 'error');
                return;
            }
        }

        item.lastMovement = movement.date;

        this.stockMovements.push(movement);
        this.renderStockItems();
        this.renderStockMovements();
        this.loadAlerts();
        this.renderAlerts();
        this.closeModal();
        app.showToast('Movimentação registrada com sucesso', 'success');
    }

    handleAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) return;

        this.alerts = this.alerts.filter(a => a.id !== alertId);
        this.renderAlerts();
        app.showToast('Alerta resolvido', 'success');
    }

    viewItem(itemId) {
        const item = this.stockItems.find(i => i.id === itemId);
        if (!item) return;

        app.showToast(`Visualizando ${item.name}`, 'info');
    }

    editItem(itemId) {
        const item = this.stockItems.find(i => i.id === itemId);
        if (!item) return;

        app.showToast(`Editando ${item.name}`, 'info');
    }

    viewMovement(movementId) {
        const movement = this.stockMovements.find(m => m.id === movementId);
        if (!movement) return;

        app.showToast(`Visualizando movimentação de ${movement.itemName}`, 'info');
    }

    editMovement(movementId) {
        const movement = this.stockMovements.find(m => m.id === movementId);
        if (!movement) return;

        app.showToast(`Editando movimentação de ${movement.itemName}`, 'info');
    }

    importMovements() {
        app.showToast('Funcionalidade de importação em desenvolvimento', 'info');
    }

    exportStock() {
        app.showToast('Exportando dados de estoque...', 'info');
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    // Utility methods
    getStockStatus(item) {
        if (item.currentStock === 0) return 'critical';
        if (item.currentStock <= item.minStock) return 'low';
        return 'normal';
    }

    getAlertIcon(type) {
        const iconMap = {
            'low': 'exclamation-triangle',
            'critical': 'exclamation-circle',
            'expiry': 'clock',
            'expired': 'times-circle'
        };
        return iconMap[type] || 'info-circle';
    }

    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }
}

// Initialize stock manager when stock page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('stock-page')) {
        window.stockManager = new StockManager();
    }
});

// Override the loadStock method in main.js
if (window.app) {
    window.app.loadStock = function() {
        if (!window.stockManager) {
            window.stockManager = new StockManager();
        }
    };
}
