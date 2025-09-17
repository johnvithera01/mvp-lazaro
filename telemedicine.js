// Telemedicine JavaScript for MVP Lazaro System

class TelemedicineManager {
    constructor() {
        this.currentRoom = null;
        this.isConnected = false;
        this.isMuted = false;
        this.isVideoOff = false;
        this.chatMessages = [];
        
        this.init();
    }

    init() {
        this.loadTelemedicinePage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadTelemedicinePage() {
        const telemedicinePage = document.getElementById('telemedicine-page');
        if (!telemedicinePage) return;

        telemedicinePage.innerHTML = `
            <div class="telemedicine-container">
                <div class="telemedicine-main">
                    <div class="telemedicine-header">
                        <div class="telemedicine-title">
                            <h1>Telemedicina</h1>
                            <div class="telemedicine-status" id="connectionStatus">
                                <i class="fas fa-circle"></i>
                                Conectado
                            </div>
                        </div>
                    </div>
                    
                    <div class="telemedicine-content">
                        <div class="telemedicine-video" id="videoContainer">
                            <div class="telemedicine-video-placeholder">
                                <i class="fas fa-video"></i>
                                <h3>Inicie uma consulta de telemedicina</h3>
                                <p>Clique em "Nova Consulta" para começar</p>
                            </div>
                        </div>
                        
                        <div class="telemedicine-controls">
                            <button class="telemedicine-control mute" id="muteBtn" onclick="telemedicineManager.toggleMute()">
                                <i class="fas fa-microphone"></i>
                            </button>
                            <button class="telemedicine-control video" id="videoBtn" onclick="telemedicineManager.toggleVideo()">
                                <i class="fas fa-video"></i>
                            </button>
                            <button class="telemedicine-control end" onclick="telemedicineManager.endCall()">
                                <i class="fas fa-phone-slash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="telemedicine-sidebar">
                    <div class="telemedicine-chat">
                        <div class="telemedicine-chat-header">
                            <i class="fas fa-comments"></i>
                            Chat da Consulta
                        </div>
                        <div class="telemedicine-chat-messages" id="chatMessages">
                            <div class="telemedicine-message received">
                                <div class="telemedicine-message-content">
                                    Bem-vindo à consulta de telemedicina. Como posso ajudá-lo hoje?
                                </div>
                                <div class="telemedicine-message-time">Agora</div>
                            </div>
                        </div>
                        <div class="telemedicine-chat-input">
                            <input type="text" id="chatInput" placeholder="Digite sua mensagem...">
                            <button onclick="telemedicineManager.sendMessage()">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="telemedicine-actions">
                        <button class="btn btn-primary" onclick="telemedicineManager.startConsultation()">
                            <i class="fas fa-video"></i>
                            Nova Consulta
                        </button>
                        <button class="btn btn-outline" onclick="telemedicineManager.joinConsultation()">
                            <i class="fas fa-sign-in-alt"></i>
                            Entrar em Consulta
                        </button>
                        <button class="btn btn-outline" onclick="telemedicineManager.scheduleConsultation()">
                            <i class="fas fa-calendar-plus"></i>
                            Agendar Consulta
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.setupTelemedicineEventListeners();
    }

    setupEventListeners() {
        // This will be called when the telemedicine page is loaded
    }

    setupTelemedicineEventListeners() {
        // Chat input
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    loadInitialData() {
        // Load any initial data needed for telemedicine
    }

    startConsultation() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nova Consulta de Telemedicina</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="consultationForm">
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
                            <label class="form-label">Tipo de Consulta</label>
                            <select class="form-control" id="consultationType" required>
                                <option value="first">Primeira Consulta</option>
                                <option value="return">Retorno</option>
                                <option value="urgent">Urgência</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Observações</label>
                            <textarea class="form-control" id="consultationNotes" rows="3" placeholder="Observações sobre a consulta..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="telemedicineManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="telemedicineManager.createConsultation()">Iniciar Consulta</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    createConsultation() {
        const form = document.getElementById('consultationForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const patientId = document.getElementById('patientSelect').value;
        const consultationType = document.getElementById('consultationType').value;
        const notes = document.getElementById('consultationNotes').value;

        // Create consultation room
        this.currentRoom = {
            id: Date.now(),
            patientId: patientId,
            type: consultationType,
            notes: notes,
            startTime: new Date(),
            status: 'active'
        };

        this.closeModal();
        this.initializeVideoCall();
        app.showToast('Consulta de telemedicina iniciada', 'success');
    }

    initializeVideoCall() {
        // Update UI for active call
        document.getElementById('connectionStatus').innerHTML = `
            <i class="fas fa-circle" style="color: var(--success-color);"></i>
            Consulta Ativa
        `;

        document.getElementById('videoContainer').innerHTML = `
            <div class="video-call-active">
                <div class="remote-video">
                    <div class="video-placeholder">
                        <i class="fas fa-user"></i>
                        <p>Paciente</p>
                    </div>
                </div>
                <div class="local-video">
                    <div class="video-placeholder">
                        <i class="fas fa-user-md"></i>
                        <p>Você</p>
                    </div>
                </div>
            </div>
        `;

        this.isConnected = true;
        this.addChatMessage('Sistema', 'Consulta iniciada com sucesso', 'system');
    }

    joinConsultation() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Entrar em Consulta</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Código da Consulta</label>
                        <input type="text" class="form-control" id="roomCode" placeholder="Digite o código da consulta" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Seu Nome</label>
                        <input type="text" class="form-control" id="participantName" placeholder="Seu nome" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="telemedicineManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="telemedicineManager.joinRoom()">Entrar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    joinRoom() {
        const roomCode = document.getElementById('roomCode').value;
        const participantName = document.getElementById('participantName').value;

        if (!roomCode || !participantName) {
            app.showToast('Preencha todos os campos', 'error');
            return;
        }

        this.closeModal();
        this.initializeVideoCall();
        this.addChatMessage('Sistema', `${participantName} entrou na consulta`, 'system');
        app.showToast('Conectado à consulta', 'success');
    }

    scheduleConsultation() {
        app.showToast('Redirecionando para agenda...', 'info');
        setTimeout(() => {
            app.navigateToPage('agenda');
        }, 500);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteBtn = document.getElementById('muteBtn');
        
        if (this.isMuted) {
            muteBtn.classList.add('active');
            muteBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            app.showToast('Microfone desativado', 'info');
        } else {
            muteBtn.classList.remove('active');
            muteBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            app.showToast('Microfone ativado', 'info');
        }
    }

    toggleVideo() {
        this.isVideoOff = !this.isVideoOff;
        const videoBtn = document.getElementById('videoBtn');
        
        if (this.isVideoOff) {
            videoBtn.classList.add('active');
            videoBtn.innerHTML = '<i class="fas fa-video-slash"></i>';
            app.showToast('Câmera desativada', 'info');
        } else {
            videoBtn.classList.remove('active');
            videoBtn.innerHTML = '<i class="fas fa-video"></i>';
            app.showToast('Câmera ativada', 'info');
        }
    }

    endCall() {
        if (confirm('Tem certeza que deseja encerrar a consulta?')) {
            this.isConnected = false;
            this.currentRoom = null;
            
            // Reset UI
            document.getElementById('connectionStatus').innerHTML = `
                <i class="fas fa-circle" style="color: var(--gray-400);"></i>
                Desconectado
            `;

            document.getElementById('videoContainer').innerHTML = `
                <div class="telemedicine-video-placeholder">
                    <i class="fas fa-video"></i>
                    <h3>Inicie uma consulta de telemedicina</h3>
                    <p>Clique em "Nova Consulta" para começar</p>
                </div>
            `;

            // Reset controls
            document.getElementById('muteBtn').classList.remove('active');
            document.getElementById('muteBtn').innerHTML = '<i class="fas fa-microphone"></i>';
            document.getElementById('videoBtn').classList.remove('active');
            document.getElementById('videoBtn').innerHTML = '<i class="fas fa-video"></i>';

            this.addChatMessage('Sistema', 'Consulta encerrada', 'system');
            app.showToast('Consulta encerrada', 'info');
        }
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;

        this.addChatMessage('Você', message, 'sent');
        chatInput.value = '';

        // Simulate response
        setTimeout(() => {
            this.addChatMessage('Paciente', 'Obrigado pela informação, doutor.', 'received');
        }, 1000);
    }

    addChatMessage(sender, message, type) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `telemedicine-message ${type}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="telemedicine-message-content">${message}</div>
            <div class="telemedicine-message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Initialize telemedicine manager when telemedicine page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('telemedicine-page')) {
        window.telemedicineManager = new TelemedicineManager();
    }
});

// Override the loadTelemedicine method in main.js
if (window.app) {
    window.app.loadTelemedicine = function() {
        if (!window.telemedicineManager) {
            window.telemedicineManager = new TelemedicineManager();
        }
    };
}
