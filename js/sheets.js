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


            if (cells[0]?.v === "Memorial Day") {
                console.log("Memorial Day raw cells:", cells);
            }

            return {
                event: cells[0]?.v || "",
                date: parseGoogleDate(cells[1]?.v),
                enabled: cells[2]?.v === true,
                type: cells[3]?.v || "event",
                image: cells[4]?.v || "",
                recurring: cells[5]?.v === true,
                recurringRule: cells[6]?.v || "",
                recurringMonth: String(cells[7]?.v || "").trim(),
                recurringWeek: String(cells[8]?.v || "").trim(),
                recurringWeekday: String(cells[9]?.v || "").trim(),
                recurringOffsetDays: String(cells[10]?.v || "").trim(),
                recurringReference: String(cells[11]?.v || "").trim()
            };

        });
     
    } catch (error) {
        console.error("Unable to load countdown events:", error);
        return [];
    }
}