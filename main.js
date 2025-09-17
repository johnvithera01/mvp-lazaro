// Main JavaScript for MVP Lazaro System

class MVPLazaroApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.setupGlobalSearch();
        this.setupNotifications();
        this.setupSidebar();
    }

    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });

        // Global search
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            this.handleGlobalSearch(e.target.value);
        });

        // Notifications
        document.getElementById('notificationBtn').addEventListener('click', () => {
            this.toggleNotifications();
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    setupSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        // Check if sidebar should be collapsed on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            this.sidebarCollapsed = true;
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page').forEach(pageEl => {
            pageEl.style.display = 'none';
        });

        // Show target page
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            this.currentPage = page;
            
            // Load page-specific content
            this.loadPageContent(page);
        }
    }

    loadPageContent(page) {
        switch (page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'agenda':
                this.loadAgenda();
                break;
            case 'patients':
                this.loadPatients();
                break;
            case 'pep':
                this.loadPEP();
                break;
            case 'telemedicine':
                this.loadTelemedicine();
                break;
            case 'financial':
                this.loadFinancial();
                break;
            case 'insurance':
                this.loadInsurance();
                break;
            case 'stock':
                this.loadStock();
                break;
            case 'ai-features':
                this.loadAIFeatures();
                break;
            case 'patient-portal':
                this.loadPatientPortal();
                break;
        }
    }

    loadDashboard() {
        const todaySchedule = document.getElementById('todaySchedule');
        const recentPatients = document.getElementById('recentPatients');
        
        if (todaySchedule) {
            todaySchedule.innerHTML = this.generateTodaySchedule();
        }
        
        if (recentPatients) {
            recentPatients.innerHTML = this.generateRecentPatients();
        }
    }

    generateTodaySchedule() {
        const scheduleData = [
            {
                time: '08:00',
                patient: 'Maria Silva',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'confirmado',
                professional: 'Dr. João Silva'
            },
            {
                time: '08:30',
                patient: 'João Santos',
                type: 'Retorno',
                channel: 'Telemedicina',
                status: 'pendente',
                professional: 'Dr. João Silva'
            },
            {
                time: '09:00',
                patient: 'Ana Costa',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'check-in',
                professional: 'Dr. João Silva'
            },
            {
                time: '09:30',
                patient: 'Pedro Oliveira',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'confirmado',
                professional: 'Dr. João Silva'
            },
            {
                time: '10:00',
                patient: 'Carla Mendes',
                type: 'Teleconsulta',
                channel: 'Telemedicina',
                status: 'pendente',
                professional: 'Dr. João Silva'
            }
        ];

        return scheduleData.map(appointment => `
            <div class="schedule-item" onclick="app.showAppointmentDetails('${appointment.patient}')">
                <div class="schedule-time">
                    <div class="time">${appointment.time}</div>
                </div>
                <div class="schedule-info">
                    <div class="schedule-patient">${appointment.patient}</div>
                    <div class="schedule-details">
                        <span>${appointment.type}</span>
                        <span>•</span>
                        <span>${appointment.channel}</span>
                        <span>•</span>
                        <span>${appointment.professional}</span>
                    </div>
                </div>
                <div class="schedule-status">
                    <span class="status-indicator ${appointment.status}">${this.getStatusText(appointment.status)}</span>
                </div>
                <div class="schedule-actions">
                    <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.startAppointment('${appointment.patient}')">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    generateRecentPatients() {
        const patientsData = [
            {
                name: 'Maria Silva',
                lastVisit: 'Hoje',
                nextAppointment: '15/01/2024',
                status: 'ativo'
            },
            {
                name: 'João Santos',
                lastVisit: 'Ontem',
                nextAppointment: '20/01/2024',
                status: 'pendente'
            },
            {
                name: 'Ana Costa',
                lastVisit: '2 dias atrás',
                nextAppointment: '18/01/2024',
                status: 'ativo'
            },
            {
                name: 'Pedro Oliveira',
                lastVisit: '3 dias atrás',
                nextAppointment: '22/01/2024',
                status: 'ativo'
            }
        ];

        return patientsData.map(patient => `
            <div class="patient-item" onclick="app.showPatientDetails('${patient.name}')">
                <div class="patient-avatar">
                    ${patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="patient-info">
                    <div class="patient-name">${patient.name}</div>
                    <div class="patient-details">
                        <span>Última visita: ${patient.lastVisit}</span>
                        <span>•</span>
                        <span>Próxima: ${patient.nextAppointment}</span>
                    </div>
                </div>
                <div class="patient-status">
                    <span class="status-indicator ${patient.status}">${this.getStatusText(patient.status)}</span>
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'confirmado': 'Confirmado',
            'pendente': 'Pendente',
            'check-in': 'Check-in',
            'ativo': 'Ativo',
            'cancelled': 'Cancelado',
            'no-show': 'No-show'
        };
        return statusMap[status] || status;
    }

    setupGlobalSearch() {
        let searchTimeout;
        const searchInput = document.getElementById('globalSearch');
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    this.performGlobalSearch(query);
                }, 300);
            }
        });
    }

    performGlobalSearch(query) {
        // Simulate search results
        const results = [
            { type: 'patient', name: 'Maria Silva', cpf: '123.456.789-00' },
            { type: 'patient', name: 'João Santos', cpf: '987.654.321-00' },
            { type: 'appointment', patient: 'Ana Costa', time: '14:30' }
        ];

        this.showSearchResults(results);
    }

    showSearchResults(results) {
        // Create search dropdown
        let searchDropdown = document.querySelector('.search-dropdown');
        if (!searchDropdown) {
            searchDropdown = document.createElement('div');
            searchDropdown.className = 'search-dropdown';
            document.querySelector('.global-search').appendChild(searchDropdown);
        }

        if (results.length === 0) {
            searchDropdown.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado</div>';
        } else {
            searchDropdown.innerHTML = results.map(result => `
                <div class="search-result" onclick="app.handleSearchResult('${result.type}', '${result.name || result.patient}')">
                    <i class="fas fa-${result.type === 'patient' ? 'user' : 'calendar'}"></i>
                    <div>
                        <div class="search-result-title">${result.name || result.patient}</div>
                        <div class="search-result-subtitle">${result.cpf || result.time}</div>
                    </div>
                </div>
            `).join('');
        }

        searchDropdown.style.display = 'block';
    }

    handleSearchResult(type, identifier) {
        if (type === 'patient') {
            this.navigateToPage('patients');
            // Focus on specific patient
        } else if (type === 'appointment') {
            this.navigateToPage('agenda');
            // Focus on specific appointment
        }
        
        // Hide search dropdown
        document.querySelector('.search-dropdown').style.display = 'none';
        document.getElementById('globalSearch').value = '';
    }

    setupNotifications() {
        // Load notifications from localStorage or API
        this.loadNotifications();
    }

    loadNotifications() {
        const notifications = [
            {
                id: 1,
                type: 'success',
                title: 'Consulta confirmada',
                message: 'Maria Silva confirmou a consulta para 14:30',
                time: '5 min atrás',
                read: false
            },
            {
                id: 2,
                type: 'warning',
                title: 'No-show detectado',
                message: 'João Santos não compareceu à consulta',
                time: '15 min atrás',
                read: false
            },
            {
                id: 3,
                type: 'info',
                title: 'Receita assinada',
                message: 'Receita digital enviada para Ana Costa',
                time: '1 hora atrás',
                read: true
            }
        ];

        this.updateNotificationBadge(notifications.filter(n => !n.read).length);
    }

    updateNotificationBadge(count) {
        const badge = document.querySelector('.notification-badge');
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }

    toggleNotifications() {
        const modal = document.getElementById('notificationModal');
        modal.classList.toggle('show');
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for global search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('globalSearch').focus();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeModal();
        }

        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.metaKey) {
            const navItems = document.querySelectorAll('.nav-item');
            const index = parseInt(e.key) - 1;
            if (navItems[index]) {
                navItems[index].click();
            }
        }
    }

    // Utility methods
    showToast(message, type = 'info', duration = 5000) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'fas fa-check',
            error: 'fas fa-times',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info'
        };

        toast.innerHTML = `
            <div class="toast-icon ${type}">
                <i class="${iconMap[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    showLoading(element) {
        element.innerHTML = '<div class="loading"></div>';
    }

    hideLoading(element, content) {
        element.innerHTML = content;
    }

    // Page-specific methods (to be implemented by other modules)
    loadAgenda() {
        // Will be implemented in agenda.js
    }

    loadPatients() {
        // Will be implemented in patients.js
    }

    loadPEP() {
        // Will be implemented in pep.js
    }

    loadTelemedicine() {
        // Will be implemented in telemedicine.js
    }

    loadFinancial() {
        // Will be implemented in financial.js
    }

    loadInsurance() {
        // Will be implemented in insurance.js
    }

    loadStock() {
        // Will be implemented in stock.js
    }

    loadAIFeatures() {
        // Will be implemented in ai-features.js
    }

    loadPatientPortal() {
        // Will be implemented in patient-portal.js
    }

    // Action methods
    showAppointmentDetails(patientName) {
        this.showToast(`Detalhes da consulta de ${patientName}`, 'info');
    }

    startAppointment(patientName) {
        this.showToast(`Iniciando atendimento de ${patientName}`, 'success');
    }

    showPatientDetails(patientName) {
        this.navigateToPage('patients');
        this.showToast(`Carregando dados de ${patientName}`, 'info');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MVPLazaroApp();
});

// Add CSS for search dropdown
const searchStyles = `
.search-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-lg);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    display: none;
}

.search-result {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    transition: var(--transition-fast);
}

.search-result:hover {
    background: var(--gray-50);
}

.search-result i {
    color: var(--gray-400);
    width: 16px;
}

.search-result-title {
    font-weight: 500;
    color: var(--gray-900);
    font-size: var(--font-size-sm);
}

.search-result-subtitle {
    font-size: var(--font-size-xs);
    color: var(--gray-500);
}

.search-no-results {
    padding: var(--spacing-md);
    text-align: center;
    color: var(--gray-500);
    font-size: var(--font-size-sm);
}
`;

// Inject search styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);
