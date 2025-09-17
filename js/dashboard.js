// Dashboard JavaScript for MVP Lazaro System

class DashboardManager {
    constructor() {
        this.stats = {
            todayAppointments: 12,
            waitingPatients: 3,
            teleconsultations: 5,
            todayRevenue: 2450
        };
        
        this.init();
    }

    init() {
        this.setupViewToggle();
        this.loadDashboardData();
        this.setupRealTimeUpdates();
    }

    setupViewToggle() {
        const toggleButtons = document.querySelectorAll('.btn-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Switch view
                const view = button.dataset.view;
                this.switchScheduleView(view);
            });
        });
    }

    switchScheduleView(view) {
        const scheduleList = document.querySelector('.schedule-list');
        const scheduleTimeline = document.querySelector('.schedule-timeline');
        
        if (view === 'timeline') {
            scheduleList.style.display = 'none';
            if (!scheduleTimeline) {
                this.createTimelineView();
            } else {
                scheduleTimeline.style.display = 'block';
            }
        } else {
            if (scheduleTimeline) {
                scheduleTimeline.style.display = 'none';
            }
            scheduleList.style.display = 'block';
        }
    }

    createTimelineView() {
        const scheduleSection = document.querySelector('.dashboard-section');
        const timelineHTML = `
            <div class="schedule-timeline active">
                ${this.generateTimelineHTML()}
            </div>
        `;
        
        const scheduleList = document.querySelector('.schedule-list');
        scheduleList.insertAdjacentHTML('afterend', timelineHTML);
    }

    generateTimelineHTML() {
        const timelineData = [
            { hour: '08:00', appointments: [
                { patient: 'Maria Silva', type: 'Consulta', channel: 'Presencial', status: 'confirmado' }
            ]},
            { hour: '08:30', appointments: [
                { patient: 'João Santos', type: 'Retorno', channel: 'Telemedicina', status: 'pendente' }
            ]},
            { hour: '09:00', appointments: [
                { patient: 'Ana Costa', type: 'Consulta', channel: 'Presencial', status: 'check-in' }
            ]},
            { hour: '09:30', appointments: [
                { patient: 'Pedro Oliveira', type: 'Consulta', channel: 'Presencial', status: 'confirmado' }
            ]},
            { hour: '10:00', appointments: [
                { patient: 'Carla Mendes', type: 'Teleconsulta', channel: 'Telemedicina', status: 'pendente' }
            ]},
            { hour: '10:30', appointments: [] },
            { hour: '11:00', appointments: [
                { patient: 'Roberto Lima', type: 'Consulta', channel: 'Presencial', status: 'confirmado' }
            ]}
        ];

        return timelineData.map(hourData => `
            <div class="timeline-hour">
                <div class="timeline-time">${hourData.hour}</div>
                <div class="timeline-content">
                    ${hourData.appointments.map(appointment => `
                        <div class="timeline-appointment ${appointment.channel.toLowerCase()}" 
                             onclick="dashboardManager.showAppointmentDetails('${appointment.patient}')">
                            <div class="appointment-header">
                                <span class="patient-name">${appointment.patient}</span>
                                <span class="status-indicator ${appointment.status}">${this.getStatusText(appointment.status)}</span>
                            </div>
                            <div class="appointment-details">
                                <span>${appointment.type}</span>
                                <span>•</span>
                                <span>${appointment.channel}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    loadDashboardData() {
        this.updateStats();
        this.loadTodaySchedule();
        this.loadRecentPatients();
        this.loadAIInsights();
    }

    updateStats() {
        // Animate stats counters
        this.animateCounter('.stat-card:nth-child(1) h3', this.stats.todayAppointments);
        this.animateCounter('.stat-card:nth-child(2) h3', this.stats.waitingPatients);
        this.animateCounter('.stat-card:nth-child(3) h3', this.stats.teleconsultations);
        this.animateCounter('.stat-card:nth-child(4) h3', this.stats.todayRevenue, 'currency');
    }

    animateCounter(selector, targetValue, format = 'number') {
        const element = document.querySelector(selector);
        if (!element) return;

        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (targetValue - startValue) * this.easeOutQuart(progress);
            
            if (format === 'currency') {
                element.textContent = `R$ ${Math.floor(currentValue).toLocaleString()}`;
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

    loadTodaySchedule() {
        // This would typically fetch from an API
        const scheduleData = this.getMockScheduleData();
        this.renderSchedule(scheduleData);
    }

    getMockScheduleData() {
        return [
            {
                id: 1,
                time: '08:00',
                patient: 'Maria Silva',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'confirmado',
                professional: 'Dr. João Silva',
                riskScore: 0.2
            },
            {
                id: 2,
                time: '08:30',
                patient: 'João Santos',
                type: 'Retorno',
                channel: 'Telemedicina',
                status: 'pendente',
                professional: 'Dr. João Silva',
                riskScore: 0.8
            },
            {
                id: 3,
                time: '09:00',
                patient: 'Ana Costa',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'check-in',
                professional: 'Dr. João Silva',
                riskScore: 0.1
            },
            {
                id: 4,
                time: '09:30',
                patient: 'Pedro Oliveira',
                type: 'Consulta',
                channel: 'Presencial',
                status: 'confirmado',
                professional: 'Dr. João Silva',
                riskScore: 0.3
            },
            {
                id: 5,
                time: '10:00',
                patient: 'Carla Mendes',
                type: 'Teleconsulta',
                channel: 'Telemedicina',
                status: 'pendente',
                professional: 'Dr. João Silva',
                riskScore: 0.7
            }
        ];
    }

    renderSchedule(scheduleData) {
        const scheduleContainer = document.getElementById('todaySchedule');
        if (!scheduleContainer) return;

        scheduleContainer.innerHTML = scheduleData.map(appointment => `
            <div class="schedule-item" data-appointment-id="${appointment.id}">
                <div class="schedule-time">
                    <div class="time">${appointment.time}</div>
                </div>
                <div class="schedule-info">
                    <div class="schedule-patient">
                        ${appointment.patient}
                        ${appointment.riskScore > 0.6 ? '<i class="fas fa-exclamation-triangle text-warning" title="Alto risco de no-show"></i>' : ''}
                    </div>
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
                    <button class="btn btn-sm btn-outline" onclick="dashboardManager.startAppointment(${appointment.id})" title="Iniciar atendimento">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="dashboardManager.showAppointmentOptions(${appointment.id})" title="Opções">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadRecentPatients() {
        const patientsData = this.getMockPatientsData();
        this.renderRecentPatients(patientsData);
    }

    getMockPatientsData() {
        return [
            {
                id: 1,
                name: 'Maria Silva',
                lastVisit: 'Hoje',
                nextAppointment: '15/01/2024',
                status: 'ativo',
                avatar: 'MS'
            },
            {
                id: 2,
                name: 'João Santos',
                lastVisit: 'Ontem',
                nextAppointment: '20/01/2024',
                status: 'pendente',
                avatar: 'JS'
            },
            {
                id: 3,
                name: 'Ana Costa',
                lastVisit: '2 dias atrás',
                nextAppointment: '18/01/2024',
                status: 'ativo',
                avatar: 'AC'
            },
            {
                id: 4,
                name: 'Pedro Oliveira',
                lastVisit: '3 dias atrás',
                nextAppointment: '22/01/2024',
                status: 'ativo',
                avatar: 'PO'
            }
        ];
    }

    renderRecentPatients(patientsData) {
        const patientsContainer = document.getElementById('recentPatients');
        if (!patientsContainer) return;

        patientsContainer.innerHTML = patientsData.map(patient => `
            <div class="patient-item" data-patient-id="${patient.id}">
                <div class="patient-avatar">${patient.avatar}</div>
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

    loadAIInsights() {
        const insightsData = this.getMockInsightsData();
        this.renderAIInsights(insightsData);
    }

    getMockInsightsData() {
        return [
            {
                type: 'warning',
                icon: 'fas fa-exclamation-triangle',
                title: 'Risco de No-Show Alto',
                description: '3 pacientes com probabilidade >70% de faltar',
                action: 'Ver detalhes',
                count: 3
            },
            {
                type: 'info',
                icon: 'fas fa-clock',
                title: 'Consultas Atrasadas',
                description: '2 consultas com atraso >15min',
                action: 'Reorganizar',
                count: 2
            },
            {
                type: 'success',
                icon: 'fas fa-chart-line',
                title: 'Ocupação da Agenda',
                description: 'Taxa de ocupação 15% acima da média',
                action: 'Ver relatório',
                count: 85
            }
        ];
    }

    renderAIInsights(insightsData) {
        const insightsContainer = document.querySelector('.ai-insights');
        if (!insightsContainer) return;

        insightsContainer.innerHTML = insightsData.map(insight => `
            <div class="insight-card" data-insight-type="${insight.type}">
                <div class="insight-icon ${insight.type}">
                    <i class="${insight.icon}"></i>
                </div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                    <button class="btn btn-sm btn-outline" onclick="dashboardManager.handleInsightAction('${insight.type}')">
                        ${insight.action}
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateRealTimeData();
        }, 30000);
    }

    updateRealTimeData() {
        // Update waiting patients count
        const waitingCount = Math.floor(Math.random() * 5) + 1;
        this.animateCounter('.stat-card:nth-child(2) h3', waitingCount);
        
        // Update today's revenue
        const revenue = Math.floor(Math.random() * 500) + 2000;
        this.animateCounter('.stat-card:nth-child(4) h3', revenue, 'currency');
        
        // Show notification for significant changes
        if (Math.random() > 0.7) {
            app.showToast('Dados atualizados em tempo real', 'info', 3000);
        }
    }

    // Action methods
    startAppointment(appointmentId) {
        app.showToast('Iniciando atendimento...', 'info');
        
        // Simulate loading
        setTimeout(() => {
            app.navigateToPage('pep');
            app.showToast('Atendimento iniciado com sucesso', 'success');
        }, 1000);
    }

    showAppointmentOptions(appointmentId) {
        // Create context menu or modal with options
        const options = [
            { label: 'Confirmar consulta', action: () => this.confirmAppointment(appointmentId) },
            { label: 'Cancelar consulta', action: () => this.cancelAppointment(appointmentId) },
            { label: 'Reagendar', action: () => this.rescheduleAppointment(appointmentId) },
            { label: 'Enviar lembrete', action: () => this.sendReminder(appointmentId) }
        ];
        
        this.showContextMenu(options);
    }

    confirmAppointment(appointmentId) {
        app.showToast('Consulta confirmada', 'success');
        this.updateAppointmentStatus(appointmentId, 'confirmado');
    }

    cancelAppointment(appointmentId) {
        if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
            app.showToast('Consulta cancelada', 'warning');
            this.updateAppointmentStatus(appointmentId, 'cancelled');
        }
    }

    rescheduleAppointment(appointmentId) {
        app.showToast('Abrindo agenda para reagendamento...', 'info');
        // Navigate to agenda with pre-selected appointment
        setTimeout(() => {
            app.navigateToPage('agenda');
        }, 500);
    }

    sendReminder(appointmentId) {
        app.showToast('Lembrete enviado por WhatsApp', 'success');
    }

    updateAppointmentStatus(appointmentId, status) {
        const appointmentElement = document.querySelector(`[data-appointment-id="${appointmentId}"]`);
        if (appointmentElement) {
            const statusElement = appointmentElement.querySelector('.status-indicator');
            statusElement.className = `status-indicator ${status}`;
            statusElement.textContent = this.getStatusText(status);
        }
    }

    showContextMenu(options) {
        // Simple context menu implementation
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            background: white;
            border: 1px solid var(--gray-200);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow-lg);
            z-index: 2000;
            min-width: 150px;
        `;
        
        menu.innerHTML = options.map(option => `
            <div class="context-menu-item" onclick="${option.action.toString()}; this.parentElement.remove()">
                ${option.label}
            </div>
        `).join('');
        
        document.body.appendChild(menu);
        
        // Position menu
        const rect = event.target.getBoundingClientRect();
        menu.style.left = `${rect.right}px`;
        menu.style.top = `${rect.top}px`;
        
        // Remove menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', () => {
                menu.remove();
            }, { once: true });
        }, 100);
    }

    handleInsightAction(insightType) {
        switch (insightType) {
            case 'warning':
                app.navigateToPage('agenda');
                app.showToast('Mostrando pacientes com alto risco de no-show', 'info');
                break;
            case 'info':
                app.navigateToPage('agenda');
                app.showToast('Reorganizando consultas atrasadas', 'info');
                break;
            case 'success':
                app.navigateToPage('financial');
                app.showToast('Abrindo relatório de ocupação', 'info');
                break;
        }
    }

    showAppointmentDetails(patientName) {
        app.showToast(`Carregando detalhes de ${patientName}`, 'info');
        // Could open a modal or navigate to appointment details
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
}

// Initialize dashboard manager when dashboard page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dashboard-page')) {
        window.dashboardManager = new DashboardManager();
    }
});

// Add context menu styles
const contextMenuStyles = `
.context-menu {
    position: fixed;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-lg);
    z-index: 2000;
    min-width: 150px;
    overflow: hidden;
}

.context-menu-item {
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    transition: var(--transition-fast);
    font-size: var(--font-size-sm);
    color: var(--gray-700);
}

.context-menu-item:hover {
    background: var(--gray-50);
    color: var(--gray-900);
}

.context-menu-item:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
}
`;

// Inject context menu styles
const contextStyleSheet = document.createElement('style');
contextStyleSheet.textContent = contextMenuStyles;
document.head.appendChild(contextStyleSheet);
