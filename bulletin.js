const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { default: fsExtra } = require('fs-extra/esm');
const fs = require('fs');


axios.get('https://bulletin.du.edu/undergraduate/majorsminorscoursedescriptions/traditionalbachelorsprogrammajorandminors/computerscience/#coursedescriptionstext')
    .then(response => {
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text();

        formatted = {"courses": []}
        courseBlocks = $('.courseblock').filter((index,courseBlock) => {
            const title = $(courseBlock).find('.courseblocktitle').text().replace(/\u00A0/g, ' ')
            const desc = $(courseBlock).find('.courseblockdesc').text()
            // console.log((title.includes('COMP 3')), !(desc.includes('Prerequisite:') || desc.includes('Prerequisites:')),title,desc.slice(-20,0))
            return (title.includes('COMP 3')) && !(desc.includes('Prerequisite:') || desc.includes('Prerequisites:'));
        })
        // courseBlocks.each((index,cB) => {
        //     console.log($(cB).find('.courseblocktitle').text())
        // })
        courseBlocks.each((index,courseBlock) => {
            // console.log('courseBlock: ',courseBlock)
            const title = $(courseBlock).find('.courseblocktitle').text()
            const desc = $(courseBlock).find('.courseblockdesc').text()
            formatted["courses"].push({"course":title.slice(0,9),"title":title.slice(10,title.indexOf("(")-2)})
        })

        fs.writeFileSync('results/bulletin.JSON', JSON.stringify(formatted));

    })
    .catch(error =>
        console.log('error:', error)
    )