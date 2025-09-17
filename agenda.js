// Agenda JavaScript for MVP Lazaro System

class AgendaManager {
    constructor() {
        this.currentView = 'day';
        this.currentDate = new Date();
        this.appointments = [];
        this.waitlist = [];
        this.professionals = [];
        this.rooms = [];
        this.filters = {
            professional: 'all',
            room: 'all',
            status: 'all',
            type: 'all'
        };
        
        this.init();
    }

    init() {
        this.loadAgendaPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadAgendaPage() {
        const agendaPage = document.getElementById('agenda-page');
        if (!agendaPage) return;

        agendaPage.innerHTML = `
            <div class="agenda-container">
                <div class="agenda-main">
                    <div class="agenda-header">
                        <div class="agenda-title">
                            <h1>Agenda</h1>
                            <div class="agenda-date" id="currentDateDisplay"></div>
                        </div>
                        <div class="agenda-controls">
                            <div class="date-navigation">
                                <button class="date-btn" id="prevDate">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <div class="current-date" id="currentDate"></div>
                                <button class="date-btn" id="nextDate">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                                <button class="date-btn" id="todayBtn">Hoje</button>
                            </div>
                            <div class="view-toggle">
                                <button class="view-btn active" data-view="day">Dia</button>
                                <button class="view-btn" data-view="week">Semana</button>
                                <button class="view-btn" data-view="month">Mês</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="agenda-toolbar">
                        <div class="agenda-filters">
                            <div class="filter-group">
                                <label class="filter-label">Profissional:</label>
                                <select class="filter-select" id="professionalFilter">
                                    <option value="all">Todos</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label class="filter-label">Sala:</label>
                                <select class="filter-select" id="roomFilter">
                                    <option value="all">Todas</option>
                                </select>
                            </div>
                            <div class="filter-group">
                                <label class="filter-label">Status:</label>
                                <select class="filter-select" id="statusFilter">
                                    <option value="all">Todos</option>
                                    <option value="confirmed">Confirmado</option>
                                    <option value="pending">Pendente</option>
                                    <option value="check-in">Check-in</option>
                                    <option value="completed">Concluído</option>
                                    <option value="cancelled">Cancelado</option>
                                </select>
                            </div>
                        </div>
                        <div class="agenda-actions">
                            <button class="btn btn-primary" id="newAppointmentBtn">
                                <i class="fas fa-plus"></i>
                                Nova Consulta
                            </button>
                            <button class="btn btn-secondary" id="blockTimeBtn">
                                <i class="fas fa-ban"></i>
                                Bloquear Horário
                            </button>
                        </div>
                    </div>
                    
                    <div class="agenda-content" id="agendaContent">
                        <!-- Agenda views will be loaded here -->
                    </div>
                </div>
                
                <div class="agenda-sidebar">
                    <div class="sidebar-section">
                        <div class="sidebar-header">Ações Rápidas</div>
                        <div class="sidebar-content">
                            <div class="quick-actions">
                                <button class="quick-action" onclick="agendaManager.openNewAppointment()">
                                    <i class="fas fa-plus"></i>
                                    <span>Nova Consulta</span>
                                </button>
                                <button class="quick-action" onclick="agendaManager.openTeleconsultation()">
                                    <i class="fas fa-video"></i>
                                    <span>Teleconsulta</span>
                                </button>
                                <button class="quick-action" onclick="agendaManager.openBlockTime()">
                                    <i class="fas fa-ban"></i>
                                    <span>Bloquear Horário</span>
                                </button>
                                <button class="quick-action" onclick="agendaManager.openRecurringAppointment()">
                                    <i class="fas fa-repeat"></i>
                                    <span>Consulta Recorrente</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-header">Fila de Espera</div>
                        <div class="sidebar-content">
                            <div class="waitlist" id="waitlist">
                                <!-- Waitlist items will be loaded here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-header">Lembretes Pendentes</div>
                        <div class="sidebar-content">
                            <div class="reminders-list" id="remindersList">
                                <!-- Reminders will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupAgendaEventListeners();
    }

    setupEventListeners() {
        // This will be called when the agenda page is loaded
    }

    setupAgendaEventListeners() {
        // Date navigation
        document.getElementById('prevDate').addEventListener('click', () => {
            this.navigateDate(-1);
        });

        document.getElementById('nextDate').addEventListener('click', () => {
            this.navigateDate(1);
        });

        document.getElementById('todayBtn').addEventListener('click', () => {
            this.goToToday();
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Filters
        document.getElementById('professionalFilter').addEventListener('change', (e) => {
            this.filters.professional = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('roomFilter').addEventListener('change', (e) => {
            this.filters.room = e.target.value;
            this.renderCurrentView();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderCurrentView();
        });

        // Actions
        document.getElementById('newAppointmentBtn').addEventListener('click', () => {
            this.openNewAppointment();
        });

        document.getElementById('blockTimeBtn').addEventListener('click', () => {
            this.openBlockTime();
        });
    }

    loadInitialData() {
        this.loadProfessionals();
        this.loadRooms();
        this.loadAppointments();
        this.loadWaitlist();
        this.loadReminders();
        this.updateDateDisplay();
        this.renderCurrentView();
    }

    loadProfessionals() {
        // Mock data - in real app, this would come from API
        this.professionals = [
            { id: 1, name: 'Dr. João Silva', specialty: 'Clínico Geral' },
            { id: 2, name: 'Dra. Maria Santos', specialty: 'Cardiologia' },
            { id: 3, name: 'Dr. Pedro Costa', specialty: 'Dermatologia' }
        ];

        const select = document.getElementById('professionalFilter');
        if (select) {
            select.innerHTML = '<option value="all">Todos</option>' +
                this.professionals.map(prof => 
                    `<option value="${prof.id}">${prof.name}</option>`
                ).join('');
        }
    }

    loadRooms() {
        // Mock data
        this.rooms = [
            { id: 1, name: 'Sala 1', type: 'Consulta' },
            { id: 2, name: 'Sala 2', type: 'Consulta' },
            { id: 3, name: 'Sala Telemedicina', type: 'Telemedicina' }
        ];

        const select = document.getElementById('roomFilter');
        if (select) {
            select.innerHTML = '<option value="all">Todas</option>' +
                this.rooms.map(room => 
                    `<option value="${room.id}">${room.name}</option>`
                ).join('');
        }
    }

    loadAppointments() {
        // Mock data - in real app, this would come from API
        this.appointments = [
            {
                id: 1,
                patient: 'Maria Silva',
                professional: 1,
                room: 1,
                start: new Date(2024, 0, 15, 8, 0),
                end: new Date(2024, 0, 15, 8, 30),
                type: 'Consulta',
                channel: 'presencial',
                status: 'confirmed',
                notes: 'Retorno - controle pressão'
            },
            {
                id: 2,
                patient: 'João Santos',
                professional: 1,
                room: 3,
                start: new Date(2024, 0, 15, 8, 30),
                end: new Date(2024, 0, 15, 9, 0),
                type: 'Teleconsulta',
                channel: 'telemedicina',
                status: 'pending',
                notes: 'Primeira consulta'
            },
            {
                id: 3,
                patient: 'Ana Costa',
                professional: 2,
                room: 2,
                start: new Date(2024, 0, 15, 9, 0),
                end: new Date(2024, 0, 15, 9, 30),
                type: 'Consulta',
                channel: 'presencial',
                status: 'check-in',
                notes: 'Exame cardiológico'
            },
            {
                id: 4,
                patient: 'Pedro Oliveira',
                professional: 1,
                room: 1,
                start: new Date(2024, 0, 15, 10, 0),
                end: new Date(2024, 0, 15, 10, 30),
                type: 'Consulta',
                channel: 'presencial',
                status: 'confirmed',
                notes: 'Consulta de rotina'
            }
        ];
    }

    loadWaitlist() {
        // Mock data
        this.waitlist = [
            {
                id: 1,
                patient: 'Carla Mendes',
                phone: '(11) 99999-9999',
                preferredTime: '14:00',
                notes: 'Urgente - dor de cabeça'
            },
            {
                id: 2,
                patient: 'Roberto Lima',
                phone: '(11) 88888-8888',
                preferredTime: '15:30',
                notes: 'Retorno'
            }
        ];

        this.renderWaitlist();
    }

    loadReminders() {
        // Mock data
        const reminders = [
            {
                id: 1,
                patient: 'Maria Silva',
                time: '08:00',
                type: 'Confirmação',
                status: 'pending'
            },
            {
                id: 2,
                patient: 'João Santos',
                time: '08:30',
                type: 'Lembrete',
                status: 'pending'
            }
        ];

        this.renderReminders(reminders);
    }

    renderWaitlist() {
        const waitlistContainer = document.getElementById('waitlist');
        if (!waitlistContainer) return;

        waitlistContainer.innerHTML = this.waitlist.map(item => `
            <div class="waitlist-item" draggable="true" data-waitlist-id="${item.id}">
                <div class="waitlist-patient">
                    <div>${item.patient}</div>
                    <div class="waitlist-preference">Prefere: ${item.preferredTime}</div>
                </div>
                <div class="waitlist-actions">
                    <button class="waitlist-action" onclick="agendaManager.scheduleFromWaitlist(${item.id})" title="Agendar">
                        <i class="fas fa-calendar-plus"></i>
                    </button>
                    <button class="waitlist-action" onclick="agendaManager.removeFromWaitlist(${item.id})" title="Remover">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderReminders(reminders) {
        const remindersContainer = document.getElementById('remindersList');
        if (!remindersContainer) return;

        remindersContainer.innerHTML = reminders.map(reminder => `
            <div class="reminder-item">
                <div class="reminder-time">${reminder.time}</div>
                <div class="reminder-patient">${reminder.patient}</div>
                <div class="reminder-type">${reminder.type}</div>
                <button class="btn btn-sm btn-primary" onclick="agendaManager.sendReminder(${reminder.id})">
                    Enviar
                </button>
            </div>
        `).join('');
    }

    navigateDate(direction) {
        const newDate = new Date(this.currentDate);
        
        switch (this.currentView) {
            case 'day':
                newDate.setDate(newDate.getDate() + direction);
                break;
            case 'week':
                newDate.setDate(newDate.getDate() + (direction * 7));
                break;
            case 'month':
                newDate.setMonth(newDate.getMonth() + direction);
                break;
        }
        
        this.currentDate = newDate;
        this.updateDateDisplay();
        this.renderCurrentView();
    }

    goToToday() {
        this.currentDate = new Date();
        this.updateDateDisplay();
        this.renderCurrentView();
    }

    switchView(view) {
        this.currentView = view;
        
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        this.renderCurrentView();
    }

    updateDateDisplay() {
        const dateDisplay = document.getElementById('currentDateDisplay');
        const currentDate = document.getElementById('currentDate');
        
        if (dateDisplay) {
            dateDisplay.textContent = this.formatDateForDisplay();
        }
        
        if (currentDate) {
            currentDate.textContent = this.formatCurrentDate();
        }
    }

    formatDateForDisplay() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return this.currentDate.toLocaleDateString('pt-BR', options);
    }

    formatCurrentDate() {
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        };
        return this.currentDate.toLocaleDateString('pt-BR', options);
    }

    renderCurrentView() {
        const content = document.getElementById('agendaContent');
        if (!content) return;

        const filteredAppointments = this.getFilteredAppointments();

        switch (this.currentView) {
            case 'day':
                content.innerHTML = this.renderDayView(filteredAppointments);
                break;
            case 'week':
                content.innerHTML = this.renderWeekView(filteredAppointments);
                break;
            case 'month':
                content.innerHTML = this.renderMonthView(filteredAppointments);
                break;
        }

        this.setupViewEventListeners();
    }

    getFilteredAppointments() {
        return this.appointments.filter(appointment => {
            if (this.filters.professional !== 'all' && appointment.professional != this.filters.professional) {
                return false;
            }
            if (this.filters.room !== 'all' && appointment.room != this.filters.room) {
                return false;
            }
            if (this.filters.status !== 'all' && appointment.status !== this.filters.status) {
                return false;
            }
            return true;
        });
    }

    renderDayView(appointments) {
        const dayAppointments = appointments.filter(apt => 
            this.isSameDay(apt.start, this.currentDate)
        );

        return `
            <div class="day-view">
                <div class="day-timeline">
                    <div class="timeline-hours">
                        ${this.generateTimeSlots().map(time => `
                            <div class="timeline-hour">${time}</div>
                        `).join('')}
                    </div>
                    <div class="timeline-slots">
                        ${this.generateTimeSlots().map(time => `
                            <div class="timeline-slot" data-time="${time}" onclick="agendaManager.createAppointmentAtTime('${time}')"></div>
                        `).join('')}
                        ${dayAppointments.map(appointment => this.renderAppointmentBlock(appointment)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderWeekView(appointments) {
        const weekAppointments = appointments.filter(apt => 
            this.isInWeek(apt.start, this.currentDate)
        );

        const weekDays = this.getWeekDays();
        
        return `
            <div class="week-view">
                <div class="week-header">
                    <div class="week-day-header"></div>
                    ${weekDays.map(day => `
                        <div class="week-day-header ${this.isToday(day) ? 'today' : ''} ${this.isWeekend(day) ? 'weekend' : ''}">
                            <div>${day.toLocaleDateString('pt-BR', { weekday: 'short' })}</div>
                            <div>${day.getDate()}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="week-grid">
                    <div class="week-time-column">
                        ${this.generateTimeSlots().map(time => `
                            <div class="week-time-slot">${time}</div>
                        `).join('')}
                    </div>
                    ${weekDays.map(day => `
                        <div class="week-day-column">
                            ${this.generateTimeSlots().map(time => `
                                <div class="week-day-slot" data-day="${day.toISOString().split('T')[0]}" data-time="${time}" onclick="agendaManager.createAppointmentAtSlot('${day.toISOString().split('T')[0]}', '${time}')"></div>
                            `).join('')}
                            ${weekAppointments.filter(apt => this.isSameDay(apt.start, day)).map(appointment => this.renderWeekAppointment(appointment)).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderMonthView(appointments) {
        const monthAppointments = appointments.filter(apt => 
            this.isInMonth(apt.start, this.currentDate)
        );

        const monthDays = this.getMonthDays();
        
        return `
            <div class="month-view">
                <div class="month-grid">
                    ${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => `
                        <div class="month-day-header">${day}</div>
                    `).join('')}
                    ${monthDays.map(day => `
                        <div class="month-day ${this.isToday(day) ? 'today' : ''} ${this.isOtherMonth(day) ? 'other-month' : ''} ${this.isWeekend(day) ? 'weekend' : ''}" 
                             onclick="agendaManager.createAppointmentOnDay('${day.toISOString().split('T')[0]}')">
                            <div class="month-day-number">${day.getDate()}</div>
                            <div class="month-appointments">
                                ${monthAppointments.filter(apt => this.isSameDay(apt.start, day)).slice(0, 3).map(appointment => `
                                    <div class="month-appointment ${appointment.channel}" onclick="event.stopPropagation(); agendaManager.showAppointmentDetails(${appointment.id})">
                                        ${appointment.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${appointment.patient}
                                    </div>
                                `).join('')}
                                ${monthAppointments.filter(apt => this.isSameDay(apt.start, day)).length > 3 ? `
                                    <div class="month-appointment more">
                                        +${monthAppointments.filter(apt => this.isSameDay(apt.start, day)).length - 3} mais
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderAppointmentBlock(appointment) {
        const startTime = appointment.start.getHours() * 60 + appointment.start.getMinutes();
        const endTime = appointment.end.getHours() * 60 + appointment.end.getMinutes();
        const duration = endTime - startTime;
        const top = (startTime - 480) * 1; // 8:00 AM = 480 minutes
        const height = duration * 1;

        return `
            <div class="appointment-block ${appointment.channel} ${appointment.status}" 
                 style="top: ${top}px; height: ${height}px;"
                 onclick="agendaManager.showAppointmentDetails(${appointment.id})">
                <div class="appointment-time">${appointment.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                <div class="appointment-patient">${appointment.patient}</div>
                <div class="appointment-details">
                    <span>${appointment.type}</span>
                    <span class="appointment-status ${appointment.status}">${this.getStatusText(appointment.status)}</span>
                </div>
            </div>
        `;
    }

    renderWeekAppointment(appointment) {
        const startTime = appointment.start.getHours() * 60 + appointment.start.getMinutes();
        const endTime = appointment.end.getHours() * 60 + appointment.end.getMinutes();
        const duration = endTime - startTime;
        const top = (startTime - 480) * 1;
        const height = duration * 1;

        return `
            <div class="week-appointment ${appointment.channel}" 
                 style="top: ${top}px; height: ${height}px;"
                 onclick="agendaManager.showAppointmentDetails(${appointment.id})">
                ${appointment.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${appointment.patient}
            </div>
        `;
    }

    generateTimeSlots() {
        const slots = [];
        for (let hour = 8; hour < 18; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return slots;
    }

    getWeekDays() {
        const weekDays = [];
        const startOfWeek = new Date(this.currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            weekDays.push(day);
        }
        
        return weekDays;
    }

    getMonthDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const days = [];
        for (let i = 0; i < 42; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(day);
        }
        
        return days;
    }

    // Utility methods
    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    isInWeek(date, weekDate) {
        const startOfWeek = new Date(weekDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        
        return date >= startOfWeek && date <= endOfWeek;
    }

    isInMonth(date, monthDate) {
        return date.getMonth() === monthDate.getMonth() &&
               date.getFullYear() === monthDate.getFullYear();
    }

    isToday(date) {
        const today = new Date();
        return this.isSameDay(date, today);
    }

    isWeekend(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    isOtherMonth(date) {
        return date.getMonth() !== this.currentDate.getMonth();
    }

    getStatusText(status) {
        const statusMap = {
            'confirmed': 'Confirmado',
            'pending': 'Pendente',
            'check-in': 'Check-in',
            'completed': 'Concluído',
            'cancelled': 'Cancelado'
        };
        return statusMap[status] || status;
    }

    setupViewEventListeners() {
        // Setup drag and drop for waitlist items
        document.querySelectorAll('.waitlist-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.waitlistId);
                e.target.classList.add('dragging');
            });
            
            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        // Setup drop zones for appointments
        document.querySelectorAll('.timeline-slot, .week-day-slot').forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.target.classList.add('drag-over');
            });
            
            slot.addEventListener('dragleave', (e) => {
                e.target.classList.remove('drag-over');
            });
            
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                e.target.classList.remove('drag-over');
                const waitlistId = e.dataTransfer.getData('text/plain');
                const time = e.target.dataset.time;
                const day = e.target.dataset.day;
                this.scheduleFromWaitlistAtTime(waitlistId, day, time);
            });
        });
    }

    // Action methods
    openNewAppointment() {
        this.showAppointmentModal();
    }

    openTeleconsultation() {
        this.showAppointmentModal('telemedicina');
    }

    openBlockTime() {
        this.showBlockTimeModal();
    }

    openRecurringAppointment() {
        this.showRecurringAppointmentModal();
    }

    createAppointmentAtTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(this.currentDate);
        appointmentDate.setHours(hours, minutes, 0, 0);
        
        this.showAppointmentModal('presencial', appointmentDate);
    }

    createAppointmentAtSlot(day, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(day);
        appointmentDate.setHours(hours, minutes, 0, 0);
        
        this.showAppointmentModal('presencial', appointmentDate);
    }

    createAppointmentOnDay(day) {
        const appointmentDate = new Date(day);
        appointmentDate.setHours(9, 0, 0, 0);
        
        this.showAppointmentModal('presencial', appointmentDate);
    }

    showAppointmentModal(channel = 'presencial', startDate = null) {
        // Create and show appointment modal
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content appointment-modal">
                <div class="modal-header">
                    <h3>Nova Consulta</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="appointment-form" id="appointmentForm">
                        <div class="form-group full-width">
                            <label class="form-label">Paciente</label>
                            <input type="text" class="form-control" id="patientName" placeholder="Nome do paciente" required>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Profissional</label>
                            <select class="form-control" id="appointmentProfessional" required>
                                ${this.professionals.map(prof => 
                                    `<option value="${prof.id}">${prof.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Sala</label>
                            <select class="form-control" id="appointmentRoom" required>
                                ${this.rooms.map(room => 
                                    `<option value="${room.id}">${room.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Data</label>
                            <input type="date" class="form-control" id="appointmentDate" required>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Hora</label>
                            <input type="time" class="form-control" id="appointmentTime" required>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Duração (min)</label>
                            <select class="form-control" id="appointmentDuration">
                                <option value="30">30 minutos</option>
                                <option value="45">45 minutos</option>
                                <option value="60">60 minutos</option>
                            </select>
                        </div>
                        <div class="form-group half-width">
                            <label class="form-label">Tipo</label>
                            <select class="form-control" id="appointmentType">
                                <option value="Consulta">Consulta</option>
                                <option value="Retorno">Retorno</option>
                                <option value="Teleconsulta">Teleconsulta</option>
                            </select>
                        </div>
                        <div class="form-group full-width">
                            <label class="form-label">Observações</label>
                            <textarea class="form-control" id="appointmentNotes" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="agendaManager.closeModal()">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="agendaManager.saveAppointment()">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Set default values
        if (startDate) {
            document.getElementById('appointmentDate').value = startDate.toISOString().split('T')[0];
            document.getElementById('appointmentTime').value = startDate.toTimeString().slice(0, 5);
        } else {
            document.getElementById('appointmentDate').value = this.currentDate.toISOString().split('T')[0];
        }
        
        if (channel === 'telemedicina') {
            document.getElementById('appointmentType').value = 'Teleconsulta';
            document.getElementById('appointmentRoom').value = '3'; // Telemedicina room
        }
    }

    showBlockTimeModal() {
        // Similar to appointment modal but for blocking time
        app.showToast('Modal de bloqueio de horário em desenvolvimento', 'info');
    }

    showRecurringAppointmentModal() {
        // Similar to appointment modal but for recurring appointments
        app.showToast('Modal de consulta recorrente em desenvolvimento', 'info');
    }

    saveAppointment() {
        const form = document.getElementById('appointmentForm');
        const formData = new FormData(form);
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Create appointment object
        const appointment = {
            id: Date.now(),
            patient: document.getElementById('patientName').value,
            professional: parseInt(document.getElementById('appointmentProfessional').value),
            room: parseInt(document.getElementById('appointmentRoom').value),
            start: new Date(document.getElementById('appointmentDate').value + 'T' + document.getElementById('appointmentTime').value),
            end: new Date(document.getElementById('appointmentDate').value + 'T' + document.getElementById('appointmentTime').value),
            type: document.getElementById('appointmentType').value,
            channel: document.getElementById('appointmentType').value === 'Teleconsulta' ? 'telemedicina' : 'presencial',
            status: 'pending',
            notes: document.getElementById('appointmentNotes').value
        };
        
        // Add duration
        const duration = parseInt(document.getElementById('appointmentDuration').value);
        appointment.end.setMinutes(appointment.end.getMinutes() + duration);
        
        // Add to appointments
        this.appointments.push(appointment);
        
        // Close modal and refresh view
        this.closeModal();
        this.renderCurrentView();
        
        app.showToast('Consulta agendada com sucesso', 'success');
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }

    showAppointmentDetails(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) return;
        
        app.showToast(`Detalhes da consulta de ${appointment.patient}`, 'info');
        // Could open a detailed modal here
    }

    scheduleFromWaitlist(waitlistId) {
        const waitlistItem = this.waitlist.find(item => item.id == waitlistId);
        if (!waitlistItem) return;
        
        this.showAppointmentModal('presencial');
        // Pre-fill patient name
        setTimeout(() => {
            document.getElementById('patientName').value = waitlistItem.patient;
        }, 100);
    }

    scheduleFromWaitlistAtTime(waitlistId, day, time) {
        const waitlistItem = this.waitlist.find(item => item.id == waitlistId);
        if (!waitlistItem) return;
        
        // Create appointment directly
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(day);
        appointmentDate.setHours(hours, minutes, 0, 0);
        
        const appointment = {
            id: Date.now(),
            patient: waitlistItem.patient,
            professional: 1, // Default professional
            room: 1, // Default room
            start: appointmentDate,
            end: new Date(appointmentDate.getTime() + 30 * 60000), // 30 minutes
            type: 'Consulta',
            channel: 'presencial',
            status: 'pending',
            notes: waitlistItem.notes
        };
        
        this.appointments.push(appointment);
        this.removeFromWaitlist(waitlistId);
        this.renderCurrentView();
        
        app.showToast(`Consulta agendada para ${waitlistItem.patient}`, 'success');
    }

    removeFromWaitlist(waitlistId) {
        this.waitlist = this.waitlist.filter(item => item.id != waitlistId);
        this.renderWaitlist();
    }

    sendReminder(reminderId) {
        app.showToast('Lembrete enviado com sucesso', 'success');
    }
}

// Initialize agenda manager when agenda page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('agenda-page')) {
        window.agendaManager = new AgendaManager();
    }
});

// Override the loadAgenda method in main.js
if (window.app) {
    window.app.loadAgenda = function() {
        if (!window.agendaManager) {
            window.agendaManager = new AgendaManager();
        }
    };
}
