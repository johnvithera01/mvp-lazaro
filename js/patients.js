// Patients JavaScript for MVP Lazaro System

class PatientsManager {
    constructor() {
        this.patients = [];
        this.selectedPatient = null;
        this.searchQuery = '';
        this.filters = {
            status: 'all',
            lastVisit: 'all',
            hasAlerts: false
        };
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        
        this.init();
    }

    init() {
        this.loadPatientsPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadPatientsPage() {
        const patientsPage = document.getElementById('patients-page');
        if (!patientsPage) return;

        patientsPage.innerHTML = `
            <div class="patients-container">
                <div class="patients-main">
                    <div class="patients-toolbar">
                        <div class="patients-search">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar por nome, CPF ou telefone..." id="patientsSearch">
                            <div class="search-results" id="searchResults"></div>
                        </div>
                        <div class="patients-filters">
                            <div class="filter-group">
                                <label class="filter-label">Status:</label>
                                <select class="filter-select" id="statusFilter">
                                    <option value="all">Todos</option>
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                    <option value="pending">Pendente</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label class="filter-label">Última visita:</label>
                                <select class="filter-select" id="lastVisitFilter">
                                    <option value="all">Todas</option>
                                    <option value="today">Hoje</option>
                                    <option value="week">Esta semana</option>
                                    <option value="month">Este mês</option>
                                    <option value="older">Mais antiga</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label class="filter-label">
                                    <input type="checkbox" id="hasAlertsFilter"> Com alertas
                                </label>
                            </div>
                        </div>
                        <div class="patients-list-actions">
                            <button class="btn btn-outline" onclick="patientsManager.exportPatients()">
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                            <button class="btn btn-primary" onclick="patientsManager.openNewPatient()">
                                <i class="fas fa-plus"></i>
                                Novo Paciente
                            </button>
                        </div>
                    </div>
                    
                    <div class="patients-content">
                        <table class="patients-table" id="patientsTable">
                            <thead>
                                <tr>
                                    <th onclick="patientsManager.sortBy('name')">
                                        Paciente
                                        <i class="fas fa-sort sort-icon"></i>
                                    </th>
                                    <th onclick="patientsManager.sortBy('cpf')">
                                        CPF
                                        <i class="fas fa-sort sort-icon"></i>
                                    </th>
                                    <th onclick="patientsManager.sortBy('phone')">
                                        Telefone
                                        <i class="fas fa-sort sort-icon"></i>
                                    </th>
                                    <th onclick="patientsManager.sortBy('lastVisit')">
                                        Última Visita
                                        <i class="fas fa-sort sort-icon"></i>
                                    </th>
                                    <th onclick="patientsManager.sortBy('nextAppointment')">
                                        Próxima Consulta
                                        <i class="fas fa-sort sort-icon"></i>
                                    </th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="patientsTableBody">
                                <!-- Patients will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="patient-sidebar">
                    <div class="patient-card" id="patientCard">
                        <div class="patient-card-header">
                            <div class="patient-card-avatar" id="patientAvatar">?</div>
                            <div class="patient-card-info">
                                <div class="patient-card-name" id="patientName">Selecione um paciente</div>
                                <div class="patient-card-details" id="patientDetails">Clique em um paciente para ver os detalhes</div>
                            </div>
                            <div class="patient-card-actions">
                                <button class="btn btn-sm btn-outline" onclick="patientsManager.editPatient()" id="editPatientBtn" disabled>
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline" onclick="patientsManager.newAppointment()" id="newAppointmentBtn" disabled>
                                    <i class="fas fa-calendar-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="patient-card-body" id="patientCardBody">
                            <div class="empty-state">
                                <i class="fas fa-user"></i>
                                <h3>Nenhum paciente selecionado</h3>
                                <p>Selecione um paciente da lista para ver os detalhes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupPatientsEventListeners();
    }

    setupEventListeners() {
        // This will be called when the patients page is loaded
    }

    setupPatientsEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('patientsSearch');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                this.searchQuery = e.target.value.trim();
                
                if (this.searchQuery.length >= 2) {
                    searchTimeout = setTimeout(() => {
                        this.performSearch();
                    }, 300);
                } else {
                    this.hideSearchResults();
                }
            });

            searchInput.addEventListener('blur', () => {
                setTimeout(() => this.hideSearchResults(), 200);
            });
        }

        // Filters
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderPatientsTable();
        });

        document.getElementById('lastVisitFilter').addEventListener('change', (e) => {
            this.filters.lastVisit = e.target.value;
            this.renderPatientsTable();
        });

        document.getElementById('hasAlertsFilter').addEventListener('change', (e) => {
            this.filters.hasAlerts = e.target.checked;
            this.renderPatientsTable();
        });
    }

    loadInitialData() {
        this.loadPatients();
        this.renderPatientsTable();
    }

    loadPatients() {
        // Mock data - in real app, this would come from API
        this.patients = [
            {
                id: 1,
                name: 'Maria Silva Santos',
                cpf: '123.456.789-00',
                phone: '(11) 99999-9999',
                email: 'maria.silva@email.com',
                birthDate: '1985-03-15',
                gender: 'F',
                address: 'Rua das Flores, 123 - São Paulo, SP',
                emergencyContact: 'João Silva - (11) 88888-8888',
                insurance: 'Unimed',
                insuranceNumber: '123456789',
                allergies: ['Penicilina', 'Dipirona'],
                chronicConditions: ['Hipertensão'],
                lastVisit: '2024-01-10',
                nextAppointment: '2024-01-20',
                status: 'active',
                alerts: [
                    { type: 'warning', message: 'Alergia a penicilina' },
                    { type: 'info', message: 'Próximo retorno em 10 dias' }
                ],
                documents: [
                    { id: 1, name: 'RG', type: 'document', uploadDate: '2024-01-01' },
                    { id: 2, name: 'Carteirinha do Convênio', type: 'insurance', uploadDate: '2024-01-01' }
                ],
                appointments: [
                    { id: 1, date: '2024-01-10', time: '14:30', type: 'Consulta', status: 'completed' },
                    { id: 2, date: '2024-01-20', time: '09:00', type: 'Retorno', status: 'scheduled' }
                ]
            },
            {
                id: 2,
                name: 'João Santos Oliveira',
                cpf: '987.654.321-00',
                phone: '(11) 88888-8888',
                email: 'joao.santos@email.com',
                birthDate: '1978-07-22',
                gender: 'M',
                address: 'Av. Paulista, 456 - São Paulo, SP',
                emergencyContact: 'Maria Santos - (11) 77777-7777',
                insurance: 'Bradesco Saúde',
                insuranceNumber: '987654321',
                allergies: [],
                chronicConditions: ['Diabetes'],
                lastVisit: '2024-01-08',
                nextAppointment: null,
                status: 'active',
                alerts: [
                    { type: 'danger', message: 'Diabetes descompensado' }
                ],
                documents: [
                    { id: 3, name: 'RG', type: 'document', uploadDate: '2024-01-01' }
                ],
                appointments: [
                    { id: 3, date: '2024-01-08', time: '10:00', type: 'Consulta', status: 'completed' }
                ]
            },
            {
                id: 3,
                name: 'Ana Costa Mendes',
                cpf: '456.789.123-00',
                phone: '(11) 77777-7777',
                email: 'ana.costa@email.com',
                birthDate: '1992-11-05',
                gender: 'F',
                address: 'Rua da Consolação, 789 - São Paulo, SP',
                emergencyContact: 'Carlos Costa - (11) 66666-6666',
                insurance: 'SUS',
                insuranceNumber: null,
                allergies: ['Dipirona'],
                chronicConditions: [],
                lastVisit: '2023-12-15',
                nextAppointment: '2024-01-25',
                status: 'active',
                alerts: [],
                documents: [
                    { id: 4, name: 'RG', type: 'document', uploadDate: '2023-12-01' },
                    { id: 5, name: 'Cartão SUS', type: 'insurance', uploadDate: '2023-12-01' }
                ],
                appointments: [
                    { id: 4, date: '2023-12-15', time: '15:30', type: 'Consulta', status: 'completed' },
                    { id: 5, date: '2024-01-25', time: '11:00', type: 'Retorno', status: 'scheduled' }
                ]
            },
            {
                id: 4,
                name: 'Pedro Oliveira Lima',
                cpf: '789.123.456-00',
                phone: '(11) 66666-6666',
                email: 'pedro.oliveira@email.com',
                birthDate: '1980-05-18',
                gender: 'M',
                address: 'Rua Augusta, 321 - São Paulo, SP',
                emergencyContact: 'Sandra Lima - (11) 55555-5555',
                insurance: 'Amil',
                insuranceNumber: '789123456',
                allergies: [],
                chronicConditions: ['Asma'],
                lastVisit: '2024-01-12',
                nextAppointment: '2024-01-22',
                status: 'active',
                alerts: [
                    { type: 'warning', message: 'Crise de asma recente' }
                ],
                documents: [
                    { id: 6, name: 'RG', type: 'document', uploadDate: '2024-01-01' },
                    { id: 7, name: 'Carteirinha do Convênio', type: 'insurance', uploadDate: '2024-01-01' }
                ],
                appointments: [
                    { id: 6, date: '2024-01-12', time: '16:00', type: 'Consulta', status: 'completed' },
                    { id: 7, date: '2024-01-22', time: '14:30', type: 'Retorno', status: 'scheduled' }
                ]
            }
        ];
    }

    renderPatientsTable() {
        const tbody = document.getElementById('patientsTableBody');
        if (!tbody) return;

        const filteredPatients = this.getFilteredPatients();
        const sortedPatients = this.sortPatients(filteredPatients);

        if (sortedPatients.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">
                        <div class="empty-state">
                            <i class="fas fa-user-slash"></i>
                            <h3>Nenhum paciente encontrado</h3>
                            <p>Tente ajustar os filtros ou adicionar um novo paciente</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = sortedPatients.map(patient => `
            <tr class="patient-row" data-patient-id="${patient.id}" onclick="patientsManager.selectPatient(${patient.id})">
                <td>
                    <div class="patient-row">
                        <div class="patient-avatar">${this.getInitials(patient.name)}</div>
                        <div class="patient-info">
                            <div class="patient-name" title="${patient.name}">${patient.name}</div>
                            <div class="patient-details">
                                <div class="patient-detail">
                                    <i class="fas fa-birthday-cake"></i>
                                    <span>${this.calculateAge(patient.birthDate)} anos</span>
                                </div>
                                <div class="patient-detail">
                                    <i class="fas fa-shield-alt"></i>
                                    <span title="${patient.insurance}">${patient.insurance}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="patient-field-value phone" title="${patient.cpf}">${patient.cpf}</span>
                </td>
                <td>
                    <span class="patient-field-value phone" title="${patient.phone}">${patient.phone}</span>
                </td>
                <td>
                    <span title="${this.formatDate(patient.lastVisit)}">${this.formatDate(patient.lastVisit)}</span>
                </td>
                <td>
                    <span title="${patient.nextAppointment ? this.formatDate(patient.nextAppointment) : 'Sem agendamento'}">${patient.nextAppointment ? this.formatDate(patient.nextAppointment) : '-'}</span>
                </td>
                <td>
                    <div class="patient-status">
                        <span class="status-indicator ${patient.status}" title="${this.getStatusText(patient.status)}">${this.getStatusText(patient.status)}</span>
                        ${patient.alerts.length > 0 ? '<i class="fas fa-exclamation-triangle text-warning" title="Paciente com alertas"></i>' : ''}
                    </div>
                </td>
                <td>
                    <div class="patient-actions">
                        <button class="patient-action" onclick="event.stopPropagation(); patientsManager.editPatient(${patient.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="patient-action" onclick="event.stopPropagation(); patientsManager.newAppointment(${patient.id})" title="Nova consulta">
                            <i class="fas fa-calendar-plus"></i>
                        </button>
                        <button class="patient-action" onclick="event.stopPropagation(); patientsManager.viewPatientHistory(${patient.id})" title="Histórico">
                            <i class="fas fa-history"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getFilteredPatients() {
        return this.patients.filter(patient => {
            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                const matchesSearch = 
                    patient.name.toLowerCase().includes(query) ||
                    patient.cpf.includes(query) ||
                    patient.phone.includes(query) ||
                    patient.email.toLowerCase().includes(query);
                
                if (!matchesSearch) return false;
            }

            // Status filter
            if (this.filters.status !== 'all' && patient.status !== this.filters.status) {
                return false;
            }

            // Last visit filter
            if (this.filters.lastVisit !== 'all') {
                const lastVisit = new Date(patient.lastVisit);
                const now = new Date();
                const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

                switch (this.filters.lastVisit) {
                    case 'today':
                        if (daysDiff !== 0) return false;
                        break;
                    case 'week':
                        if (daysDiff > 7) return false;
                        break;
                    case 'month':
                        if (daysDiff > 30) return false;
                        break;
                    case 'older':
                        if (daysDiff <= 30) return false;
                        break;
                }
            }

            // Alerts filter
            if (this.filters.hasAlerts && patient.alerts.length === 0) {
                return false;
            }

            return true;
        });
    }

    sortPatients(patients) {
        return patients.sort((a, b) => {
            let aValue, bValue;

            switch (this.sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'cpf':
                    aValue = a.cpf;
                    bValue = b.cpf;
                    break;
                case 'phone':
                    aValue = a.phone;
                    bValue = b.phone;
                    break;
                case 'lastVisit':
                    aValue = new Date(a.lastVisit);
                    bValue = new Date(b.lastVisit);
                    break;
                case 'nextAppointment':
                    aValue = a.nextAppointment ? new Date(a.nextAppointment) : new Date('2099-12-31');
                    bValue = b.nextAppointment ? new Date(b.nextAppointment) : new Date('2099-12-31');
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    sortBy(column) {
        if (this.sortBy === column) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = column;
            this.sortOrder = 'asc';
        }

        // Update sort icons
        document.querySelectorAll('.sort-icon').forEach(icon => {
            icon.className = 'fas fa-sort sort-icon';
        });

        const currentIcon = document.querySelector(`th[onclick*="${column}"] .sort-icon`);
        if (currentIcon) {
            currentIcon.className = `fas fa-sort-${this.sortOrder === 'asc' ? 'up' : 'down'} sort-icon`;
        }

        this.renderPatientsTable();
    }

    selectPatient(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) return;

        this.selectedPatient = patient;

        // Update table selection
        document.querySelectorAll('.patient-row').forEach(row => {
            row.classList.remove('selected');
        });
        document.querySelector(`[data-patient-id="${patientId}"]`).classList.add('selected');

        // Update sidebar
        this.renderPatientDetails(patient);

        // Enable action buttons
        document.getElementById('editPatientBtn').disabled = false;
        document.getElementById('newAppointmentBtn').disabled = false;
    }

    renderPatientDetails(patient) {
        // Update header
        document.getElementById('patientAvatar').textContent = this.getInitials(patient.name);
        document.getElementById('patientName').textContent = patient.name;
        document.getElementById('patientDetails').innerHTML = `
            <div>${patient.cpf}</div>
            <div>${patient.phone}</div>
        `;

        // Update body
        const cardBody = document.getElementById('patientCardBody');
        cardBody.innerHTML = `
            <div class="patient-section">
                <div class="patient-section-title">Informações Pessoais</div>
                <div class="patient-section-content">
                    <div class="patient-field">
                        <span class="patient-field-label">Data de Nascimento</span>
                        <span class="patient-field-value">${this.formatDate(patient.birthDate)} (${this.calculateAge(patient.birthDate)} anos)</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Gênero</span>
                        <span class="patient-field-value">${patient.gender === 'M' ? 'Masculino' : 'Feminino'}</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Email</span>
                        <span class="patient-field-value email">${patient.email}</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Endereço</span>
                        <span class="patient-field-value">${patient.address}</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Contato de Emergência</span>
                        <span class="patient-field-value">${patient.emergencyContact}</span>
                    </div>
                </div>
            </div>

            <div class="patient-section">
                <div class="patient-section-title">Convênio</div>
                <div class="patient-section-content">
                    <div class="patient-field">
                        <span class="patient-field-label">Convênio</span>
                        <span class="patient-field-value">${patient.insurance}</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Número</span>
                        <span class="patient-field-value">${patient.insuranceNumber || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="patient-section">
                <div class="patient-section-title">Histórico Médico</div>
                <div class="patient-section-content">
                    <div class="patient-field">
                        <span class="patient-field-label">Alergias</span>
                        <span class="patient-field-value">${patient.allergies.length > 0 ? patient.allergies.join(', ') : 'Nenhuma'}</span>
                    </div>
                    <div class="patient-field">
                        <span class="patient-field-label">Condições Crônicas</span>
                        <span class="patient-field-value">${patient.chronicConditions.length > 0 ? patient.chronicConditions.join(', ') : 'Nenhuma'}</span>
                    </div>
                </div>
            </div>

            ${patient.alerts.length > 0 ? `
                <div class="patient-section">
                    <div class="patient-section-title">Alertas</div>
                    <div class="patient-alerts">
                        ${patient.alerts.map(alert => `
                            <div class="alert-item ${alert.type}">
                                <div class="alert-icon">
                                    <i class="fas fa-${alert.type === 'danger' ? 'exclamation-triangle' : alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
                                </div>
                                <div class="alert-content">
                                    <div class="alert-description">${alert.message}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="patient-section">
                <div class="patient-section-title">Documentos</div>
                <div class="patient-documents">
                    ${patient.documents.map(doc => `
                        <div class="document-item">
                            <div class="document-icon">
                                <i class="fas fa-${doc.type === 'document' ? 'id-card' : 'shield-alt'}"></i>
                            </div>
                            <div class="document-info">
                                <div class="document-name">${doc.name}</div>
                                <div class="document-meta">Enviado em ${this.formatDate(doc.uploadDate)}</div>
                            </div>
                            <div class="document-actions">
                                <button class="document-action" onclick="patientsManager.viewDocument(${doc.id})" title="Visualizar">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="document-action" onclick="patientsManager.downloadDocument(${doc.id})" title="Download">
                                    <i class="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="patient-section">
                <div class="patient-section-title">Consultas Recentes</div>
                <div class="patient-appointments">
                    ${patient.appointments.slice(0, 3).map(apt => `
                        <div class="appointment-item" onclick="patientsManager.viewAppointment(${apt.id})">
                            <div class="appointment-date">
                                <div>${this.formatDate(apt.date)}</div>
                                <div>${apt.time}</div>
                            </div>
                            <div class="appointment-details">
                                <div>${apt.type}</div>
                                <span class="appointment-status ${apt.status}">${this.getAppointmentStatusText(apt.status)}</span>
                            </div>
                        </div>
                    `).join('')}
                    ${patient.appointments.length > 3 ? `
                        <button class="btn btn-sm btn-outline" onclick="patientsManager.viewPatientHistory(${patient.id})">
                            Ver todas as consultas (${patient.appointments.length})
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    performSearch() {
        const results = this.getFilteredPatients().slice(0, 5);
        this.showSearchResults(results);
    }

    showSearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result">Nenhum paciente encontrado</div>';
        } else {
            searchResults.innerHTML = results.map(patient => `
                <div class="search-result" onclick="patientsManager.selectPatient(${patient.id})">
                    <div class="search-result-avatar">${this.getInitials(patient.name)}</div>
                    <div class="search-result-info">
                        <div class="search-result-name">${patient.name}</div>
                        <div class="search-result-details">${patient.cpf} • ${patient.phone}</div>
                    </div>
                </div>
            `).join('');
        }

        searchResults.classList.add('show');
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('show');
        }
    }

    // Action methods
    openNewPatient() {
        this.showPatientModal();
    }

    editPatient(patientId = null) {
        const patient = patientId ? this.patients.find(p => p.id === patientId) : this.selectedPatient;
        if (!patient) return;

        this.showPatientModal(patient);
    }

    newAppointment(patientId = null) {
        const patient = patientId ? this.patients.find(p => p.id === patientId) : this.selectedPatient;
        if (!patient) {
            app.showToast('Selecione um paciente primeiro', 'warning');
            return;
        }

        app.showToast(`Abrindo agenda para ${patient.name}`, 'info');
        // Navigate to agenda with pre-selected patient
        setTimeout(() => {
            app.navigateToPage('agenda');
        }, 500);
    }

    viewPatientHistory(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) return;

        app.showToast(`Abrindo histórico de ${patient.name}`, 'info');
        // Could open a detailed history modal or navigate to a history page
    }

    viewAppointment(appointmentId) {
        app.showToast(`Visualizando consulta ${appointmentId}`, 'info');
        // Could open appointment details modal
    }

    viewDocument(documentId) {
        app.showToast(`Visualizando documento ${documentId}`, 'info');
        // Could open document viewer
    }

    downloadDocument(documentId) {
        app.showToast(`Download do documento ${documentId} iniciado`, 'success');
        // Could trigger document download
    }

    exportPatients() {
        app.showToast('Exportando lista de pacientes...', 'info');
        // Could generate and download CSV/Excel file
    }

    showPatientModal(patient = null) {
        const isEdit = !!patient;
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>${isEdit ? 'Editar Paciente' : 'Novo Paciente'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="patient-form" id="patientForm">
                        <div class="form-group full-width">
                            <label class="form-label">Nome Completo *</label>
                            <input type="text" class="form-control" id="patientNameInput" value="${patient?.name || ''}" required>
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">CPF *</label>
                            <input type="text" class="form-control" id="patientCpfInput" value="${patient?.cpf || ''}" required>
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">Data de Nascimento *</label>
                            <input type="date" class="form-control" id="patientBirthDateInput" value="${patient?.birthDate || ''}" required>
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">Gênero *</label>
                            <select class="form-control" id="patientGenderInput" required>
                                <option value="">Selecione</option>
                                <option value="M" ${patient?.gender === 'M' ? 'selected' : ''}>Masculino</option>
                                <option value="F" ${patient?.gender === 'F' ? 'selected' : ''}>Feminino</option>
                            </select>
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">Telefone *</label>
                            <input type="tel" class="form-control" id="patientPhoneInput" value="${patient?.phone || ''}" required>
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" id="patientEmailInput" value="${patient?.email || ''}">
                        </div>
                        
                        <div class="form-group half-width">
                            <label class="form-label">Contato de Emergência</label>
                            <input type="text" class="form-control" id="patientEmergencyContactInput" value="${patient?.emergencyContact || ''}">
                        </div>
                        
                        <div class="form-group full-width">
                            <label class="form-label">Endereço</label>
                            <textarea class="form-control" id="patientAddressInput" rows="2">${patient?.address || ''}</textarea>
                        </div>
                        
                        <div class="patient-form-section">
                            <div class="patient-form-section-title">Informações do Convênio</div>
                            
                            <div class="form-group half-width">
                                <label class="form-label">Convênio</label>
                                <select class="form-control" id="patientInsuranceInput">
                                    <option value="">Selecione</option>
                                    <option value="SUS" ${patient?.insurance === 'SUS' ? 'selected' : ''}>SUS</option>
                                    <option value="Unimed" ${patient?.insurance === 'Unimed' ? 'selected' : ''}>Unimed</option>
                                    <option value="Bradesco Saúde" ${patient?.insurance === 'Bradesco Saúde' ? 'selected' : ''}>Bradesco Saúde</option>
                                    <option value="Amil" ${patient?.insurance === 'Amil' ? 'selected' : ''}>Amil</option>
                                    <option value="Particular" ${patient?.insurance === 'Particular' ? 'selected' : ''}>Particular</option>
                                </select>
                            </div>
                            
                            <div class="form-group half-width">
                                <label class="form-label">Número do Convênio</label>
                                <input type="text" class="form-control" id="patientInsuranceNumberInput" value="${patient?.insuranceNumber || ''}">
                            </div>
                        </div>
                        
                        <div class="patient-form-section">
                            <div class="patient-form-section-title">Histórico Médico</div>
                            
                            <div class="form-group half-width">
                                <label class="form-label">Alergias</label>
                                <input type="text" class="form-control" id="patientAllergiesInput" value="${patient?.allergies?.join(', ') || ''}" placeholder="Separe por vírgula">
                            </div>
                            
                            <div class="form-group half-width">
                                <label class="form-label">Condições Crônicas</label>
                                <input type="text" class="form-control" id="patientChronicConditionsInput" value="${patient?.chronicConditions?.join(', ') || ''}" placeholder="Separe por vírgula">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="patientsManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="patientsManager.savePatient(${isEdit})">${isEdit ? 'Atualizar' : 'Salvar'}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    savePatient(isEdit) {
        const form = document.getElementById('patientForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const patientData = {
            name: document.getElementById('patientNameInput').value,
            cpf: document.getElementById('patientCpfInput').value,
            birthDate: document.getElementById('patientBirthDateInput').value,
            gender: document.getElementById('patientGenderInput').value,
            phone: document.getElementById('patientPhoneInput').value,
            email: document.getElementById('patientEmailInput').value,
            emergencyContact: document.getElementById('patientEmergencyContactInput').value,
            address: document.getElementById('patientAddressInput').value,
            insurance: document.getElementById('patientInsuranceInput').value,
            insuranceNumber: document.getElementById('patientInsuranceNumberInput').value,
            allergies: document.getElementById('patientAllergiesInput').value.split(',').map(a => a.trim()).filter(a => a),
            chronicConditions: document.getElementById('patientChronicConditionsInput').value.split(',').map(c => c.trim()).filter(c => c),
            status: 'active',
            alerts: [],
            documents: [],
            appointments: []
        };

        if (isEdit && this.selectedPatient) {
            // Update existing patient
            Object.assign(this.selectedPatient, patientData);
            app.showToast('Paciente atualizado com sucesso', 'success');
        } else {
            // Create new patient
            patientData.id = Date.now();
            patientData.lastVisit = null;
            patientData.nextAppointment = null;
            this.patients.push(patientData);
            app.showToast('Paciente cadastrado com sucesso', 'success');
        }

        this.closeModal();
        this.renderPatientsTable();
        
        if (isEdit && this.selectedPatient) {
            this.renderPatientDetails(this.selectedPatient);
        }
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    // Utility methods
    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    getStatusText(status) {
        const statusMap = {
            'active': 'Ativo',
            'inactive': 'Inativo',
            'pending': 'Pendente'
        };
        return statusMap[status] || status;
    }

    getAppointmentStatusText(status) {
        const statusMap = {
            'scheduled': 'Agendada',
            'confirmed': 'Confirmada',
            'completed': 'Concluída',
            'cancelled': 'Cancelada',
            'no-show': 'Não compareceu'
        };
        return statusMap[status] || status;
    }
}

// Initialize patients manager when patients page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('patients-page')) {
        window.patientsManager = new PatientsManager();
    }
});

// Override the loadPatients method in main.js
if (window.app) {
    window.app.loadPatients = function() {
        if (!window.patientsManager) {
            window.patientsManager = new PatientsManager();
        }
    };
}
