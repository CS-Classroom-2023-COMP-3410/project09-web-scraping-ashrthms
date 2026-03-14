const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { default: fsExtra } = require('fs-extra/esm');
const fs = require('fs');


axios.get('https://www.du.edu/calendar')
    .then(response => {
        const $ = cheerio.load(response.data);
        let obj;

        // Step 1: Find the script tag containing event data
        // let dataScript = null;
        // $('events-listing__item').each((i, event) => {
        //     const html = $(script).html();
        //     if (html && html.includes('"school_name":"University of Denver"') && html.includes('var obj = ')) {
        //         let jsonStr = html.slice(15,63697);
        //         obj = JSON.parse(jsonStr);
        //         console.log(typeof(obj))
        //     }

        // });


        const formatted = {'events': []};
        $('.events-listing__item').each((i,event) => {
            formatted.events.push({
                title: $(event).find("h3").text(),
                date: $(event).find("p").eq(0).text(),
                time: $(event).find("p").eq(1).text()
            });
        });

        fs.writeFileSync('results/calendar_events.json', JSON.stringify(formatted, null, 2));
        console.log(`Saved ${formatted.events.length} events`);
        

    })
    .catch(error =>
        console.log('error:', error)
    )