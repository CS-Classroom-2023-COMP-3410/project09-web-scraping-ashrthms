const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { default: fsExtra } = require('fs-extra/esm');
const fs = require('fs');


axios.get('https://bulletin.du.edu/undergraduate/majorsminorscoursedescriptions/traditionalbachelorsprogrammajorandminors/computerscience/#coursedescriptionstext')
    .then(response => {
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text();
        // console.log('page Title:', pageTitle)
        // console.log(csButton)
        // csButton.attr('aria-expanded', 'true') = true
        // const csButton = $('.toggle').children().get()
        // const courseBlocks = $('sc_sccoursedescs').children().get()
        // console.log($('courseblocktitle'))
        // console.log(courseBlocks)
        formatted = {"courses": []}
        courseBlocks = $('.courseblock').filter((index,courseBlock) => {
            const title = $(courseBlock).find('.courseblocktitle').text()
            const desc = $(courseBlock).find('.courseblockdesc').text()
            console.log(formatted["courses"])
            formatted["courses"].push({"course":title.slice(0,9),"title":title.slice(9,title.indexOf("(")-1)})
            return (title.includes('COMP 3')) && !(desc.includes('Prerequisite: '));
        })
        fs.writeFileSync('results/bulletin.JSON', JSON.stringify(formatted));

    })
    .catch(error =>
        console.log('error:', error)
    )