function parseGoogleDate(value) {

    if (!value) {
        return "";
    }


    // Google returns Date(YYYY,M,D)
    const match = value.match(
        /Date\((\d+),(\d+),(\d+)\)/
    );


    if (match) {

        const year = match[1];
        const month = String(
            Number(match[2]) + 1
        ).padStart(2, "0");

        const day = String(
            match[3]
        ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    return value;

}

async function getCountdownEvents() {

    try {
        // fetch and parse

        const url =    
        `https://docs.google.com/spreadsheets/d/${CONFIG.googleSheets.id}/gviz/tq?tqx=out:json&sheet=${CONFIG.googleSheets.countdownSheet}`;

        const response = await fetch(url);

        const text = await response.text();

        const json = JSON.parse(

            text.substring(

                text.indexOf("{"),

                text.lastIndexOf("}") + 1

            )

        );


        const rows = json.table.rows;
           return rows.map(row => {
    
            const cells = row.c;
            
        
            return {
                
                event: cells[0]?.v || "",

                date: parseGoogleDate(cells[1]?.v),

                image: cells[2]?.v || "",

                enabled: cells[3]?.v === true,

                type: cells[4]?.v || "event"

            };

        });
     
    } catch (error) {
        console.error("Unable to load countdown events:", error);
        return [];
    }
}