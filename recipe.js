// --- GLOBAL VARIABLES ---
let timerInterval;
let timerMinutes = 0;
let timerSeconds = 0;
let isTimerRunning = false;
let completedSteps = 0;
let selectedToppings = [];
let currentStep = 0;
let bakingMode = false;

// --- DYNAMIC RECIPE LOADER ---
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on a recipe page
    if (document.getElementById('recipe-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');
        const recipe = recipes.find(r => r.id === recipeId);

        if (recipe) {
            renderRecipe(recipe);
            initializeRecipe(); // Initialize event listeners after rendering
        } else {
            // Display an error if the recipe ID is not found
            document.getElementById('recipe-container').innerHTML = `
                <div class="p-10 text-center">
                    <h1 class="font-title text-5xl text-red-600">Error</h1>
                    <p class="mt-4 text-xl text-gray-700">Receta no encontrada. Por favor, comprueba la ID e inténtalo de nuevo.</p>
                    <a href="index.html" class="mt-8 inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold">Volver al inicio</a>
                </div>
            `;
        }
    }
});

// --- RENDER FUNCTIONS ---
function renderRecipe(recipe) {
    document.title = recipe.title;
    document.body.classList.add(recipe.theme);

    // Header
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-subtitle').textContent = recipe.subtitle;
    document.getElementById('recipe-info-cards').innerHTML = recipe.infoCards.map(card => `
        <div class="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white flex items-center animate-fadeInUp">
            <i class="fas ${card.icon} mr-2"></i>
            ${card.stars ? `<div class="mr-2">${[...Array(3)].map((_, i) => `<i class="fas fa-star ${card.stars[i] ? '' : 'text-gray-400'}"></i>`).join('')}</div>` : ''}
            <span>${card.text}</span>
        </div>
    `).join('');

    // Love Message
    const loveMsg = document.getElementById('love-message-container');
    loveMsg.innerHTML = `<h3 class="font-heading text-2xl mb-3"><i class="fas ${recipe.loveMessage.icon} mr-2 animate-heartbeat"></i> ${recipe.loveMessage.title}</h3><p class="text-lg leading-relaxed">${recipe.loveMessage.text}</p>`;

    // Baking Mode Button
    document.getElementById('bakingModeBtn').innerHTML = `<i class="fas fa-fire mr-3"></i> ${recipe.bakingMode.buttonText}`;

    // Ingredients
    document.getElementById('ingredients-title').textContent = recipe.ingredients.title;
    document.getElementById('ingredient-list').innerHTML = recipe.ingredients.items.map(item => `
        <li class="flex items-center cursor-pointer group"><label class="flex items-center w-full">
            <input type="checkbox" class="hidden peer ingredient-checkbox">
            <span class="w-10 h-10 mr-4 border-2 border-gray-300 rounded-xl flex items-center justify-center checkmark group-hover:border-amber-500"><i class="fas fa-check text-white transform scale-0 opacity-0 transition-transform duration-200"></i></span>
            <div class="ingredient-visual bg-gradient-to-br from-amber-100 to-amber-200 group-hover:scale-110">${item.visual}</div>
            <div class="item-text transition-opacity duration-300 flex-grow">
                <div><strong class="text-xl">${item.amount}</strong> <span class="font-semibold">${item.name}</span><div class="text-sm text-gray-500 mt-1">${item.description}</div></div>
            </div>
        </label></li>
    `).join('');

    // Instructions
    document.getElementById('instructions-title').textContent = recipe.instructions.title;
    document.getElementById('step-dots').innerHTML = recipe.instructions.steps.map((_, i) => `<div class="step-progress-dot bg-gray-300 w-3 h-3 rounded-full transition-all duration-300" data-step="${i + 1}"></div>`).join('');
    document.getElementById('instruction-list').innerHTML = recipe.instructions.steps.map((step, i) => `
        <li class="flex items-start"><label class="flex items-start cursor-pointer group w-full">
            <input type="checkbox" class="hidden peer" data-step="${i + 1}">
            <div class="step-container flex-shrink-0 relative"><div class="step-circle w-16 h-16 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">${i + 1}</div></div>
            <div class="flex-grow ml-6"><div class="item-text transition-opacity duration-300">
                <div class="flex items-center mb-3"><h3 class="font-semibold text-xl mr-3">${step.title}</h3><div class="flex space-x-2">${step.tags.map(tag => `<span class="instruction-tag px-3 py-1 rounded-full text-sm font-semibold">${tag}</span>`).join('')}</div></div>
                <p class="leading-relaxed">${step.text}</p>
                ${step.tip ? `<div class="mt-3 flex items-center text-sm text-gray-500"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i><span><strong>Tip:</strong> ${step.tip}</span></div>` : ''}
                ${step.important ? `<div class="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded"><div class="flex items-center text-sm text-red-700"><i class="fas fa-exclamation-triangle mr-2"></i><span><strong>Importante:</strong> ${step.important}</span></div></div>` : ''}
                ${step.action && step.action.type === 'video' ? `<button id="moisesDemoBtn" class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg">${step.action.text}</button>` : ''}

                <!-- Toppings section now correctly inside the label's item-text -->
                ${step.toppings ? `
                    <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        ${step.toppings.map(t => `
                            <div class="topping-option bg-gray-100 p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform duration-300" data-topping="${t.name}">
                                <div class="text-2xl mb-1">${t.visual}</div>
                                <div class="text-xs font-semibold">${t.name}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div id="selectedToppings" class="mt-3 hidden">
                        <div class="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                            <div class="flex items-center text-sm text-green-700">
                                <i class="fas fa-check-circle mr-2"></i>
                                <span>Toppings seleccionados: <strong id="toppingsList"></strong></span>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div></div>
        </label></li>
    `).join('');

    // Completion Message
    document.getElementById('completionCelebration').innerHTML = `<div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 rounded-2xl shadow-2xl"><div class="text-6xl mb-4 animate-heartbeat">🏆</div><h3 class="font-heading text-3xl mb-3">${recipe.completionMessage.title}</h3><p class="text-xl mb-4">${recipe.completionMessage.text}</p><button id="shareRecipe" class="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 animate-wiggle"><i class="fas fa-share mr-2"></i> ${recipe.completionMessage.buttonText}</button></div>`;

    // Storage Info
    document.getElementById('storage-section').innerHTML = `<div class="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl shadow-lg"><h3 class="font-heading text-4xl mb-4"><i class="fas fa-gem text-amber-500 mr-3 animate-wiggle"></i> ${recipe.storageInfo.title}</h3><p class="mt-4 text-xl leading-relaxed">${recipe.storageInfo.text}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">${recipe.storageInfo.tips.map(tip => `<div class="bg-white p-6 rounded-xl shadow-md animate-wiggle"><div class="text-4xl mb-3">${tip.visual}</div><h4 class="font-semibold text-lg text-gray-800 mb-2">${tip.title}</h4><p class="text-gray-600 text-sm">${tip.text}</p></div>`).join('')}</div></div>`;

    // Rating Section
    document.getElementById('rating-prompt').textContent = recipe.rating.prompt;
    document.getElementById('recipeRating').innerHTML = [...Array(5)].map((_, i) => `<i class="fas ${recipe.rating.icon} text-4xl text-gray-300 cursor-pointer hover:text-amber-500 transition-colors duration-300" data-rating="${i + 1}"></i>`).join('');

    // Modals
    document.getElementById('modals-container').innerHTML = recipe.modals.map(modal => `<div id="${modal.id}" class="fixed inset-0 modal hidden z-50 flex items-center justify-center p-4"><div class="modal-content w-full max-w-md p-6"><div class="flex justify-between items-center mb-4"><h3 class="font-heading text-2xl text-gray-800">${modal.title}</h3><button class="close-modal-btn text-gray-500 hover:text-gray-700 text-2xl"><i class="fas fa-times"></i></button></div>${modal.items ? `<div class="space-y-3">${modal.items.map(item => `<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"><span>${item}</span><input type="checkbox" class="shopping-item"></div>`).join('')}</div>` : ''}${modal.video ? `<video class="w-full rounded-lg" autoplay muted loop controls><source src="${modal.video}" type="video/mp4"></video>` : ''}<p class="mt-4">${modal.description || ''}</p></div></div>`).join('');

    // Audio Source
    const audioSrc = document.getElementById('backgroundMusic');
    if (audioSrc && recipe.audio) audioSrc.innerHTML = `<source src="${recipe.audio}" type="audio/mpeg">`;
}


// --- INTERACTIVITY INITIALIZATION ---
function initializeRecipe() {
    setupStepTracking();
    setupTimerFunctionality();
    setupMusicToggle();
    setupProgressTracking();
    setupRatingSystem();
    setupBakingMode();
    playWelcomeAnimation();
    setupModalButtons();
    setupGeneralEventListeners();
}

function playWelcomeAnimation() { setTimeout(() => createWelcomeParticles(), 2000); }
function createWelcomeParticles() {
    const colors = ['#8B4513', '#A0522D', '#5D4037', '#3E2723', '#f59e0b', '#ec4899', '#8b5cf6', '#06d6a0'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}%;width:${4+Math.random()*6}px;height:${4+Math.random()*6}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:50%;z-index:1000;pointer-events:none;animation:confetti 4s ease-out forwards;box-shadow:0 2px 4px rgba(0,0,0,0.3);`;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 4000);
        }, i * 100);
    }
}

function setupStepTracking() {
    document.body.addEventListener('change', function(event) {
        if (event.target.matches('input[data-step]')) handleStepChange(event.target);
        if (event.target.matches('.ingredient-checkbox')) updateProgress();
    });
}

function handleStepChange(checkbox) {
    const stepDot = document.querySelector(`.step-progress-dot[data-step="${checkbox.dataset.step}"]`);
    if (checkbox.checked) {
        completedSteps++;
        if(stepDot) { stepDot.classList.remove('bg-gray-300'); stepDot.classList.add('bg-amber-500', 'animate-bounce-gentle'); }
        if (bakingMode) moveToNextStep(parseInt(checkbox.dataset.step));
    } else {
        completedSteps--;
        if(stepDot) { stepDot.classList.remove('bg-amber-500', 'animate-bounce-gentle'); stepDot.classList.add('bg-gray-300'); }
    }
    updateStepCounter();
    updateProgress();
    checkRecipeCompletion();
}

function updateStepCounter() {
    const total = document.querySelectorAll('input[data-step]').length;
    const counter = document.getElementById('stepCounter');
    if (counter) counter.textContent = `${completedSteps}/${total}`;
}

function updateProgress() {
    const total = document.querySelectorAll('input[type="checkbox"]').length;
    const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const progress = total > 0 ? (checked / total) * 100 : 0;
    const bar = document.getElementById('progressBar');
    if(bar) bar.style.width = `${progress}%`;
}

function checkRecipeCompletion() {
    const total = document.querySelectorAll('input[data-step]').length;
    if (total > 0 && completedSteps === total) {
        const celebration = document.getElementById('completionCelebration');
        if(celebration) { celebration.classList.remove('hidden'); celebration.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }
}

function setupTimerFunctionality() {
    document.body.addEventListener('click', function(event) {
        if (event.target.matches('#startTimer')) startTimer();
        if (event.target.matches('#pauseTimer')) pauseTimer();
        if (event.target.matches('#resetTimer')) resetTimer();
    });
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            if (timerSeconds >= 60) { timerMinutes++; timerSeconds = 0; }
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) { isTimerRunning = false; clearInterval(timerInterval); }
}

function resetTimer() {
    pauseTimer();
    timerMinutes = 0; timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if(display) display.textContent = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
}

function setupMusicToggle() {
    document.body.addEventListener('click', function(event) {
        const btn = event.target.closest('#musicToggle');
        if (btn) {
            const audio = document.getElementById('backgroundMusic');
            if (!audio) return;
            const icon = btn.querySelector('i');
            if (audio.paused) {
                audio.play().catch(e => console.error("Audio failed:", e));
                if(icon) icon.className = 'fas fa-pause text-xl';
            } else {
                audio.pause();
                if(icon) icon.className = 'fas fa-music text-xl';
            }
        }
    });
}

function setupBakingMode() {
    const btn = document.getElementById('bakingModeBtn');
    if (btn) {
        btn.addEventListener('click', () => toggleBakingMode(btn));
    }
}

function toggleBakingMode(btn) {
    bakingMode = !bakingMode;
    const mode = document.body.classList.contains('theme-brownie') ? 'Baking' : 'Chef';
    if (bakingMode) {
        btn.innerHTML = `<i class="fas fa-fire mr-3"></i>🔥 ${mode} Mode Active`;
        document.body.classList.add('baking-mode');
        currentStep = 1;
        highlightCurrentStep();
        showNotification(`💡 ${mode} Mode Activated!`, 'info');
    } else {
        btn.innerHTML = `<i class="fas fa-fire mr-3"></i>Activate ${mode} Mode`;
        document.body.classList.remove('baking-mode');
        stopGuidedBaking();
        showNotification(`💡 ${mode} Mode Deactivated.`, 'info');
    }
}

function highlightCurrentStep() {
    document.querySelectorAll('.step-circle').forEach(s => s.classList.remove('current-step'));
    const el = document.querySelector(`input[data-step="${currentStep}"]`);
    if (el) {
        const circle = el.closest('li').querySelector('.step-circle');
        if (circle) { circle.classList.add('current-step'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }
}

function stopGuidedBaking() {
    document.querySelectorAll('.step-circle').forEach(s => s.classList.remove('current-step'));
}

function moveToNextStep(step) {
    const total = document.querySelectorAll('input[data-step]').length;
    if (step === currentStep && currentStep < total) {
        currentStep++;
        setTimeout(highlightCurrentStep, 1000);
    }
}

function setupRatingSystem() {
    const container = document.getElementById('recipeRating');
    if(!container) return;
    container.addEventListener('click', e => {
        if (e.target.matches('i')) setRating(parseInt(e.target.dataset.rating));
    });
    container.addEventListener('mouseover', e => {
        if (e.target.matches('i')) highlightStars(parseInt(e.target.dataset.rating));
    });
    container.addEventListener('mouseleave', () => highlightStars(parseInt(container.dataset.currentRating || 0)));
}

function highlightStars(count) {
    document.querySelectorAll('#recipeRating i').forEach((star, i) => {
        star.classList.toggle('text-amber-500', i < count);
        star.classList.toggle('text-pink-500', i < count);
        star.classList.toggle('text-gray-300', i >= count);
    });
}

function setRating(rating) {
    const container = document.getElementById('recipeRating');
    const msg = document.getElementById('ratingMessage');
    if (!container || !msg) return;
    container.dataset.currentRating = rating;
    highlightStars(rating);
    const messages = ["Let's try again! 💪", "Good attempt! 👍", "Very good! 😊", "Excellent work! ⭐", "Perfect! A true master! 👨‍🍳🏆"];
    msg.textContent = messages[rating - 1];
    msg.classList.remove('hidden');
}

function setupModalButtons() {
    document.body.addEventListener('click', e => {
        if (e.target.closest('#shoppingListBtn')) openModal('shoppingModal');
        if (e.target.closest('#moisesDemoBtn')) openModal('moisesModal');
        if (e.target.closest('.close-modal-btn')) closeModal(e.target.closest('.modal').id);
    });
}

function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function setupGeneralEventListeners() {
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) closeModal(e.target.id);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal:not(.hidden)');
            if (modal) closeModal(modal.id);
        }
    });
    document.body.addEventListener('click', e => {
        const shareBtn = e.target.closest('#shareRecipe');
        if (shareBtn) {
            const text = `Check out this amazing recipe for ${document.title}!`;
            if (navigator.share) {
                navigator.share({ title: document.title, text: text, url: window.location.href })
                    .catch(err => console.error("Share failed:", err));
            } else {
                navigator.clipboard.writeText(`${text}\n${window.location.href}`).then(() => showNotification('📋 Link copied!', 'success'));
            }
        }
    });
    document.body.addEventListener('click', e => {
        const topping = e.target.closest('.topping-option');
        if(topping) selectTopping(topping, topping.dataset.topping);
    });
}

function selectTopping(element, name) {
    element.classList.toggle('ring-4');
    element.classList.toggle('ring-amber-500');
    const index = selectedToppings.indexOf(name);
    if (index > -1) selectedToppings.splice(index, 1);
    else selectedToppings.push(name);
    const container = document.getElementById('selectedToppings');
    const list = document.getElementById('toppingsList');
    if (!container || !list) return;
    if (selectedToppings.length > 0) {
        container.classList.remove('hidden');
        list.textContent = selectedToppings.join(', ');
    } else {
        container.classList.add('hidden');
    }
}

function showNotification(message, type = 'info') {
    const n = document.createElement('div');
    const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-amber-500' };
    n.className = `fixed top-20 right-5 ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg z-50 font-semibold`;
    n.style.transform = 'translateX(120%)';
    n.style.transition = 'transform 0.3s ease';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => { n.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => { n.style.transform = 'translateX(120%)'; setTimeout(() => n.remove(), 300); }, 4000);
}

// Dynamically add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `@keyframes confetti { 0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); } 100% { opacity: 0; transform: translateY(100vh) scale(0.3) rotate(720deg); } }`;
document.head.appendChild(style);
