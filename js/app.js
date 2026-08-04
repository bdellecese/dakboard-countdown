async function renderCountdown() {

    const container = document.getElementById(
        "countdown-container"
    );

    container.innerHTML = "";

    const sourceEvents = await getCountdownEvents();

    const events = prepareEvents(sourceEvents)
    .slice(0, CONFIG.maxEvents);

    
    if (CONFIG.debug) {

        console.table(events);

    }


    for(let i=0; i<CONFIG.maxEvents; i++) {

        const event = events[i];

        const slot = document.createElement("div");
        slot.className = "countdown-slot";


        if(event) {

            slot.innerHTML = `
                <img 
                    class="countdown-image"
                    src="${event.image}"
                >
                
                <div class="event-name">
                    ${event.event}
                </div>
                
                <div class="countdown-text">
                
                ${
                    event.days === 0   
                    ? `<div class="special-countdown">TODAY!</div>`
   
                    : event.days === 1
                    ? `<div class="special-countdown">TOMORROW</div>`
   
                    : `
   
                    <div class="countdown-number">
                        ${event.days}
                    </div>

   
                    <div class="countdown-label">
                        DAYS
                    </div>
   
                    `
   
                }

</div>
            `;  
        }


        container.appendChild(slot);
    }
}


renderCountdown();