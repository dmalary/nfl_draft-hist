// import { got } from 'got';
import { gotScraping } from 'got-scraping';
import * as fs from "fs";

import { years } from './constants.js';
import { teams } from './constants.js';


const url = (team, year) => {
  return `https://www.pro-football-reference.com/teams/${team}/${year}_draft.htm`
}
// console.log(`years`, years)
// console.log(`teams`, teams)
// console.log(`url()`, url('min', '18'))

const scrape = (url, name) => {
  (async () => {
    try {
      gotScraping
        .get(url)
        .then( ({ body }) => 
          // console.log(body)

          fs.writeFileSync(`./data/pages/${name}.txt`, body)
          )
    } catch (err) {
      if (err) console.log(err.res.body)
    }
  })();
}
// scrape('https://www.pro-football-reference.com/teams/min/2018_draft.htm', 'test')

const run = () => {
  for (let n = 0; n < teams.length; n++) {
    for (let i = 0; i < years.length; i++) {
      // console.log(`https://www.pro-football-reference.com/teams/${teams[n]}/${years[i]}_draft.htm`)   

      // scrape(url(teams[n], years[i]), `${teams[n]}-${years[i]}`)
      scrape(url('nyg', years[i]), `nyg-${years[i]}`)
    }
  }
}
run()
