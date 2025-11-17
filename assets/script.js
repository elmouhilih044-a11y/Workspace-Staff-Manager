
const addWorkerBtn = document.querySelector('.additionButton');
const addExperienceBtn =document.getElementById('addExperienceBtn')
const modalOverlay = document.getElementById('modalOverlay');
const formExperience=document.getElementById('formExperience');
const cancelBtn = document.getElementById('cancelBtn');
const workerForm = document.getElementById('workerForm');
const sidebar = document.querySelector('aside');


// Array to store all workers
let workers = [];
let data = {
    preview: {},
    exp: []
};


// Function to display workers in sidebar
function displayWorkers() {
    const existingCards = sidebar.querySelectorAll('.worker-card');
    existingCards.forEach(card => card.remove());
    
    workers.map((worker, index) => {
        const card = document.createElement('div');
        card.className = 'worker-card bg-white p-4 rounded-lg mb-3 border border-gray-200 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between';
     console.log("worker")   
     console.log(worker)   
     const initials = worker.name.substring(0, 2).toUpperCase();
     
        card.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                   ${initials}
                </div>
                <img src = ${worker.imgUrl} alt = ${worker.name} image >
                <div>
                    <h3 class="font-semibold text-gray-800 text-sm">${worker.name}</h3>
                    <p class="text-xs text-gray-500">${worker.role}</p>
                </div>
            </div>
            <button onclick="deleteWorker(${index})" class="text-yellow-500 hover:text-yellow-600 text-xs font-semibold px-2 py-1">
                Remove
            </button>
        `;
        sidebar.insertBefore(card, addWorkerBtn);
    });
}

// Function to delete worker
function deleteWorker(index) {
    workers.splice(index, 1);
    displayWorkers();
}

// Make deleteWorker available globally
window.deleteWorker = deleteWorker;

// Afficher le modal au clic sur "Add New Worker"
if (addWorkerBtn) {
    addWorkerBtn.addEventListener('click', () => {
       
        modalOverlay.classList.remove('hidden');
    });
}

if(addExperienceBtn){
    addExperienceBtn.addEventListener('click',()=>{
        formExperience.classList.remove('hidden');
    });
}


if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
        workerForm.reset();
    });
}



if (formExperience) {
    formExperience.addEventListener('click', (e) => {
        if (e.target === formExperience) {
            formExperience.classList.add('hidden');
        }
    });
}


// Gérer la soumission du formulaire
if (workerForm) {
    workerForm.addEventListener('submit', (e) => {
        e.preventDefault();
       
        
        let valid = true;
        
        const imgUrl =document.getElementById('imgUrl').value;
        console.log("imgUrl: "+ imgUrl)
        if(imgUrl === ""){
            console.log("image vide")
            valid = false;
        }else{
            valid = true 
        }
        // Validation name
        const Name = document.getElementById("name").value;
        const errorName = document.getElementById("errorName");
        const regexName = /^[A-Za-z\s]+$/;
        
        if (Name === "") {
            errorName.textContent = "Please enter your name";
            valid = false;
        } else if (!regexName.test(Name)) {
            errorName.textContent = "Please enter your name with letters only";
            valid = false;
        } else {
            errorName.textContent = "";
            data.preview.name = Name;
        }
        
        // Validation role
        const role = document.getElementById("role").value;
        const errorRole = document.getElementById("errorRole");

        if (role === "") {
            errorRole.textContent = "Please select a role";
            valid = false;
        } else {
            errorRole.textContent = "";
            data.preview.role = role;
        }
        
        // Validation company
        const company = document.getElementById("company").value;
        const errorCompany = document.getElementById("errorCompany");
        const regexCompany = /^[A-Za-z\s]+$/;
        
        if (company === "") {
            errorCompany.textContent = "Please enter your company";
            valid = false;
        } else if (!regexCompany.test(company)) {
            errorCompany.textContent = "Please enter your company with letters only";
            valid = false;
        } else {
            errorCompany.textContent = "";
            data.preview.company = company;
        }
        
        const email = document.getElementById("email").value;
        const errorEmail = document.getElementById("errorEmail");
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
        
        if (email === "") {
            errorEmail.textContent = "Please enter your email";
            valid = false;
        } else if (!emailRegex.test(email)) {
            errorEmail.textContent = "Please enter a correct email format";
            valid = false;
        } else {
            errorEmail.textContent = "";
            data.preview.email = email;
        }
        
        // Validation phone
        const phone = document.getElementById("phone").value;
        const errorPhone = document.getElementById("errorPhone");
        const phoneRegex = /^0[5-7]\d{8}$/;
        
        if (phone === "") {
            errorPhone.textContent = "Please enter your phone";
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            errorPhone.textContent = "Please enter a correct phone format";
            valid = false;
        } else {
            errorPhone.textContent = "";
            data.preview.phone = phone;
        }
        
        
        if (valid) {
            // Add worker to array
            console.log("data.preview.imgUrl: "+data.preview.imgUrl)
            console.log("imgUrl: "+imgUrl)

            workers.push({
                name: data.preview.name,
                role: data.preview.role,
                company: data.preview.company,
                email: data.preview.email,
                phone: data.preview.phone,
                imgUrl:data.preview.imgUrl,
            });
            
            console.log('Worker saved!', data);
            console.log('All workers:', workers);
            
          
            displayWorkers();
      
modalOverlay.classList.add('hidden');

formExperience.classList.add('hidden');

workerForm.reset();

errorName.textContent = "";
errorRole.textContent = "";
errorCompany.textContent = "";
errorEmail.textContent = "";
errorPhone.textContent = "";

        }
    });
}


// experience
const btnExperience = document.getElementById("btnExperience");

btnExperience.addEventListener('click', (e) => {
    e.preventDefault();
    const companyExperience = document.getElementById("companyExperience").value;
    const roleExperience= document.getElementById("roleExperience").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    
    if (!companyExperience || !roleExperience || !from || !to ) {
        alert("Please fill in all the fields.");
        return;
    }

    data.exp.push({ companyExperience,roleExperience,from,to});

    const list = document.getElementById("listExperience");
    const li = document.createElement("li");
    li.className = "w-full flex flex-col";

    li.innerHTML = `
        <div class="flex items-center justify-between border border-green-200 w-full bg-bleu-200 text-black-500 p-2 m-2 rounded-lg shadow-sm">
            <span class="font-medium">Company: <span class="text-gray-500">${companyExperience}</span><br>Role: <span class="text-gray-500">${roleExperience}</span><br>From:<span class="text-gray-500">${from}</span> To:<span class="text-gray-500">${to}</span></span>
            <div class="flex gap-2">
                <button class="btn px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-800">supprimer</button>
            </div>
        </div>
    `;

    li.querySelector("button").addEventListener('click', () => {
        const idx = data.exp.findIndex(e => e.roleExperience ===roleExperience && e.companyExperience === companyExperience);
        if (idx > -1) data.exp.splice(idx, 1);
        li.remove();
    });

    list.appendChild(li);
    document.getElementById("companyExperience").value = "";
    document.getElementById("roleExperience").value = "";
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
   
});