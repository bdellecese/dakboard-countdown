function getSpecialCountdown(event) {

    let prefix = "";

    switch(event.type) {

        case "birthday":
            prefix = "🎂 ";
            break;

        case "trip":
            prefix = "✈️ ";
            break;

        case "sports":
            prefix = "🏆 ";
            break;

        case "holiday":
            prefix = "🎉 ";
            break;

        default:
            prefix = "";
    }


    if (event.days === 0) {
        return `${prefix}TODAY!`;
    }


    if (event.days === 1) {
        return `${prefix}TOMORROW!`;
    }

}

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
                <div class="countdown-image-frame">
                    <img
                        class="countdown-image"
                        src="${event.image}"
                    >
                </div>
                
                <div class="event-name">
                    ${event.event}
                </div>
                
                <div class="countdown-text">
                
                ${
                    event.days === 0   
                     ? `<div class="special-countdown">
                        ${getSpecialCountdown(event)}
                     </div>`
   
                    : event.days === 1
                    ? `<div class="special-countdown">
                        ${getSpecialCountdown(event)}
                    </div>`
   
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