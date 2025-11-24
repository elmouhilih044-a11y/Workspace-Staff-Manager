// DOM Elements
const BtnAddWorker = document.getElementById('BtnAddWorker');
const toggleExperienceButton = document.getElementById('toggleExperienceButton');
const workerModal = document.getElementById('workerModal');
const experienceForm = document.getElementById('experienceForm');
const closeModalButtons = document.querySelectorAll('.close-modal');
const workerForm = document.getElementById('workerForm');
const sidebar = document.querySelector('aside');
const detailsModal = document.getElementById('detailsModal');
const workerDetailsContent = document.getElementById('workerDetailsContent');

// Data storage
let workers = [];
let currentWorkerData = {
    basicInfo: {},
    experiences: []
};

// Zone access control - defines which roles can access which rooms
const zoneAccessRules = {
    'receptionRoom': ['Receptionist', 'Manager'],
    'serverRoom': ['IT Guy', 'Manager'],
    'securityRoom': ['Security', 'Manager'],
    'conferenceRoom': ['Receptionist', 'Manager', 'Cleaning', 'IT Guy', 'Security', 'Other'],
    'staffRoom': ['Receptionist', 'Manager', 'Cleaning', 'IT Guy', 'Security', 'Other'],
    'archivesRoom': ['Receptionist', 'Manager', 'IT Guy', 'Security', 'Other']
};

// Room names for display 
const roomNames = {
    'conferenceRoom': 'Salle de conférence',
    'serverRoom': 'Salle des serveurs',
    'securityRoom': 'Salle de sécurité',
    'receptionRoom': 'Réception',
    'staffRoom': 'Salle du personnel',
    'archivesRoom': "Salle d'archives"
};

// Highlight empty zones with red background
function highlightEmptyZones() {
    const restrictedZones = ['receptionRoom', 'serverRoom', 'securityRoom', 'archivesRoom'];
    
    restrictedZones.forEach(zoneId => {
        const zone = document.getElementById(zoneId);
        if (!zone) return;
        
        const hasWorker = zone.querySelector('.worker-in-zone');
        
        if (hasWorker) {
            zone.classList.remove("zone-empty");
        } else {
            zone.classList.add("zone-empty");
        }
    });
}

// Display worker details in modal
function displayWorkerDetails(worker) {
    let experiencesHTML = '';
    
    if (worker.experiences && worker.experiences.length > 0) {
        experiencesHTML = `<div class="mt-4"><h4 class="font-semibold text-gray-800 mb-2">Experiences:</h4>`;
        worker.experiences.forEach(exp => {
            experiencesHTML += `
                <div class="bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200">
                    <p><strong>Company:</strong> ${exp.company}</p>
                    <p><strong>Role:</strong> ${exp.role}</p>
                    <p><strong>Period:</strong> ${exp.from} to ${exp.to}</p>
                </div>
            `;
        });
        experiencesHTML += `</div>`;
    }

    workerDetailsContent.innerHTML = `
        <div class="flex items-center gap-3 flex-1 mb-4">
            <div class="w-16 h-16 overflow-hidden rounded-full flex items-center justify-center">
                <img src="${worker.imageUrl}" alt="${worker.name}" class="rounded-full w-full h-full object-cover">
            </div>
            <div>
                <h3 class="font-semibold text-blue-800 text-lg">${worker.name}</h3>
                <p class="text-sm text-blue-500">${worker.role}</p>
            </div>
        </div>
        <div class="space-y-2">
            <p><strong>Email:</strong> ${worker.email}</p>
            <p><strong>Phone:</strong> ${worker.phone}</p>
        </div>
        ${experiencesHTML}
    `;
}

// Display unassigned workers in sidebar
function displayWorkersInSidebar() {
    const existingCards = sidebar.querySelectorAll('.worker-card');
    existingCards.forEach(card => card.remove());

    // Only show workers not assigned to any zone
    workers.forEach((worker) => {
        if (worker.assignedZone) return;

        const card = document.createElement('div');
        card.className = 'worker-card bg-white p-4 rounded-lg mb-3 border border-gray-200 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between';
        card.dataset.workerId = worker.id;

        card.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <div class="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
                    <img src="${worker.imageUrl}" alt="${worker.name}" class="rounded-full w-full h-full object-cover">
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800 text-sm">${worker.name}</h3>
                    <p class="text-xs text-gray-500">${worker.role}</p>
                </div>
            </div>
            <button onclick="deleteWorker(${worker.id})" class="text-red-500 hover:text-red-600 text-xs font-semibold px-2 py-1">
                Remove
            </button>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                displayWorkerDetails(worker);
                detailsModal.classList.remove('hidden');
            }
        });

        sidebar.insertBefore(card, BtnAddWorker);
    });
}

// Display workers assigned to zones
function displayWorkersInZones() {
       
    const allZones = ['conferenceRoom', 'serverRoom', 'securityRoom', 'receptionRoom', 'staffRoom', 'archivesRoom'];
    
    allZones.forEach(zoneId => {
        const zone = document.getElementById(zoneId);
        if (!zone) return;
        
        // Remove old worker displays
        const oldWorkers = zone.querySelectorAll('.worker-in-zone');
        oldWorkers.forEach(w => w.remove());
        
        // Find workers assigned to this zone
        workers.forEach(worker => {
            if (worker.assignedZone === zoneId) {
                const workerDiv = document.createElement('div');
                workerDiv.className = 'worker-in-zone bg-white rounded p-2 flex items-center gap-2';
                workerDiv.innerHTML = `
                <img src="${worker.imageUrl}" class="w-6 h-6 rounded-full object-cover">
                <span class="text-xs text-black">${worker.name}</span>
                <button onclick="unassignWorkerFromZone(${worker.id})" class="ml-auto text-red-500 text-sm hover:text-red-700">✕</button>
                `;
                
                workerDiv.addEventListener('click', (e) => {
                    if (!e.target.closest('button')) {
                        displayWorkerDetails(worker);
                        detailsModal.classList.remove('hidden');
                    }
                });
                
                zone.appendChild(workerDiv);
            }
        });
    });
    highlightEmptyZones();
 
}

// Remove worker from assigned zone
function unassignWorkerFromZone(workerId) {
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
        worker.assignedZone = null;
        displayWorkersInSidebar();
        displayWorkersInZones();
    }
}
window.unassignWorkerFromZone = unassignWorkerFromZone;

// Assign worker to a zone
function assignWorkerToZone(zoneId) {
    // Find available workers for this zone (matching role and not already assigned)
    const availableWorkers = workers.filter(worker => {
        if (worker.assignedZone) return false;
        return zoneAccessRules[zoneId].includes(worker.role);
    });

    if (availableWorkers.length === 0) {
        alert('No available workers for this zone!');
        return;
    }

    // Create selection modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 class="text-xl font-bold mb-4">Select Worker for ${roomNames[zoneId]}</h3>
            <div id="availableWorkersList" class="space-y-2 max-h-96 overflow-y-auto"></div>
            <button onclick="this.closest('.fixed').remove()" class="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-500">
                Cancel
            </button>
        </div>
    `;
    
    const list = modal.querySelector('#availableWorkersList');
    availableWorkers.forEach(worker => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-3 border border-2 border-blue-500 rounded hover:bg-gray-50 cursor-pointer';
        item.innerHTML = `
            <img src="${worker.imageUrl}" class="w-10 h-10 rounded-full object-cover">
            <div>
                <p class="font-semibold">${worker.name}</p>
                <p class="text-xs text-gray-500">${worker.role}</p>
            </div>
        `;
        item.onclick = () => {
            worker.assignedZone = zoneId;
            displayWorkersInSidebar();
            displayWorkersInZones();
            modal.remove();
        };
        list.appendChild(item);
    });
    
    document.body.appendChild(modal);
}
window.assignWorkerToZone = assignWorkerToZone;

// Delete worker permanently
function deleteWorker(workerId) {
    const index = workers.findIndex(w => w.id === workerId);
    if (index > -1) {
        workers.splice(index, 1);
        displayWorkersInSidebar();
        displayWorkersInZones();
    }
}
window.deleteWorker = deleteWorker;

// Setup zone assignment buttons
document.addEventListener('DOMContentLoaded', () => {
    const zoneButtons = document.querySelectorAll('.zone .assign-button');
    zoneButtons.forEach(button => {
        const zoneDiv = button.closest('.zone');
        if (zoneDiv) {
            button.onclick = (e) => {
                e.stopPropagation();
                assignWorkerToZone(zoneDiv.id);
            };
        }
    });
        highlightEmptyZones();
});

// Open worker modal
if (BtnAddWorker) {
    BtnAddWorker.addEventListener('click', () => {
        workerModal.classList.remove('hidden');
    });
}

// Toggle experience form visibility
if (toggleExperienceButton) {
    toggleExperienceButton.addEventListener('click', () => {
        experienceForm.classList.toggle('hidden');
    });
}

// Close modals
if (closeModalButtons) {
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            workerModal.classList.add('hidden');
            detailsModal.classList.add('hidden');
            workerForm.reset();
            clearAllErrors();
        });
    });
}

// Clear all error messages
function clearAllErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('imageError').textContent = '';
}

// Form validation and submission
if (workerForm) {
    workerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate name
        const name = document.getElementById("workerName").value.trim();
        const nameError = document.getElementById("nameError");
        const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

        if (name === "") {
            nameError.textContent = "Please enter a name";
            isValid = false;
        } else if (!nameRegex.test(name)) {
            nameError.textContent = "Please enter a valid name (letters only)";
            isValid = false;
        } else {
            nameError.textContent = "";
            currentWorkerData.basicInfo.name = name;
        }

        // Get role
        const role = document.getElementById("workerRole").value;
        currentWorkerData.basicInfo.role = role;

        // Validate image URL
        const imageUrl = document.getElementById('workerImage').value.trim();
        const imageError = document.getElementById('imageError');

        if (imageUrl === "") {
            imageError.textContent = "Please provide an image URL";
            isValid = false;
        } else {
            imageError.textContent = "";
            currentWorkerData.basicInfo.imageUrl = imageUrl;
        }

        // Validate email
        const email = document.getElementById("workerEmail").value.trim();
        const emailError = document.getElementById("emailError");
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

        if (email === "") {
            emailError.textContent = "Please enter an email";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email";
            isValid = false;
        } else {
            emailError.textContent = "";
            currentWorkerData.basicInfo.email = email;
        }

        // Validate phone
        const phone = document.getElementById("workerPhone").value.trim();
        const phoneError = document.getElementById("phoneError");
        const phoneRegex = /^0[5-7]\d{8}$/;

        if (phone === "") {
            phoneError.textContent = "Please enter a phone number";
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            phoneError.textContent = "Please enter a valid Moroccan phone (e.g., 0612345678)";
            isValid = false;
        } else {
            phoneError.textContent = "";
            currentWorkerData.basicInfo.phone = phone;
        }

        // If all valid, add worker
        if (isValid) {
            workers.push({
                id: Date.now(),
                name: currentWorkerData.basicInfo.name,
                role: currentWorkerData.basicInfo.role,
                experiences: [...currentWorkerData.experiences],
                email: currentWorkerData.basicInfo.email,
                phone: currentWorkerData.basicInfo.phone,
                imageUrl: currentWorkerData.basicInfo.imageUrl,
                assignedZone: null
            });

            displayWorkersInSidebar();
            displayWorkersInZones();
            workerModal.classList.add('hidden');
            experienceForm.classList.add('hidden');
            workerForm.reset();
            clearAllErrors();

            // Reset current worker data
            currentWorkerData = {
                basicInfo: {},
                experiences: []
            };
            
            document.getElementById("experienceList").innerHTML = "";
        }
    });
}

// Add experience to current worker
const addExperienceButton = document.getElementById("addExperienceButton");

if (addExperienceButton) {
    addExperienceButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const company = document.getElementById("experienceCompany").value.trim();
        const role = document.getElementById("experienceRole").value.trim();
        const from = document.getElementById("experienceFrom").value;
        const to = document.getElementById("experienceTo").value;

        if (!company || !role || !from || !to) {
            alert("Please fill in all experience fields.");
            return;
        }

        currentWorkerData.experiences.push({ company, role, from, to });

        const list = document.getElementById("experienceList");
        const listItem = document.createElement("li");
        listItem.className = "w-full flex flex-col";

        listItem.innerHTML = `
            <div class="flex items-center justify-between border border-blue-200 w-full bg-blue-100 p-3 rounded-lg">
                <span class="text-sm">
                    <strong>Company:</strong> ${company}<br>
                    <strong>Role:</strong> ${role}<br>
                    <strong>Period:</strong> ${from} to ${to}
                </span>
                <button class="delete-exp px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                    Delete
                </button>
            </div>
        `;

        listItem.querySelector(".delete-exp").addEventListener('click', () => {
            const index = currentWorkerData.experiences.findIndex(
                exp => exp.role === role && exp.company === company && exp.from === from
            );
            if (index > -1) {
                currentWorkerData.experiences.splice(index, 1);
            }
            listItem.remove();
        });

        list.appendChild(listItem);
        
        // Clear experience form fields
        document.getElementById("experienceCompany").value = "";
        document.getElementById("experienceRole").value = "";
        document.getElementById("experienceFrom").value = "";
        document.getElementById("experienceTo").value = "";
    });
}