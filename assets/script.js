
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
     
     
     
        card.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <div class="w-10 h-10 overflow-hidden rounded-full  flex items-center justify-center">
                     <img src = ${worker.imgUrl} alt = ${worker.name} image class="rounded full w-full h-full object-cover">
                </div>
              
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
       
         const imgUrl =document.getElementById('imgUrl').value;
        
        let valid = true;
        
       
        if(imgUrl === ""){
            alert("image vide")
            valid = false;
        }else{
            valid = true 
            data.preview.imgUrl=imgUrl;
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

// Validation role principal
const role = document.getElementById("role").value;
if (role) {
    data.preview.role = role;
}


        
        // Validation role
        const roleExperience = document.getElementById("roleExperience").value;
        const errorRoleExperience = document.getElementById("errorRoleExperience");

        if (roleExperience === "") {
           errorRoleExperience.textContent = "Please select a role";
            valid = false;
        } else {
           errorRoleExperience.textContent = "";
            data.exp.roleExperience = roleExperience;
        }
        
        // Validation company
        const companyExperience = document.getElementById("companyExperience").value;
        const errorCompany = document.getElementById("errorCompany");
        const regexCompany = /^[A-Za-z\s]+$/;
        
        if (companyExperience === "") {
            errorCompany.textContent = "Please enter your company";
            valid = false;
        } else if (!regexCompany.test(companyExperience)) {
            errorCompany.textContent = "Please enter your company with letters only";
            valid = false;
        } else {
            errorCompany.textContent = "";
            data.preview.companyExperience = companyExperience;
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
//validation date

const from=document.getElementById("from").value;
const errorFrom=document.getElementById("errorFrom");
const to=document.getElementById("to").value;
const errorTo=document.getElementById("errorTo");

if(from>to){
    errorFrom.textContent="please enter the start date bigger than end date "
     errorTo.textContent="please enter the end date smaller than start date  "
     valid=false
}

else{
    errorFrom.textContent=""
     errorTo.textContent=""
      data.exp.from = from;
       data.exp.to = to;
}






        
        
        if (valid) {
            // Add worker to array
           

            workers.push({
                name: data.preview.name,
                role: data.preview.role,
                companyExperience: data.exp.companyExperience,
roleExperience:data.exp.roleExperience,
                email: data.preview.email,
                phone: data.preview.phone,
                imgUrl:data.preview.imgUrl,
            });
            
            
          
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
                <button class="btn px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-800">Delete</button>
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