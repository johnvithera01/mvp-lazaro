// Patient Portal JavaScript for MVP Lazaro System

class PatientPortalManager {
    constructor() {
        this.currentPatient = null;
        this.appointments = [];
        this.documents = [];
        
        this.init();
    }

    init() {
        this.loadPatientPortalPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadPatientPortalPage() {
        const patientPortalPage = document.getElementById('patient-portal-page');
        if (!patientPortalPage) return;

        patientPortalPage.innerHTML = `
            <div class="patient-portal-container">
                <div class="patient-portal-header">
                    <div class="patient-portal-logo">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="patient-portal-title">Portal do Paciente</div>
                    <div class="patient-portal-subtitle">Acesse seus dados médicos de forma segura e conveniente</div>
                </div>
                
                <div class="patient-portal-content">
                    <div class="patient-portal-card">
                        <div class="patient-portal-card-header">
                            <div class="patient-portal-card-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="patient-portal-card-title">Minhas Consultas</div>
                            <div class="patient-portal-card-description">Gerencie seus agendamentos e consultas</div>
                        </div>
                        <div class="patient-portal-card-body">
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-calendar-plus"></i>
                                </div>
                                <div class="patient-portal-feature-text">Agendar nova consulta</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-calendar-check"></i>
                                </div>
                                <div class="patient-portal-feature-text">Confirmar consultas agendadas</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-calendar-times"></i>
                                </div>
                                <div class="patient-portal-feature-text">Cancelar ou reagendar consultas</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-history"></i>
                                </div>
                                <div class="patient-portal-feature-text">Ver histórico de consultas</div>
                            </div>
                            <button class="btn btn-primary" onclick="patientPortalManager.openAppointments()">
                                Acessar Consultas
                            </button>
                        </div>
                    </div>
                    
                    <div class="patient-portal-card">
                        <div class="patient-portal-card-header">
                            <div class="patient-portal-card-icon">
                                <i class="fas fa-file-medical"></i>
                            </div>
                            <div class="patient-portal-card-title">Meus Documentos</div>
                            <div class="patient-portal-card-description">Acesse receitas, atestados e exames</div>
                        </div>
                        <div class="patient-portal-card-body">
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-prescription-bottle-alt"></i>
                                </div>
                                <div class="patient-portal-feature-text">Receitas médicas digitais</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-certificate"></i>
                                </div>
                                <div class="patient-portal-feature-text">Atestados médicos</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-clipboard-list"></i>
                                </div>
                                <div class="patient-portal-feature-text">Pedidos de exames</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-download"></i>
                                </div>
                                <div class="patient-portal-feature-text">Download de documentos</div>
                            </div>
                            <button class="btn btn-primary" onclick="patientPortalManager.openDocuments()">
                                Acessar Documentos
                            </button>
                        </div>
                    </div>
                    
                    <div class="patient-portal-card">
                        <div class="patient-portal-card-header">
                            <div class="patient-portal-card-icon">
                                <i class="fas fa-video"></i>
                            </div>
                            <div class="patient-portal-card-title">Teleconsulta</div>
                            <div class="patient-portal-card-description">Consultas online seguras e convenientes</div>
                        </div>
                        <div class="patient-portal-card-body">
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-video"></i>
                                </div>
                                <div class="patient-portal-feature-text">Entrar na consulta online</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-microphone"></i>
                                </div>
                                <div class="patient-portal-feature-text">Teste de áudio e vídeo</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="patient-portal-feature-text">Consultas 100% seguras</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div class="patient-portal-feature-text">Acesso pelo celular</div>
                            </div>
                            <button class="btn btn-primary" onclick="patientPortalManager.openTeleconsultation()">
                                Iniciar Teleconsulta
                            </button>
                        </div>
                    </div>
                    
                    <div class="patient-portal-card">
                        <div class="patient-portal-card-header">
                            <div class="patient-portal-card-icon">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="patient-portal-card-title">Meus Dados</div>
                            <div class="patient-portal-card-description">Gerencie suas informações pessoais</div>
                        </div>
                        <div class="patient-portal-card-body">
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-user-edit"></i>
                                </div>
                                <div class="patient-portal-feature-text">Atualizar dados pessoais</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="patient-portal-feature-text">Alterar contatos</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="patient-portal-feature-text">Informações do convênio</div>
                            </div>
                            <div class="patient-portal-feature">
                                <div class="patient-portal-feature-icon">
                                    <i class="fas fa-heartbeat"></i>
                                </div>
                                <div class="patient-portal-feature-text">Histórico médico</div>
                            </div>
                            <button class="btn btn-primary" onclick="patientPortalManager.openProfile()">
                                Acessar Perfil
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="patient-portal-footer">
                    <div class="portal-info">
                        <h4>Como acessar o Portal?</h4>
                        <p>Para acessar o Portal do Paciente, você receberá um link único por SMS ou e-mail antes de cada consulta. Não é necessário criar senha!</p>
                    </div>
                    
                    <div class="portal-security">
                        <h4>Segurança e Privacidade</h4>
                        <p>Seus dados são protegidos com criptografia de ponta e seguimos rigorosamente a LGPD. Suas informações médicas são confidenciais e seguras.</p>
                    </div>
                    
                    <div class="portal-support">
                        <h4>Precisa de Ajuda?</h4>
                        <p>Entre em contato conosco pelo WhatsApp (11) 99999-9999 ou e-mail suporte@clinica.com.br</p>
                    </div>
                </div>
            </div>
        `;

        this.setupPatientPortalEventListeners();
    }

    setupEventListeners() {
        // This will be called when the patient portal page is loaded
    }

    setupPatientPortalEventListeners() {
        // Event listeners for patient portal features will be set up here
    }

    loadInitialData() {
        this.loadMockPatient();
        this.loadAppointments();
        this.loadDocuments();
    }

    loadMockPatient() {
        // Mock patient data
        this.currentPatient = {
            id: 1,
            name: 'Maria Silva Santos',
            cpf: '123.456.789-00',
            phone: '(11) 99999-9999',
            email: 'maria.silva@email.com',
            birthDate: '1985-03-15',
            insurance: 'Unimed',
            insuranceNumber: '123456789'
        };
    }

    loadAppointments() {
        // Mock appointments data
        this.appointments = [
            {
                id: 1,
                date: '2024-01-20',
                time: '14:30',
                professional: 'Dr. João Silva',
                type: 'Consulta',
                status: 'scheduled',
                channel: 'presencial'
            },
            {
                id: 2,
                date: '2024-01-15',
                time: '10:00',
                professional: 'Dr. João Silva',
                type: 'Consulta',
                status: 'completed',
                channel: 'presencial'
            },
            {
                id: 3,
                date: '2024-01-10',
                time: '16:00',
                professional: 'Dr. João Silva',
                type: 'Teleconsulta',
                status: 'completed',
                channel: 'telemedicina'
            }
        ];
    }

    loadDocuments() {
        // Mock documents data
        this.documents = [
            {
                id: 1,
                type: 'prescription',
                title: 'Receita Médica',
                date: '2024-01-15',
                status: 'signed',
                downloadUrl: '#'
            },
            {
                id: 2,
                type: 'certificate',
                title: 'Atestado Médico',
                date: '2024-01-15',
                status: 'signed',
                downloadUrl: '#'
            },
            {
                id: 3,
                type: 'exam_request',
                title: 'Pedido de Exame',
                date: '2024-01-10',
                status: 'signed',
                downloadUrl: '#'
            }
        ];
    }

    // Action methods
    openAppointments() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>Minhas Consultas</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="appointments-list">
                        ${this.appointments.map(appointment => `
                            <div class="appointment-card">
                                <div class="appointment-header">
                                    <div class="appointment-date">
                                        <div class="date">${this.formatDate(appointment.date)}</div>
                                        <div class="time">${appointment.time}</div>
                                    </div>
                                    <div class="appointment-status ${appointment.status}">
                                        ${this.getAppointmentStatusText(appointment.status)}
                                    </div>
                                </div>
                                <div class="appointment-details">
                                    <div class="professional">${appointment.professional}</div>
                                    <div class="type">${appointment.type} - ${appointment.channel === 'presencial' ? 'Presencial' : 'Online'}</div>
                                </div>
                                <div class="appointment-actions">
                                    ${appointment.status === 'scheduled' ? `
                                        <button class="btn btn-sm btn-outline" onclick="patientPortalManager.confirmAppointment(${appointment.id})">
                                            <i class="fas fa-check"></i>
                                            Confirmar
                                        </button>
                                        <button class="btn btn-sm btn-outline" onclick="patientPortalManager.rescheduleAppointment(${appointment.id})">
                                            <i class="fas fa-calendar-alt"></i>
                                            Reagendar
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="patientPortalManager.cancelAppointment(${appointment.id})">
                                            <i class="fas fa-times"></i>
                                            Cancelar
                                        </button>
                                    ` : ''}
                                    ${appointment.channel === 'telemedicina' && appointment.status === 'scheduled' ? `
                                        <button class="btn btn-sm btn-primary" onclick="patientPortalManager.joinTeleconsultation(${appointment.id})">
                                            <i class="fas fa-video"></i>
                                            Entrar na Consulta
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="new-appointment-section">
                        <h4>Agendar Nova Consulta</h4>
                        <p>Para agendar uma nova consulta, entre em contato conosco:</p>
                        <div class="contact-options">
                            <button class="btn btn-outline" onclick="patientPortalManager.contactWhatsApp()">
                                <i class="fab fa-whatsapp"></i>
                                WhatsApp
                            </button>
                            <button class="btn btn-outline" onclick="patientPortalManager.contactPhone()">
                                <i class="fas fa-phone"></i>
                                Telefone
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="patientPortalManager.closeModal()">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    openDocuments() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>Meus Documentos</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="documents-list">
                        ${this.documents.map(document => `
                            <div class="document-card">
                                <div class="document-header">
                                    <div class="document-type">
                                        <i class="fas fa-${this.getDocumentIcon(document.type)}"></i>
                                        ${document.title}
                                    </div>
                                    <div class="document-date">${this.formatDate(document.date)}</div>
                                </div>
                                <div class="document-body">
                                    <div class="document-status ${document.status}">
                                        <i class="fas fa-check-circle"></i>
                                        Documento assinado digitalmente
                                    </div>
                                    <div class="document-actions">
                                        <button class="btn btn-sm btn-outline" onclick="patientPortalManager.viewDocument(${document.id})">
                                            <i class="fas fa-eye"></i>
                                            Visualizar
                                        </button>
                                        <button class="btn btn-sm btn-primary" onclick="patientPortalManager.downloadDocument(${document.id})">
                                            <i class="fas fa-download"></i>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="document-info">
                        <h4>Informações Importantes</h4>
                        <ul>
                            <li>Receitas médicas têm validade de 30 dias</li>
                            <li>Atestados médicos são válidos conforme período indicado</li>
                            <li>Pedidos de exames não têm prazo de validade</li>
                            <li>Mantenha sempre uma cópia dos seus documentos</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="patientPortalManager.closeModal()">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    openTeleconsultation() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Teleconsulta</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="teleconsultation-info">
                        <h4>Como funciona a Teleconsulta?</h4>
                        <p>A teleconsulta permite que você tenha uma consulta médica online, de forma segura e conveniente, sem sair de casa.</p>
                        
                        <div class="teleconsultation-steps">
                            <div class="step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h5>Agendamento</h5>
                                    <p>Agende sua consulta online através do nosso sistema</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h5>Confirmação</h5>
                                    <p>Receba um link único por SMS ou e-mail</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h5>Consulta</h5>
                                    <p>Acesse o link no horário agendado para sua consulta</p>
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h5>Documentos</h5>
                                    <p>Receba receitas e atestados digitalmente</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="teleconsultation-requirements">
                            <h5>Requisitos:</h5>
                            <ul>
                                <li>Dispositivo com câmera e microfone</li>
                                <li>Conexão estável com a internet</li>
                                <li>Ambiente privado e silencioso</li>
                                <li>Navegador atualizado (Chrome, Firefox, Safari)</li>
                            </ul>
                        </div>
                        
                        <div class="teleconsultation-actions">
                            <button class="btn btn-primary" onclick="patientPortalManager.testConnection()">
                                <i class="fas fa-wifi"></i>
                                Testar Conexão
                            </button>
                            <button class="btn btn-outline" onclick="patientPortalManager.scheduleTeleconsultation()">
                                <i class="fas fa-calendar-plus"></i>
                                Agendar Teleconsulta
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="patientPortalManager.closeModal()">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    openProfile() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Meus Dados</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="profile-info">
                        <div class="profile-section">
                            <h4>Dados Pessoais</h4>
                            <div class="profile-field">
                                <label>Nome Completo:</label>
                                <span>${this.currentPatient.name}</span>
                            </div>
                            <div class="profile-field">
                                <label>CPF:</label>
                                <span>${this.currentPatient.cpf}</span>
                            </div>
                            <div class="profile-field">
                                <label>Data de Nascimento:</label>
                                <span>${this.formatDate(this.currentPatient.birthDate)}</span>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Contatos</h4>
                            <div class="profile-field">
                                <label>Telefone:</label>
                                <span>${this.currentPatient.phone}</span>
                            </div>
                            <div class="profile-field">
                                <label>E-mail:</label>
                                <span>${this.currentPatient.email}</span>
                            </div>
                        </div>
                        
                        <div class="profile-section">
                            <h4>Convênio</h4>
                            <div class="profile-field">
                                <label>Convênio:</label>
                                <span>${this.currentPatient.insurance}</span>
                            </div>
                            <div class="profile-field">
                                <label>Número:</label>
                                <span>${this.currentPatient.insuranceNumber}</span>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="btn btn-outline" onclick="patientPortalManager.editProfile()">
                                <i class="fas fa-edit"></i>
                                Editar Dados
                            </button>
                            <button class="btn btn-outline" onclick="patientPortalManager.changePassword()">
                                <i class="fas fa-key"></i>
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="patientPortalManager.closeModal()">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Appointment actions
    confirmAppointment(appointmentId) {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        if (!appointment) return;

        if (confirm(`Confirmar consulta com ${appointment.professional} em ${this.formatDate(appointment.date)} às ${appointment.time}?`)) {
            appointment.status = 'confirmed';
            app.showToast('Consulta confirmada com sucesso', 'success');
            this.openAppointments(); // Refresh the modal
        }
    }

    rescheduleAppointment(appointmentId) {
        app.showToast('Para reagendar, entre em contato conosco pelo WhatsApp', 'info');
    }

    cancelAppointment(appointmentId) {
        const appointment = this.appointments.find(a => a.id === appointmentId);
        if (!appointment) return;

        if (confirm(`Cancelar consulta com ${appointment.professional} em ${this.formatDate(appointment.date)} às ${appointment.time}?`)) {
            appointment.status = 'cancelled';
            app.showToast('Consulta cancelada', 'info');
            this.openAppointments(); // Refresh the modal
        }
    }

    joinTeleconsultation(appointmentId) {
        app.showToast('Redirecionando para a teleconsulta...', 'info');
        // Could redirect to teleconsultation room
    }

    // Document actions
    viewDocument(documentId) {
        const document = this.documents.find(d => d.id === documentId);
        if (!document) return;

        app.showToast(`Visualizando ${document.title}`, 'info');
    }

    downloadDocument(documentId) {
        const document = this.documents.find(d => d.id === documentId);
        if (!document) return;

        app.showToast(`Download de ${document.title} iniciado`, 'success');
    }

    // Contact actions
    contactWhatsApp() {
        app.showToast('Redirecionando para WhatsApp...', 'info');
    }

    contactPhone() {
        app.showToast('Ligando para (11) 99999-9999...', 'info');
    }

    // Teleconsultation actions
    testConnection() {
        app.showToast('Testando conexão...', 'info');
        setTimeout(() => {
            app.showToast('Conexão OK! Você está pronto para teleconsultas', 'success');
        }, 2000);
    }

    scheduleTeleconsultation() {
        app.showToast('Redirecionando para agendamento...', 'info');
    }

    // Profile actions
    editProfile() {
        app.showToast('Funcionalidade de edição em desenvolvimento', 'info');
    }

    changePassword() {
        app.showToast('Portal do Paciente não usa senhas. Acesso é feito por link único.', 'info');
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

    getAppointmentStatusText(status) {
        const statusMap = {
            'scheduled': 'Agendada',
            'confirmed': 'Confirmada',
            'completed': 'Concluída',
            'cancelled': 'Cancelada'
        };
        return statusMap[status] || status;
    }

    getDocumentIcon(type) {
        const iconMap = {
            'prescription': 'prescription-bottle-alt',
            'certificate': 'certificate',
            'exam_request': 'clipboard-list'
        };
        return iconMap[type] || 'file-alt';
    }
}

// Initialize patient portal manager when patient portal page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('patient-portal-page')) {
        window.patientPortalManager = new PatientPortalManager();
    }
});

// Override the loadPatientPortal method in main.js
if (window.app) {
    window.app.loadPatientPortal = function() {
        if (!window.patientPortalManager) {
            window.patientPortalManager = new PatientPortalManager();
        }
    };
}
