const cardContainer = document.getElementById("card-container");
const loadingSpinner = document.getElementById("loading-spinner");


// Issue card load function
async function issueCardLoad() {

    loadingSpinner.classList.remove("hidden");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    
    displayIssueCard(data.data);

    loadingSpinner.classList.add("hidden");
};

function displayIssueCard (cards) {


    cards.forEach((card) => {
        console.log(card);

        const date = new Date(card.updatedAt);
        const dateConverUs = date.toLocaleDateString("en-US");

        let labelsProp = "";

        card.labels.forEach((label) =>{
            labelsProp += `<span class="badge badge-error whitespace-nowrap">${label.toLocaleUpperCase()}</span>`
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
                

                <div class="flex gap-2 items-center min-h-6">
                    ${labelsProp}
                </div>
                <hr class="text-gray-400">
                <div class="space-y-2">
                    <p class="text-[#64748B]">#${card.author}</p>
                    <p class="text-[#64748B]">Assignee : ${card.assignee ? card.assignee : "Unassigned"}</p>
                    <p class="text-[#64748B]">${dateConverUs}</p>
                </div>
        `
        cardContainer.appendChild(newCard);
    });
};

issueCardLoad();
