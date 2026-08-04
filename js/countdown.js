function daysUntil(dateString) {

    const today = new Date();
    today.setHours(0,0,0,0);

    const [year, month, day] = dateString.split("-");


    const eventDate = new Date(
        year,
        month - 1,
        day
    );

    eventDate.setHours(0,0,0,0);

    const diff = eventDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


function formatCountdown(days) {

    if (days === 0) {
        return "TODAY!";
    }

    if (days === 1) {
        return "Tomorrow";
    }

    return `${days} Days`;
}

function prepareEvents(events) {

    return events
        .filter(event => event.enabled)
        .map(event => ({
            ...event,
            days: daysUntil(event.date)
        }))
        .filter(event => event.days >= 0)
        .sort((a,b) => a.days - b.days);
}