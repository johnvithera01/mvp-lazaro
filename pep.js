// PEP (Prontuário Eletrônico) JavaScript for MVP Lazaro System

class PEPManager {
    constructor() {
        this.currentPatient = null;
        this.currentEncounter = null;
        this.activeTab = 'evolution';
        this.evolutionContent = '';
        this.documents = [];
        this.attachments = [];
        this.templates = [];
        
        this.init();
    }

    init() {
        this.loadPEPPage();
        this.setupEventListeners();
        this.loadInitialData();
    }

    loadPEPPage() {
        const pepPage = document.getElementById('pep-page');
        if (!pepPage) return;

        pepPage.innerHTML = `
            <div class="pep-container">
                <div class="pep-sidebar">
                    <div class="pep-patient-card" id="pepPatientCard">
                        <div class="pep-patient-header">
                            <div class="pep-patient-avatar-large" id="pepPatientAvatar">?</div>
                            <div class="pep-patient-name-large" id="pepPatientName">Selecione um paciente</div>
                            <div class="pep-patient-id" id="pepPatientId">ID: -</div>
                            
                            <div class="pep-patient-alerts" id="pepPatientAlerts">
                                <!-- Alerts will be loaded here -->
                            </div>
                        </div>
                        <div class="pep-patient-body" id="pepPatientBody">
                            <div class="empty-state">
                                <i class="fas fa-user"></i>
                                <h3>Nenhum paciente selecionado</h3>
                                <p>Selecione um paciente para acessar o prontuário</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pep-main">
                    <div class="pep-header">
                        <div class="pep-title">
                            <h1>Prontuário Eletrônico</h1>
                            <div class="pep-patient-info" id="pepPatientInfo" style="display: none;">
                                <div class="pep-patient-avatar" id="pepPatientAvatarSmall">?</div>
                                <div class="pep-patient-details">
                                    <div class="pep-patient-name" id="pepPatientNameSmall">-</div>
                                    <div class="pep-patient-meta" id="pepPatientMeta">-</div>
                                </div>
                            </div>
                        </div>
                        <div class="pep-actions">
                            <button class="btn btn-outline" onclick="pepManager.printPEP()" id="printPEPBtn" disabled>
                                <i class="fas fa-print"></i>
                                Imprimir
                            </button>
                            <button class="btn btn-outline" onclick="pepManager.exportPEP()" id="exportPEPBtn" disabled>
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                            <button class="btn btn-primary" onclick="pepManager.saveEncounter()" id="saveEncounterBtn" disabled>
                                <i class="fas fa-save"></i>
                                Salvar
                            </button>
                        </div>
                    </div>
                    
                    <div class="pep-tabs">
                        <button class="pep-tab active" data-tab="evolution">
                            <i class="fas fa-file-medical"></i>
                            Evolução
                        </button>
                        <button class="pep-tab" data-tab="documents">
                            <i class="fas fa-file-alt"></i>
                            Documentos
                        </button>
                        <button class="pep-tab" data-tab="attachments">
                            <i class="fas fa-paperclip"></i>
                            Anexos
                        </button>
                        <button class="pep-tab" data-tab="history">
                            <i class="fas fa-history"></i>
                            Histórico
                        </button>
                    </div>
                    
                    <div class="pep-tab-content">
                        <!-- Evolution Tab -->
                        <div class="pep-tab-pane active" id="evolution-tab">
                            <div class="evolution-editor">
                                <div class="evolution-toolbar">
                                    <div class="evolution-tools">
                                        <button class="evolution-tool" data-format="bold" title="Negrito">
                                            <i class="fas fa-bold"></i>
                                        </button>
                                        <button class="evolution-tool" data-format="italic" title="Itálico">
                                            <i class="fas fa-italic"></i>
                                        </button>
                                        <button class="evolution-tool" data-format="underline" title="Sublinhado">
                                            <i class="fas fa-underline"></i>
                                        </button>
                                        <button class="evolution-tool" data-format="bulletList" title="Lista">
                                            <i class="fas fa-list-ul"></i>
                                        </button>
                                    </div>
                                    <div class="evolution-ai-tools">
                                        <button class="ai-scribe-btn" onclick="pepManager.openAIScribe()">
                                            <i class="fas fa-microphone"></i>
                                            IA Scribe
                                        </button>
                                        <button class="btn btn-outline" onclick="pepManager.loadTemplate()">
                                            <i class="fas fa-file-text"></i>
                                            Template
                                        </button>
                                    </div>
                                </div>
                                
                                <textarea class="evolution-textarea" id="evolutionTextarea" 
                                          placeholder="Digite a evolução do paciente aqui..."></textarea>
                                
                                <div class="evolution-templates" id="evolutionTemplates">
                                    <!-- Templates will be loaded here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Documents Tab -->
                        <div class="pep-tab-pane" id="documents-tab">
                            <div class="documents-grid" id="documentsGrid">
                                <!-- Documents will be loaded here -->
                            </div>
                        </div>
                        
                        <!-- Attachments Tab -->
                        <div class="pep-tab-pane" id="attachments-tab">
                            <div class="attachments-upload" id="attachmentsUpload">
                                <div class="ai-scribe-upload-icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div class="ai-scribe-upload-text">Arraste arquivos aqui ou clique para selecionar</div>
                                <div class="ai-scribe-upload-subtext">PDF, JPG, PNG até 10MB</div>
                            </div>
                            <div class="attachments-list" id="attachmentsList">
                                <!-- Attachments will be loaded here -->
                            </div>
                        </div>
                        
                        <!-- History Tab -->
                        <div class="pep-tab-pane" id="history-tab">
                            <div class="encounter-history" id="encounterHistory">
                                <!-- History will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupPEPEventListeners();
    }

    setupEventListeners() {
        // This will be called when the PEP page is loaded
    }

    setupPEPEventListeners() {
        // Tab switching
        document.querySelectorAll('.pep-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Evolution textarea
        const evolutionTextarea = document.getElementById('evolutionTextarea');
        if (evolutionTextarea) {
            evolutionTextarea.addEventListener('input', (e) => {
                this.evolutionContent = e.target.value;
                this.updateSaveButton();
            });
        }

        // Formatting tools
        document.querySelectorAll('.evolution-tool').forEach(tool => {
            tool.addEventListener('click', (e) => {
                this.applyFormatting(e.target.dataset.format);
            });
        });

        // File upload
        const attachmentsUpload = document.getElementById('attachmentsUpload');
        if (attachmentsUpload) {
            attachmentsUpload.addEventListener('click', () => {
                this.openFileUpload();
            });

            attachmentsUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                attachmentsUpload.classList.add('dragover');
            });

            attachmentsUpload.addEventListener('dragleave', () => {
                attachmentsUpload.classList.remove('dragover');
            });

            attachmentsUpload.addEventListener('drop', (e) => {
                e.preventDefault();
                attachmentsUpload.classList.remove('dragover');
                this.handleFileUpload(e.dataTransfer.files);
            });
        }
    }

    loadInitialData() {
        this.loadTemplates();
        this.loadMockPatient();
    }

    loadMockPatient() {
        // Mock patient data - in real app, this would come from the selected patient
        this.currentPatient = {
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
            alerts: [
                { type: 'danger', message: 'Alergia a penicilina' },
                { type: 'warning', message: 'Hipertensão descompensada' }
            ]
        };

        this.currentEncounter = {
            id: Date.now(),
            patientId: this.currentPatient.id,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().slice(0, 5),
            type: 'Consulta',
            professional: 'Dr. João Silva',
            status: 'draft',
            evolution: '',
            documents: [],
            attachments: []
        };

        this.renderPatientInfo();
        this.loadDocuments();
        this.loadAttachments();
        this.loadEncounterHistory();
    }

    loadTemplates() {
        // Mock templates - in real app, this would come from API
        this.templates = [
            {
                id: 1,
                name: 'Consulta Geral',
                description: 'Template para consulta de clínica geral',
                content: `S: Paciente relata [queixa principal].
O: [Exame físico - sinais vitais, inspeção, palpação, percussão, ausculta].
A: [Diagnóstico clínico].
P: [Plano terapêutico - medicações, orientações, retorno].`
            },
            {
                id: 2,
                name: 'Retorno',
                description: 'Template para consulta de retorno',
                content: `S: Paciente retorna para acompanhamento de [condição].
O: [Evolução dos sintomas, exame físico].
A: [Avaliação da evolução].
P: [Ajustes no tratamento, orientações, próximo retorno].`
            },
            {
                id: 3,
                name: 'Urgência',
                description: 'Template para atendimento de urgência',
                content: `S: Paciente apresenta [sintomas de urgência].
O: [Exame físico focado, sinais vitais].
A: [Diagnóstico de urgência].
P: [Conduta imediata, medicações, observação, encaminhamento].`
            }
        ];

        this.renderTemplates();
    }

    renderTemplates() {
        const templatesContainer = document.getElementById('evolutionTemplates');
        if (!templatesContainer) return;

        templatesContainer.innerHTML = this.templates.map(template => `
            <div class="template-item" onclick="pepManager.applyTemplate(${template.id})">
                <div>
                    <div class="template-name">${template.name}</div>
                    <div class="template-description">${template.description}</div>
                </div>
                <div class="template-actions">
                    <button class="template-action" onclick="event.stopPropagation(); pepManager.previewTemplate(${template.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderPatientInfo() {
        if (!this.currentPatient) return;

        // Update sidebar
        document.getElementById('pepPatientAvatar').textContent = this.getInitials(this.currentPatient.name);
        document.getElementById('pepPatientName').textContent = this.currentPatient.name;
        document.getElementById('pepPatientId').textContent = `ID: ${this.currentPatient.id}`;

        // Update alerts
        const alertsContainer = document.getElementById('pepPatientAlerts');
        if (alertsContainer) {
            alertsContainer.innerHTML = this.currentPatient.alerts.map(alert => `
                <div class="pep-alert ${alert.type}">
                    <i class="fas fa-${alert.type === 'danger' ? 'exclamation-triangle' : alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>${alert.message}</span>
                </div>
            `).join('');
        }

        // Update patient body
        const patientBody = document.getElementById('pepPatientBody');
        if (patientBody) {
            patientBody.innerHTML = `
                <div class="pep-patient-section">
                    <div class="pep-section-title">Informações Pessoais</div>
                    <div class="pep-section-content">
                        <div class="pep-field">
                            <span class="pep-field-label">CPF</span>
                            <span class="pep-field-value">${this.currentPatient.cpf}</span>
                        </div>
                        <div class="pep-field">
                            <span class="pep-field-label">Data de Nascimento</span>
                            <span class="pep-field-value">${this.formatDate(this.currentPatient.birthDate)} (${this.calculateAge(this.currentPatient.birthDate)} anos)</span>
                        </div>
                        <div class="pep-field">
                            <span class="pep-field-label">Telefone</span>
                            <span class="pep-field-value">${this.currentPatient.phone}</span>
                        </div>
                        <div class="pep-field">
                            <span class="pep-field-label">Email</span>
                            <span class="pep-field-value">${this.currentPatient.email}</span>
                        </div>
                    </div>
                </div>
                
                <div class="pep-patient-section">
                    <div class="pep-section-title">Convênio</div>
                    <div class="pep-section-content">
                        <div class="pep-field">
                            <span class="pep-field-label">Convênio</span>
                            <span class="pep-field-value">${this.currentPatient.insurance}</span>
                        </div>
                        <div class="pep-field">
                            <span class="pep-field-label">Número</span>
                            <span class="pep-field-value">${this.currentPatient.insuranceNumber}</span>
                        </div>
                    </div>
                </div>
                
                <div class="pep-patient-section">
                    <div class="pep-section-title">Histórico Médico</div>
                    <div class="pep-section-content">
                        <div class="pep-field">
                            <span class="pep-field-label">Alergias</span>
                            <span class="pep-field-value">${this.currentPatient.allergies.join(', ') || 'Nenhuma'}</span>
                        </div>
                        <div class="pep-field">
                            <span class="pep-field-label">Condições Crônicas</span>
                            <span class="pep-field-value">${this.currentPatient.chronicConditions.join(', ') || 'Nenhuma'}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Update header
        const patientInfo = document.getElementById('pepPatientInfo');
        if (patientInfo) {
            patientInfo.style.display = 'flex';
            document.getElementById('pepPatientAvatarSmall').textContent = this.getInitials(this.currentPatient.name);
            document.getElementById('pepPatientNameSmall').textContent = this.currentPatient.name;
            document.getElementById('pepPatientMeta').textContent = `${this.currentPatient.cpf} • ${this.currentPatient.phone}`;
        }

        // Enable action buttons
        document.getElementById('printPEPBtn').disabled = false;
        document.getElementById('exportPEPBtn').disabled = false;
        document.getElementById('saveEncounterBtn').disabled = false;
    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.pep-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab pane
        document.querySelectorAll('.pep-tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.activeTab = tabName;

        // Load tab-specific content
        switch (tabName) {
            case 'documents':
                this.loadDocuments();
                break;
            case 'attachments':
                this.loadAttachments();
                break;
            case 'history':
                this.loadEncounterHistory();
                break;
        }
    }

    applyFormatting(format) {
        const textarea = document.getElementById('evolutionTextarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let formattedText = '';
        switch (format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
            case 'bulletList':
                formattedText = `• ${selectedText}`;
                break;
        }

        if (formattedText) {
            textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
            textarea.focus();
            textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }

        // Toggle tool active state
        const tool = document.querySelector(`[data-format="${format}"]`);
        if (tool) {
            tool.classList.toggle('active');
        }
    }

    applyTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;

        const textarea = document.getElementById('evolutionTextarea');
        if (textarea) {
            textarea.value = template.content;
            this.evolutionContent = template.content;
            this.updateSaveButton();
        }

        app.showToast(`Template "${template.name}" aplicado`, 'success');
    }

    previewTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (!template) return;

        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${template.name}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Descrição:</strong> ${template.description}</p>
                    <div style="background: var(--gray-50); padding: var(--spacing-md); border-radius: var(--border-radius); margin-top: var(--spacing-md);">
                        <pre style="white-space: pre-wrap; font-family: var(--font-family);">${template.content}</pre>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="pepManager.closeModal()">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="pepManager.applyTemplate(${templateId}); pepManager.closeModal()">Aplicar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    openAIScribe() {
        const modal = document.createElement('div');
        modal.className = 'modal show ai-scribe-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>IA Scribe - Transcrição de Áudio</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="ai-scribe-content">
                        <div class="ai-scribe-upload" id="aiScribeUpload">
                            <div class="ai-scribe-upload-icon">
                                <i class="fas fa-microphone"></i>
                            </div>
                            <div class="ai-scribe-upload-text">Arraste o arquivo de áudio aqui ou clique para selecionar</div>
                            <div class="ai-scribe-upload-subtext">Formatos suportados: MP3, M4A, WAV até 50MB</div>
                        </div>
                        
                        <div class="ai-scribe-processing" id="aiScribeProcessing">
                            <div class="loading"></div>
                            <h4>Processando áudio...</h4>
                            <p>Transcrevendo e analisando o conteúdo</p>
                            <div class="ai-scribe-progress">
                                <div class="ai-scribe-progress-bar" id="aiScribeProgressBar"></div>
                            </div>
                        </div>
                        
                        <div class="ai-scribe-result" id="aiScribeResult">
                            <div class="ai-scribe-transcription">
                                <div class="ai-scribe-transcription-title">Transcrição:</div>
                                <div class="ai-scribe-transcription-text" id="aiScribeTranscriptionText"></div>
                            </div>
                            <div class="ai-scribe-draft">
                                <div class="ai-scribe-draft-title">Rascunho da Evolução:</div>
                                <div class="ai-scribe-draft-content" id="aiScribeDraftContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="pepManager.closeModal()">Cancelar</button>
                    <div class="ai-scribe-actions" id="aiScribeActions" style="display: none;">
                        <button type="button" class="btn btn-outline" onclick="pepManager.discardAIDraft()">Descartar</button>
                        <button type="button" class="btn btn-primary" onclick="pepManager.acceptAIDraft()">Aceitar Rascunho</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupAIScribeEventListeners();
    }

    setupAIScribeEventListeners() {
        const upload = document.getElementById('aiScribeUpload');
        if (upload) {
            upload.addEventListener('click', () => {
                this.openAudioFileUpload();
            });

            upload.addEventListener('dragover', (e) => {
                e.preventDefault();
                upload.classList.add('dragover');
            });

            upload.addEventListener('dragleave', () => {
                upload.classList.remove('dragover');
            });

            upload.addEventListener('drop', (e) => {
                e.preventDefault();
                upload.classList.remove('dragover');
                this.processAudioFile(e.dataTransfer.files[0]);
            });
        }
    }

    openAudioFileUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'audio/*';
        input.onchange = (e) => {
            if (e.target.files[0]) {
                this.processAudioFile(e.target.files[0]);
            }
        };
        input.click();
    }

    processAudioFile(file) {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/wav'];
        if (!allowedTypes.includes(file.type)) {
            app.showToast('Formato de arquivo não suportado', 'error');
            return;
        }

        // Validate file size (50MB)
        if (file.size > 50 * 1024 * 1024) {
            app.showToast('Arquivo muito grande (máximo 50MB)', 'error');
            return;
        }

        // Show processing
        document.getElementById('aiScribeUpload').style.display = 'none';
        document.getElementById('aiScribeProcessing').classList.add('show');

        // Simulate processing with progress
        this.simulateAudioProcessing();
    }

    simulateAudioProcessing() {
        const progressBar = document.getElementById('aiScribeProgressBar');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                this.showAIResults();
            }
        }, 200);
    }

    showAIResults() {
        // Mock transcription and draft
        const transcription = `Paciente relata dor de cabeça há 3 dias, localizada na região frontal, de intensidade moderada, que piora com a luz. Nega febre, náuseas ou vômitos. Refere que a dor começou após um período de estresse no trabalho.`;
        
        const draft = `S: Paciente relata cefaleia há 3 dias, localizada na região frontal, de intensidade moderada, que piora com a luz. Nega febre, náuseas ou vômitos. Refere que a dor começou após período de estresse no trabalho.

O: Paciente em bom estado geral, orientada, hidratada. PA: 120/80 mmHg, FC: 72 bpm, FR: 16 ipm, T: 36,5°C. Exame neurológico sem alterações. Fundoscopia normal.

A: Cefaleia tensional.

P: Orientação sobre técnicas de relaxamento, analgésico se necessário (dipirona 500mg), retorno em 7 dias se persistir.`;

        document.getElementById('aiScribeProcessing').classList.remove('show');
        document.getElementById('aiScribeResult').classList.add('show');
        document.getElementById('aiScribeTranscriptionText').textContent = transcription;
        document.getElementById('aiScribeDraftContent').textContent = draft;
        document.getElementById('aiScribeActions').style.display = 'flex';
    }

    acceptAIDraft() {
        const draftContent = document.getElementById('aiScribeDraftContent').textContent;
        const textarea = document.getElementById('evolutionTextarea');
        
        if (textarea) {
            textarea.value = draftContent;
            this.evolutionContent = draftContent;
            this.updateSaveButton();
        }

        this.closeModal();
        app.showToast('Rascunho da IA aceito e aplicado', 'success');
    }

    discardAIDraft() {
        this.closeModal();
        app.showToast('Rascunho da IA descartado', 'info');
    }

    loadDocuments() {
        // Mock documents - in real app, this would come from API
        this.documents = [
            {
                id: 1,
                type: 'prescription',
                title: 'Receita Médica',
                date: '2024-01-15',
                status: 'signed',
                content: 'Dipirona 500mg - 1 comprimido de 6/6h por 5 dias'
            },
            {
                id: 2,
                type: 'certificate',
                title: 'Atestado Médico',
                date: '2024-01-15',
                status: 'signed',
                content: 'Paciente necessita de repouso por 2 dias'
            },
            {
                id: 3,
                type: 'exam_request',
                title: 'Pedido de Exame',
                date: '2024-01-15',
                status: 'draft',
                content: 'Hemograma completo, glicemia de jejum'
            }
        ];

        this.renderDocuments();
    }

    renderDocuments() {
        const documentsGrid = document.getElementById('documentsGrid');
        if (!documentsGrid) return;

        documentsGrid.innerHTML = this.documents.map(doc => `
            <div class="document-card">
                <div class="document-header">
                    <div class="document-type">
                        <div class="document-type-icon">
                            <i class="fas fa-${this.getDocumentIcon(doc.type)}"></i>
                        </div>
                        <span>${doc.title}</span>
                    </div>
                </div>
                <div class="document-body">
                    <div class="document-preview" onclick="pepManager.viewDocument(${doc.id})">
                        <div class="document-preview-icon">
                            <i class="fas fa-${this.getDocumentIcon(doc.type)}"></i>
                        </div>
                    </div>
                    <div class="document-info">
                        <div class="document-title">${doc.title}</div>
                        <div class="document-meta">
                            <span>${this.formatDate(doc.date)}</span>
                            <span class="status-indicator ${doc.status}">${this.getDocumentStatusText(doc.status)}</span>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="document-action" onclick="pepManager.viewDocument(${doc.id})">
                            <i class="fas fa-eye"></i>
                            Visualizar
                        </button>
                        <button class="document-action" onclick="pepManager.editDocument(${doc.id})">
                            <i class="fas fa-edit"></i>
                            Editar
                        </button>
                        <button class="document-action primary" onclick="pepManager.signDocument(${doc.id})" ${doc.status === 'signed' ? 'disabled' : ''}>
                            <i class="fas fa-signature"></i>
                            ${doc.status === 'signed' ? 'Assinado' : 'Assinar'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAttachments() {
        // Mock attachments - in real app, this would come from API
        this.attachments = [
            {
                id: 1,
                name: 'exame_sangue.pdf',
                type: 'pdf',
                size: '2.3 MB',
                uploadDate: '2024-01-10',
                url: '#'
            },
            {
                id: 2,
                name: 'radiografia_torax.jpg',
                type: 'image',
                size: '1.8 MB',
                uploadDate: '2024-01-12',
                url: '#'
            }
        ];

        this.renderAttachments();
    }

    renderAttachments() {
        const attachmentsList = document.getElementById('attachmentsList');
        if (!attachmentsList) return;

        attachmentsList.innerHTML = this.attachments.map(attachment => `
            <div class="attachment-item">
                <div class="attachment-icon">
                    <i class="fas fa-${attachment.type === 'pdf' ? 'file-pdf' : 'file-image'}"></i>
                </div>
                <div class="attachment-info">
                    <div class="attachment-name">${attachment.name}</div>
                    <div class="attachment-meta">
                        <span>${attachment.size}</span>
                        <span>•</span>
                        <span>${this.formatDate(attachment.uploadDate)}</span>
                    </div>
                </div>
                <div class="attachment-actions">
                    <button class="attachment-action" onclick="pepManager.viewAttachment(${attachment.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="attachment-action" onclick="pepManager.downloadAttachment(${attachment.id})" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="attachment-action" onclick="pepManager.deleteAttachment(${attachment.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadEncounterHistory() {
        // Mock encounter history - in real app, this would come from API
        const history = [
            {
                id: 1,
                date: '2024-01-10',
                type: 'Consulta',
                professional: 'Dr. João Silva',
                summary: 'Consulta de rotina - controle de hipertensão'
            },
            {
                id: 2,
                date: '2023-12-15',
                type: 'Retorno',
                professional: 'Dr. João Silva',
                summary: 'Retorno para avaliação de medicação'
            }
        ];

        const historyContainer = document.getElementById('encounterHistory');
        if (historyContainer) {
            historyContainer.innerHTML = history.map(encounter => `
                <div class="encounter-item">
                    <div class="encounter-date">${this.formatDate(encounter.date)}</div>
                    <div class="encounter-details">
                        <div class="encounter-type">${encounter.type}</div>
                        <div class="encounter-professional">${encounter.professional}</div>
                        <div class="encounter-summary">${encounter.summary}</div>
                    </div>
                    <div class="encounter-actions">
                        <button class="btn btn-sm btn-outline" onclick="pepManager.viewEncounter(${encounter.id})">
                            <i class="fas fa-eye"></i>
                            Ver
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    openFileUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.pdf,.jpg,.jpeg,.png';
        input.onchange = (e) => {
            this.handleFileUpload(e.target.files);
        };
        input.click();
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                app.showToast(`Arquivo ${file.name} não é suportado`, 'error');
                return;
            }

            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                app.showToast(`Arquivo ${file.name} muito grande (máximo 10MB)`, 'error');
                return;
            }

            // Add to attachments
            const attachment = {
                id: Date.now() + Math.random(),
                name: file.name,
                type: file.type.startsWith('image/') ? 'image' : 'pdf',
                size: this.formatFileSize(file.size),
                uploadDate: new Date().toISOString().split('T')[0],
                file: file
            };

            this.attachments.push(attachment);
        });

        this.renderAttachments();
        app.showToast(`${files.length} arquivo(s) carregado(s) com sucesso`, 'success');
    }

    updateSaveButton() {
        const saveBtn = document.getElementById('saveEncounterBtn');
        if (saveBtn) {
            const hasContent = this.evolutionContent.trim().length > 0;
            saveBtn.disabled = !hasContent;
            saveBtn.textContent = hasContent ? 'Salvar Alterações' : 'Salvar';
        }
    }

    saveEncounter() {
        if (!this.currentEncounter) return;

        this.currentEncounter.evolution = this.evolutionContent;
        this.currentEncounter.status = 'saved';
        this.currentEncounter.savedAt = new Date().toISOString();

        app.showToast('Evolução salva com sucesso', 'success');
        this.updateSaveButton();
    }

    // Action methods
    viewDocument(documentId) {
        const document = this.documents.find(d => d.id === documentId);
        if (!document) return;

        app.showToast(`Visualizando ${document.title}`, 'info');
        // Could open document viewer modal
    }

    editDocument(documentId) {
        const document = this.documents.find(d => d.id === documentId);
        if (!document) return;

        app.showToast(`Editando ${document.title}`, 'info');
        // Could open document editor
    }

    signDocument(documentId) {
        const document = this.documents.find(d => d.id === documentId);
        if (!document) return;

        if (confirm('Tem certeza que deseja assinar este documento? Após a assinatura, ele não poderá ser editado.')) {
            document.status = 'signed';
            document.signedAt = new Date().toISOString();
            this.renderDocuments();
            app.showToast('Documento assinado com sucesso', 'success');
        }
    }

    viewAttachment(attachmentId) {
        const attachment = this.attachments.find(a => a.id === attachmentId);
        if (!attachment) return;

        app.showToast(`Visualizando ${attachment.name}`, 'info');
        // Could open attachment viewer
    }

    downloadAttachment(attachmentId) {
        const attachment = this.attachments.find(a => a.id === attachmentId);
        if (!attachment) return;

        app.showToast(`Download de ${attachment.name} iniciado`, 'success');
        // Could trigger download
    }

    deleteAttachment(attachmentId) {
        const attachment = this.attachments.find(a => a.id === attachmentId);
        if (!attachment) return;

        if (confirm(`Tem certeza que deseja excluir ${attachment.name}?`)) {
            this.attachments = this.attachments.filter(a => a.id !== attachmentId);
            this.renderAttachments();
            app.showToast('Anexo excluído com sucesso', 'success');
        }
    }

    viewEncounter(encounterId) {
        app.showToast(`Visualizando consulta ${encounterId}`, 'info');
        // Could open encounter details
    }

    printPEP() {
        app.showToast('Preparando impressão do prontuário...', 'info');
        // Could trigger print dialog
    }

    exportPEP() {
        app.showToast('Exportando prontuário...', 'info');
        // Could generate PDF export
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

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getDocumentIcon(type) {
        const iconMap = {
            'prescription': 'prescription-bottle-alt',
            'certificate': 'certificate',
            'exam_request': 'clipboard-list'
        };
        return iconMap[type] || 'file-alt';
    }

    getDocumentStatusText(status) {
        const statusMap = {
            'draft': 'Rascunho',
            'signed': 'Assinado',
            'sent': 'Enviado'
        };
        return statusMap[status] || status;
    }
}

// Initialize PEP manager when PEP page is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pep-page')) {
        window.pepManager = new PEPManager();
    }
});

// Override the loadPEP method in main.js
if (window.app) {
    window.app.loadPEP = function() {
        if (!window.pepManager) {
            window.pepManager = new PEPManager();
        }
    };
}
