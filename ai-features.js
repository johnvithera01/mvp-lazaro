// AI Features JavaScript for MVP Lazaro System

class AIFeaturesManager {
    constructor() {
        this.aiStats = {
            transcriptions: 0,
            noshowPredictions: 0,
            timeSaved: 0
        };
        
        this.init();
    }

    init() {
        this.loadAIFeaturesPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadAIFeaturesPage() {
        const aiFeaturesPage = document.getElementById('ai-features-page');
        if (!aiFeaturesPage) return;

        aiFeaturesPage.innerHTML = `
            <div class="ai-features-container">
                <div class="ai-feature-card">
                    <div class="ai-feature-header">
                        <div class="ai-feature-title">
                            <i class="fas fa-microphone"></i>
                            IA Scribe
                        </div>
                        <div class="ai-feature-description">
                            Transcrição automática de consultas com geração de evolução estruturada
                        </div>
                    </div>
                    <div class="ai-feature-body">
                        <div class="ai-feature-stats">
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="transcriptionsCount">0</div>
                                <div class="ai-stat-label">Transcrições</div>
                            </div>
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="timeSavedCount">0h</div>
                                <div class="ai-stat-label">Tempo Economizado</div>
                            </div>
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="accuracyRate">95%</div>
                                <div class="ai-stat-label">Precisão</div>
                            </div>
                        </div>
                        
                        <div class="ai-feature-actions">
                            <div class="ai-action" onclick="aiFeaturesManager.openScribeDemo()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-play"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Demonstração</div>
                                    <div class="ai-action-description">Veja como funciona a transcrição automática</div>
                                </div>
                            </div>
                            
                            <div class="ai-action" onclick="aiFeaturesManager.viewScribeHistory()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-history"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Histórico</div>
                                    <div class="ai-action-description">Visualize transcrições anteriores</div>
                                </div>
                            </div>
                            
                            <div class="ai-action" onclick="aiFeaturesManager.configureScribe()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-cog"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Configurações</div>
                                    <div class="ai-action-description">Personalize templates e preferências</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ai-feature-card">
                    <div class="ai-feature-header">
                        <div class="ai-feature-title">
                            <i class="fas fa-chart-line"></i>
                            Previsão de No-Show
                        </div>
                        <div class="ai-feature-description">
                            Algoritmo que previne faltas em consultas usando dados históricos
                        </div>
                    </div>
                    <div class="ai-feature-body">
                        <div class="ai-feature-stats">
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="predictionsCount">0</div>
                                <div class="ai-stat-label">Previsões</div>
                            </div>
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="accuracyNoshow">87%</div>
                                <div class="ai-stat-label">Precisão</div>
                            </div>
                            <div class="ai-stat">
                                <div class="ai-stat-value" id="noshowReduction">-23%</div>
                                <div class="ai-stat-label">Redução No-Show</div>
                            </div>
                        </div>
                        
                        <div class="ai-feature-actions">
                            <div class="ai-action" onclick="aiFeaturesManager.viewNoshowPredictions()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Ver Previsões</div>
                                    <div class="ai-action-description">Consulte pacientes com alto risco de faltar</div>
                                </div>
                            </div>
                            
                            <div class="ai-action" onclick="aiFeaturesManager.configureNoshow()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-sliders-h"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Configurar Algoritmo</div>
                                    <div class="ai-action-description">Ajuste parâmetros e regras de previsão</div>
                                </div>
                            </div>
                            
                            <div class="ai-action" onclick="aiFeaturesManager.viewNoshowAnalytics()">
                                <div class="ai-action-icon">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <div class="ai-action-content">
                                    <div class="ai-action-title">Analytics</div>
                                    <div class="ai-action-description">Relatórios e métricas de performance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupAIFeaturesEventListeners();
    }

    setupEventListeners() {
        // This will be called when the AI features page is loaded
    }

    setupAIFeaturesEventListeners() {
        // Event listeners for AI features will be set up here
    }

    loadInitialData() {
        this.loadAIStats();
        this.updateStatsDisplay();
    }

    loadAIStats() {
        // Mock data - in real app, this would come from API
        this.aiStats = {
            transcriptions: 156,
            noshowPredictions: 89,
            timeSaved: 23.5,
            accuracyRate: 95,
            accuracyNoshow: 87,
            noshowReduction: 23
        };
    }

    updateStatsDisplay() {
        // Animate counters
        this.animateCounter('transcriptionsCount', this.aiStats.transcriptions);
        this.animateCounter('timeSavedCount', this.aiStats.timeSaved, 'hours');
        this.animateCounter('predictionsCount', this.aiStats.noshowPredictions);
        
        // Update static values
        document.getElementById('accuracyRate').textContent = this.aiStats.accuracyRate + '%';
        document.getElementById('accuracyNoshow').textContent = this.aiStats.accuracyNoshow + '%';
        document.getElementById('noshowReduction').textContent = '-' + this.aiStats.noshowReduction + '%';
    }

    animateCounter(elementId, targetValue, format = 'number') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (targetValue - startValue) * this.easeOutQuart(progress);
            
            if (format === 'hours') {
                element.textContent = Math.floor(currentValue) + 'h';
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Scribe Actions
    openScribeDemo() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h3>Demonstração - IA Scribe</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="scribe-demo-content">
                        <div class="demo-step">
                            <h4>1. Gravação da Consulta</h4>
                            <p>Durante a consulta, o áudio é capturado automaticamente ou você pode fazer upload de um arquivo.</p>
                            <div class="demo-audio-player">
                                <button class="btn btn-primary" onclick="aiFeaturesManager.playDemoAudio()">
                                    <i class="fas fa-play"></i>
                                    Reproduzir Áudio de Exemplo
                                </button>
                            </div>
                        </div>
                        
                        <div class="demo-step">
                            <h4>2. Transcrição Automática</h4>
                            <p>A IA converte o áudio em texto com alta precisão:</p>
                            <div class="demo-transcription">
                                <div class="transcription-text">
                                    "Paciente relata dor de cabeça há 3 dias, localizada na região frontal, de intensidade moderada..."
                                </div>
                            </div>
                        </div>
                        
                        <div class="demo-step">
                            <h4>3. Geração de Evolução</h4>
                            <p>A IA estrutura automaticamente a evolução no formato SOAP:</p>
                            <div class="demo-evolution">
                                <div class="evolution-soap">
                                    <div class="soap-section">
                                        <strong>S:</strong> Paciente relata cefaleia há 3 dias, localizada na região frontal...
                                    </div>
                                    <div class="soap-section">
                                        <strong>O:</strong> Paciente em bom estado geral, orientada, hidratada. PA: 120/80 mmHg...
                                    </div>
                                    <div class="soap-section">
                                        <strong>A:</strong> Cefaleia tensional.
                                    </div>
                                    <div class="soap-section">
                                        <strong>P:</strong> Orientação sobre técnicas de relaxamento, analgésico se necessário...
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="demo-step">
                            <h4>4. Revisão e Aprovação</h4>
                            <p>O médico revisa, edita se necessário e aprova a evolução gerada.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="aiFeaturesManager.tryScribe()">Experimentar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    playDemoAudio() {
        app.showToast('Reproduzindo áudio de demonstração...', 'info');
        // Could play actual audio file
    }

    tryScribe() {
        this.closeModal();
        app.navigateToPage('pep');
        app.showToast('Navegando para o PEP para testar o IA Scribe', 'info');
    }

    viewScribeHistory() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>Histórico de Transcrições</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="scribe-history">
                        <div class="history-filters">
                            <div class="filter-group">
                                <label>Período:</label>
                                <select>
                                    <option>Últimos 7 dias</option>
                                    <option>Últimos 30 dias</option>
                                    <option>Últimos 3 meses</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label>Paciente:</label>
                                <input type="text" placeholder="Buscar paciente...">
                            </div>
                        </div>
                        
                        <div class="history-list">
                            <div class="history-item">
                                <div class="history-header">
                                    <div class="history-patient">Maria Silva Santos</div>
                                    <div class="history-date">15/01/2024 - 14:30</div>
                                </div>
                                <div class="history-preview">
                                    S: Paciente relata cefaleia há 3 dias, localizada na região frontal...
                                </div>
                                <div class="history-actions">
                                    <button class="btn btn-sm btn-outline">Ver Completa</button>
                                    <button class="btn btn-sm btn-outline">Reutilizar</button>
                                </div>
                            </div>
                            
                            <div class="history-item">
                                <div class="history-header">
                                    <div class="history-patient">João Santos Oliveira</div>
                                    <div class="history-date">14/01/2024 - 10:15</div>
                                </div>
                                <div class="history-preview">
                                    S: Paciente retorna para acompanhamento de diabetes...
                                </div>
                                <div class="history-actions">
                                    <button class="btn btn-sm btn-outline">Ver Completa</button>
                                    <button class="btn btn-sm btn-outline">Reutilizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    configureScribe() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Configurações - IA Scribe</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="scribe-config">
                        <div class="config-section">
                            <h4>Preferências de Transcrição</h4>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Incluir pontuação automática
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Detectar termos médicos
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox"> 
                                    Incluir timestamps
                                </label>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h4>Templates de Evolução</h4>
                            <div class="form-group">
                                <label>Template padrão:</label>
                                <select>
                                    <option>SOAP (Subjetivo, Objetivo, Avaliação, Plano)</option>
                                    <option>SOAPER (SOAP + Educação + Revisão)</option>
                                    <option>Personalizado</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h4>Qualidade de Áudio</h4>
                            <div class="form-group">
                                <label>Qualidade mínima:</label>
                                <select>
                                    <option>Alta (recomendado)</option>
                                    <option>Média</option>
                                    <option>Baixa (mais rápido)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="aiFeaturesManager.saveScribeConfig()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveScribeConfig() {
        this.closeModal();
        app.showToast('Configurações do IA Scribe salvas', 'success');
    }

    // No-Show Actions
    viewNoshowPredictions() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h3>Previsões de No-Show</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="noshow-predictions">
                        <div class="predictions-summary">
                            <div class="summary-item">
                                <div class="summary-value high-risk">3</div>
                                <div class="summary-label">Alto Risco</div>
                            </div>
                            <div class="summary-item">
                                <div class="summary-value medium-risk">7</div>
                                <div class="summary-label">Médio Risco</div>
                            </div>
                            <div class="summary-item">
                                <div class="summary-value low-risk">15</div>
                                <div class="summary-label">Baixo Risco</div>
                            </div>
                        </div>
                        
                        <div class="predictions-list">
                            <div class="prediction-item high-risk">
                                <div class="prediction-header">
                                    <div class="prediction-patient">Carla Mendes</div>
                                    <div class="prediction-risk">85%</div>
                                </div>
                                <div class="prediction-details">
                                    <div class="prediction-appointment">15/01/2024 - 14:30</div>
                                    <div class="prediction-factors">
                                        <span class="factor">Histórico de faltas</span>
                                        <span class="factor">Cancelamento recente</span>
                                    </div>
                                </div>
                                <div class="prediction-actions">
                                    <button class="btn btn-sm btn-warning">Enviar Lembrete</button>
                                    <button class="btn btn-sm btn-outline">Confirmar</button>
                                </div>
                            </div>
                            
                            <div class="prediction-item medium-risk">
                                <div class="prediction-header">
                                    <div class="prediction-patient">Roberto Lima</div>
                                    <div class="prediction-risk">65%</div>
                                </div>
                                <div class="prediction-details">
                                    <div class="prediction-appointment">16/01/2024 - 09:00</div>
                                    <div class="prediction-factors">
                                        <span class="factor">Primeira consulta</span>
                                        <span class="factor">Horário matutino</span>
                                    </div>
                                </div>
                                <div class="prediction-actions">
                                    <button class="btn btn-sm btn-warning">Enviar Lembrete</button>
                                    <button class="btn btn-sm btn-outline">Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="aiFeaturesManager.sendBulkReminders()">Enviar Lembretes em Lote</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    sendBulkReminders() {
        this.closeModal();
        app.showToast('Lembretes enviados para pacientes de alto risco', 'success');
    }

    configureNoshow() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Configurações - Previsão de No-Show</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="noshow-config">
                        <div class="config-section">
                            <h4>Fatores de Risco</h4>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Histórico de faltas
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Cancelamentos recentes
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Primeira consulta
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Horário da consulta
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox"> 
                                    Distância da clínica
                                </label>
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h4>Limites de Risco</h4>
                            <div class="form-group">
                                <label>Alto risco (acima de):</label>
                                <input type="number" value="70" min="0" max="100">%
                            </div>
                            <div class="form-group">
                                <label>Médio risco (acima de):</label>
                                <input type="number" value="40" min="0" max="100">%
                            </div>
                        </div>
                        
                        <div class="config-section">
                            <h4>Ações Automáticas</h4>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" checked> 
                                    Enviar lembrete extra para alto risco
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox"> 
                                    Priorizar na fila de espera
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="aiFeaturesManager.saveNoshowConfig()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    saveNoshowConfig() {
        this.closeModal();
        app.showToast('Configurações de No-Show salvas', 'success');
    }

    viewNoshowAnalytics() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>Analytics - Previsão de No-Show</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="noshow-analytics">
                        <div class="analytics-charts">
                            <div class="chart-container">
                                <h4>Taxa de No-Show por Mês</h4>
                                <div class="chart-placeholder">
                                    <i class="fas fa-chart-line"></i>
                                    <p>Gráfico de linha mostrando redução de 23% no no-show</p>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h4>Precisão das Previsões</h4>
                                <div class="chart-placeholder">
                                    <i class="fas fa-chart-pie"></i>
                                    <p>87% de precisão nas previsões</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analytics-metrics">
                            <div class="metric-item">
                                <div class="metric-value">23%</div>
                                <div class="metric-label">Redução no No-Show</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-value">87%</div>
                                <div class="metric-label">Precisão das Previsões</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-value">156</div>
                                <div class="metric-label">Consultas Analisadas</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-value">R$ 2.340</div>
                                <div class="metric-label">Receita Preservada</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="aiFeaturesManager.closeModal()">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="aiFeaturesManager.exportAnalytics()">Exportar Relatório</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    exportAnalytics() {
        this.closeModal();
        app.showToast('Relatório de analytics exportado', 'success');
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Initialize AI features manager when AI features page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ai-features-page')) {
        window.aiFeaturesManager = new AIFeaturesManager();
    }
});

// Override the loadAIFeatures method in main.js
if (window.app) {
    window.app.loadAIFeatures = function() {
        if (!window.aiFeaturesManager) {
            window.aiFeaturesManager = new AIFeaturesManager();
        }
    };
}
