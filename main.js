const cardContainer = document.getElementById("card-container");


// Issue card load function
async function issueCardLoad() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    
    displayIssueCard(data.data);
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
        newCard.className = "space-y-4 shadow-md p-4";
        newCard.innerHTML = `
        <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="" class="h-6">
                    <span class="badge badge-outline badge-success">${card.priority.toLocaleUpperCase()}</span>
                </div>

                
                    <h2 class="font-semibold text-[#1F2937] line-clamp-1">${card.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${card.description}</p>
                

                <div class="flex gap-2 items-center min-h-6">
                    ${labelsProp}
                </div>
                <hr class="text-gray-400">
                <div class="space-y-2">
                    <p class="text-[#64748B]">#${card.author}</p>
                    <p class="text-[#64748B]">${dateConverUs}</p>
                </div>
        `
        cardContainer.appendChild(newCard);
    });
};

issueCardLoad();
