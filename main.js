const { default: axios } = require('axios');
const cheerio = require('cheerio')


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

        const courseBlocks = $('.courseblock')
        // console.log(courseBlocks)


        courseBlocks.filter(function(element) {
            return element.children('.courseblockdesc').text().contains
            
        })
        

    })
    .catch(error =>
        console.log('error:', error)
    )