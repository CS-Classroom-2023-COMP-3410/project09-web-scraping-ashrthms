const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { default: fsExtra } = require('fs-extra/esm');
const fs = require('fs');


axios.get('https://denverpioneers.com/site/templates/slideshow-component-template.html')
    .then(response => {
        const $ = cheerio.load(response.data);
        
        // Step 1: Find the script tag containing event data
        let dataScript = null;
        $('script').each((i, script) => {
            const html = $(script).html();
            if (html && html.includes('"type":"events"')) {
                dataScript = html;
            }
        });
        
        if (!dataScript) {
            console.log('Event data not found');
            return;
        }
        
        // Step 2: Extract the JSON from "var obj = {...}"
        const jsonMatch = dataScript.match(/var obj = ({[\s\S]*?});/);
        if (!jsonMatch) {
            console.log('Could not parse JSON');
            return;
        }
        
        // Step 3: Parse the JSON string into a JavaScript object
        const obj = JSON.parse(jsonMatch[1]);
        
        // Step 4: Use the data
        const formatted = {'events': []};
        obj.data.forEach(event => {
            formatted.events.push({
                duTeam: event.sport,
                opponent: event.opponent_id,
                date: event.date
            });
        });
        
        fs.writeFileSync('results/athletic_events.json', JSON.stringify(formatted, null, 2));
        console.log(`Saved ${formatted.events.length} events`);

    })
    .catch(error =>
        console.log('error:', error)
    )