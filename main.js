const cardContainer = document.getElementById("card-container");
const loadingSpinner = document.getElementById("loading-spinner");

const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const btnIssue = document.getElementById("issue-count");

let allCards = [];

// Issue card load function
async function issueCardLoad() {

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    
    allCards = data.data;
    
    displayIssueCard(allCards);

    loadingSpinner.classList.add("hidden");
};

function displayIssueCard (cards) {

    cardContainer.innerHTML = "";

    btnIssue.innerText = `${cards.length} Issues`;


    cards.forEach((card) => {

        const date = new Date(card.updatedAt);
        const dateConverUs = date.toLocaleDateString("en-US");

        let labelsProp = "";

        card.labels.forEach((label) =>{
            labelsProp += `<span class="badge badge-warning whitespace-nowrap text-[10px] font-bold">${label.toLocaleUpperCase()}</span>`
        });

        const newCard = document.createElement("div");
        newCard.className = "";

        if(card.status === "open"){
            newCard.className ="space-y-4 shadow-md p-4 border-t-4 rounded-t-lg border-t-green-700";
        }
        else{
            newCard.className = "space-y-4 shadow-md p-4 border-t-4 rounded-t-lg border-t-purple-700";
        }

        let priorityBadge = "";

        if(card.priority === "high"){
            priorityBadge = "badge badge-dash badge-success";
        }
        else if (card.priority === "medium"){
            priorityBadge = "badge badge-dash badge-warning";
        }
        else{
            priorityBadge = "badge badge-dash badge-error";
        }

        newCard.innerHTML = `
        <div class="flex justify-between">
                    <img src="${card.status === "open" ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="" class="h-6">

                    <span class="${priorityBadge}">${card.priority.toLocaleUpperCase()}</span>
                </div>

                
                    <h2 class="font-semibold text-[#1F2937] line-clamp-1">${card.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${card.description}</p>
                

                <div class="flex gap-2 mt-4">
                    ${labelsProp}
                </div>
                <hr class="text-gray-400">
                <div class="space-y-2">
                    <p class="text-[#64748B]">#${card.author}</p>
                    <p class="text-[#64748B]">Assignee : ${card.assignee ? card.assignee : "Unassigned"}</p>
                    <p class="text-[#64748B]">Updated : ${dateConverUs}</p>
                </div>
        `
        cardContainer.appendChild(newCard);

        newCard.addEventListener("click", function(){

            const date = new Date(card.createdAt);
            const modalDate = date.toLocaleDateString("en-US");

            document.getElementById("modal-title").innerText = card.title;
            document.getElementById("modal-status").innerText = card.status === "open" ? "Opened" : "Closed";
            document.getElementById("modal-author").innerText = `- Opened by ${card.author}`;
            document.getElementById("modal-date").innerText = `- ${modalDate}`;
            document.getElementById("modal-description").innerText = card.description;
            document.getElementById("modal-assignee").innerText = card.assignee ? card.assignee : "Unassigned";
            document.getElementById("modal-priority").innerText = card.priority.toLocaleUpperCase();

            let modalLabels = "";
            card.labels.forEach(label => {
                modalLabels += `<span class="badge badge-warning">${label.toLocaleUpperCase()}</span>`;
            });

            document.getElementById("modal-labels").innerHTML = modalLabels;

            issue_card_details.showModal();
        });
    });
};

// toggle btn function
function toggleBtn (btnActive) {
    btnAll.className = "btn btn-soft";
    btnOpen.className = "btn btn-soft";
    btnClosed.className = "btn btn-soft";
    btnActive.className = "btn btn-primary";
};

// buttons click events
btnAll.addEventListener("click", function(){
    toggleBtn(btnAll);
    displayIssueCard(allCards);
});

btnOpen.addEventListener("click", function(){
    toggleBtn(btnOpen);
    const openCards = allCards.filter(card => card.status === "open");
    displayIssueCard(openCards);
});

btnClosed.addEventListener("click", function(){
    toggleBtn(btnClosed);
    const closedCards = allCards.filter(card => card.status === "closed");
    displayIssueCard(closedCards);
});

issueCardLoad();


// search implement

const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

btnSearch.addEventListener("click", async () => {
    const searchText = inputSearch.value.trim().toLowerCase();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    const data = await res.json();
    

    displayIssueCard(data.data);
});
