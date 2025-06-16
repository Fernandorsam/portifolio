 document.addEventListener('DOMContentLoaded', function () {
            // --- DATA ---
            const skillsData = {
                labels: ['JavaScript (ES6+)', 'React & Next.js', 'Node.js & Express', 'HTML5 & CSS3', 'Bancos de Dados SQL & NoSQL', 'APIs REST & GraphQL', 'Git & CI/CD'],
                datasets: [{
                    label: 'Nível de Proficiência',
                    data: [90, 85, 80, 95, 75, 85, 90],
                    backgroundColor: 'rgba(107, 70, 193, 0.2)',
                    borderColor: 'rgba(107, 70, 193, 1)',
                    pointBackgroundColor: 'rgba(107, 70, 193, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(107, 70, 193, 1)'
                }]
            };
            
            const projectsData = [
                {
                    title: 'API RESTful com Node.js',
                    description: 'Criação de uma API robusta e escalável utilizando Node.js e Express. Integração com MongoDB e autenticação via JWT.',
                    tags: ['Node.js', 'JavaScript'],
                    link: '#'
                },
                {
                    title: 'Dashboard Interativo',
                    description: 'Desenvolvimento de uma interface de usuário dinâmica com React e Tailwind CSS para visualização de dados em tempo real.',
                    tags: ['React', 'JavaScript'],
                    link: 'https://github.com/Fernandorsam/DashboardInt'
                },
                {
                    title: 'Plataforma de E-commerce',
                    description: 'Projeto full-stack com Next.js para o frontend e Node.js para o backend, com integração de pagamentos e painel de admin.',
                    tags: ['React', 'Node.js', 'JavaScript'],
                    link: '#'
                },
                {
                    title: 'Website Institucional Moderno',
                    description: 'Criação de um site responsivo e otimizado para performance utilizando HTML, CSS e JavaScript puro, com foco em animações e UX.',
                    tags: ['JavaScript'],
                    link: '#'
                }
            ];

            // --- NAVIGATION LOGIC ---
            const navLinks = document.querySelectorAll('.nav-link');
            const views = document.querySelectorAll('.view');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileNavMenu = document.getElementById('mobile-nav-menu');

            function switchView(viewId) {
                navLinks.forEach(link => {
                    link.classList.toggle('nav-active', link.dataset.view === viewId);
                });
                views.forEach(view => {
                    view.classList.toggle('active', view.id === viewId);
                });
                // Fecha o menu mobile e mostra o botão se estiver aberto
                const navElement = document.getElementById('main-nav');
                if (!navElement.classList.contains('hidden') && window.innerWidth < 768) {
                    navElement.classList.add('hidden'); // Esconde o nav
                    mobileMenuToggle.classList.remove('hidden'); // Mostra o botão hambúrguer
                }
            }
            
            document.getElementById('main-nav').addEventListener('click', function(e) {
                if (e.target.matches('.nav-link')) {
                    e.preventDefault();
                    const viewId = e.target.dataset.view;
                    switchView(viewId);
                }
            });

            // Toggle do menu mobile: mostra/esconde o menu e o botão
            mobileMenuToggle.addEventListener('click', function() {
                const navElement = document.getElementById('main-nav');
                const isNavHidden = navElement.classList.contains('hidden');

                if (isNavHidden) {
                    // Nav está escondido, mostra e esconde o botão
                    navElement.classList.remove('hidden');
                    mobileMenuToggle.classList.add('hidden');
                } else {
                    // Nav está visível, esconde e mostra o botão
                    navElement.classList.add('hidden');
                    mobileMenuToggle.classList.remove('hidden');
                }
            });

            // --- CHART.JS LOGIC ---
            function renderChart() {
                const ctx = document.getElementById('skillsChart');
                if (!ctx) return;
                
                new Chart(ctx, {
                    type: 'radar',
                    data: skillsData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                             tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.r !== null) {
                                            label += context.parsed.r + '%';
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                angleLines: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                pointLabels: {
                                    font: {
                                        size: 12,
                                        weight: '500'
                                    },
                                    color: '#4A5568'
                                },
                                ticks: {
                                   display: false
                                }
                            }
                        }
                    }
                });
            }
            
            // --- PROJECTS LOGIC ---
            const gallery = document.getElementById('project-gallery');
            const filterBtns = document.querySelectorAll('.filter-btn');

            function renderProjects(filter = 'all') {
                gallery.innerHTML = '';
                const filteredProjects = filter === 'all' 
                    ? projectsData 
                    : projectsData.filter(p => p.tags.includes(filter));

                if(filteredProjects.length === 0){
                   gallery.innerHTML = `<p class="text-center text-gray-500 md:col-span-2">Nenhum projeto encontrado para esta tecnologia.</p>`;
                   return;
                }

                filteredProjects.forEach(project => {
                    const tagsHtml = project.tags.map(tag => `<span class="bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">${tag}</span>`).join('');
                    const projectEl = document.createElement('div');
                    projectEl.className = 'bg-white rounded-xl shadow-md overflow-hidden project-card';
                    projectEl.innerHTML = `
                        <div class="p-8">
                            <div class="uppercase tracking-wide text-sm text-purple-600 font-semibold">Projeto em Destaque</div>
                            <a href="${project.link}" target="_blank" class="block mt-1 text-2xl leading-tight font-bold text-black hover:underline">${project.title}</a>
                            <p class="mt-4 text-gray-600 leading-relaxed">${project.description}</p>
                            <div class="mt-6">${tagsHtml}</div>
                        </div>
                    `;
                    gallery.appendChild(projectEl);
                });
            }
            
            document.getElementById('project-filters').addEventListener('click', function(e){
                if(e.target.matches('.filter-btn')){
                    filterBtns.forEach(btn => {
                        btn.classList.remove('bg-purple-600', 'text-white');
                        btn.classList.add('bg-white', 'text-gray-700');
                    });
                    e.target.classList.add('bg-purple-600', 'text-white');
                    e.target.classList.remove('bg-white', 'text-gray-700');
                    renderProjects(e.target.dataset.filter);
                }
            });

            // --- GEMINI API INTEGRATION: Project Idea Generator ---
            const projectIdeaInput = document.getElementById('project-idea-input');
            const generateIdeaBtn = document.getElementById('generate-idea-btn');
            const ideaOutput = document.getElementById('idea-output');

            generateIdeaBtn.addEventListener('click', async () => {
                const userInput = projectIdeaInput.value.trim();
                if (!userInput) {
                    ideaOutput.innerHTML = `<p class="text-red-500">Por favor, digite algo para gerar uma ideia.</p>`;
                    return;
                }

                ideaOutput.innerHTML = `<div class="flex items-center justify-center gap-2 text-purple-600">
                                            <svg class="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Gerando ideia...</span>
                                        </div>`;
                generateIdeaBtn.disabled = true;

                try {
                    const skillLabels = skillsData.labels.join(', ');
                    const existingProjectTitles = projectsData.map(p => p.title).join(', ');

                    let chatHistory = [];
                    const prompt = `Dado minhas habilidades em ${skillLabels} e projetos existentes como ${existingProjectTitles}, gere uma ideia de projeto de desenvolvimento web que incorpore: "${userInput}". A ideia deve ser inovadora, prática e idealmente envolver tecnologias modernas. Apresente a ideia com um título, uma breve descrição e algumas sugestões de tecnologias principais. Formate a resposta de forma clara e concisa.`;
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    const apiKey = "";
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        ideaOutput.innerHTML = `<div class="text-left">${text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div>`; // Render Markdown bold and newlines
                    } else {
                        ideaOutput.innerHTML = `<p class="text-red-500">Não foi possível gerar a ideia. Tente novamente.</p>`;
                    }
                } catch (error) {
                    console.error("Erro ao chamar a API Gemini:", error);
                    ideaOutput.innerHTML = `<p class="text-red-500">Ocorreu um erro ao gerar a ideia. Por favor, tente novamente mais tarde.</p>`;
                } finally {
                    generateIdeaBtn.disabled = false;
                }
            });

            // --- INITIALIZATION ---
            renderChart();
            renderProjects();
        
        });

