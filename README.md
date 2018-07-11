# Demuxe - The Boilerplate UXE Demo App
Demuxe is the starting point for new demos. I propose that "Demuxe" should be pronounced "dem-you", but we should definitely have years long raging religious debates about this.

## Quickstart Guie
There _is_ no quickstart guide because it is important to read and understand all of this stuff before beginning.

## First Principles
We very much desire to keep our demo creation process one that does not require learning _how to use tools_, so that we can focus on _simply creating the demo required_.

In order to promote general ease of use, minimize chaos and confusion, and increase likelihood of success when, at a moment’s notice, one is asked jump in "real quick" and knock out a massive demo in a week, working 14 hour days on five hours of sleep... well, the decisions about architecture in this project shall be made with an **_aggressive_ bias towards simplicity**.

It is tempting to believe that your particular favorite bit of tooling will enable creating a demo more quickly, or make it easier to make sweeping changes when they are requested, or... well, all of the reasons _frameworks_ have become A Thing™. 

**Resist this urge:** it is a toxic impulse in a fast-moving demo environment.

Modern website creation has gotten... complex. The more "tooling" a project has the less likely any given developer being tasked with working on that project will already "just know" the tools involved.


### To maintain aggressive simplicity

Demos _must_:

- Consist of semantic HTML, vanilla JavaScript, and CSS.
- Only be required to function in Chrome.
- Not use Angular, React, Vue, or any other MVC model/framework/whathaveyou.


Demos _shall_:

- Be as "real" as practical, given the time restraints.
	- Every effort shall be made for elements of demos to be "real" (vs click-able screenshots). 
	- Click-able screenshots are first priority and will be replaced piecemeal as time permits.
- Be served by Heroku. Utilizing a Heroku pipeline is strongly recommended.

Demos _may_: 

- Consist merely of "click-able screenshots", where appropriate.
- Use a LES


## How to Use
- Create a fork of this repository for each new demo.
- Create a discrete Heroku pipeline for each new demo.
- Do **not** commit demos back to this repository. 
- Often when creating a demo, fantastic new ideas for _how to create demos_ are arrived upon. The retrospective phase of a such demo is a very appropriate time to update _this_ repository based on lessons learned there.
	- Place new components into component gallery.
	- Review and update existing components.
	- Review and update existing templates.


## Dependencies
This demo utilizes:
- HTML/[EJS](http://ejs.co/#docs)
- JavsScript
- CSS/[LESS](http://lesscss.org/#overview)
- [Express](https://expressjs.com/en/4x/api.html)
- SLDS
- SVG (for screenshots & animations where possible)
- [D3](https://github.com/d3/d3/wiki/Gallery) & [Highcharts](https://www.highcharts.com/demo) (for interactive graphs where SVGs will not suite our purposes)

# Setup
- Fork this repository
`npm install`

# Starting the Server
`npm start`

# Using Live Reload
After starting the server (see Starting the Server), open a new Terminal tab and:

`npm livereload`

# Heroku
It is assumed as a given that demos shall be served on heroku, utilizing a pipeline.

1. Push your changes to the dev area of the pipeline.
2. Promote changes to QA for wider testing.
3. Promote changes to Prod for end-use (this is where they will be demo'd from)

# Unit tests
Demos shall not have unit tests.

# Visual & Behavioral testing
Testing is done through Mocha/Chai/Differencify

The demo flow shall have a `.test-drive.test.js` file in `./test/` (if a demo has multiple flows, each flow will have its own test-drive file)

Test drives run through the whole demo flow using Mocha+Chai+Phantom to ensure that the flow still works and that it has only changed in expected ways. This will also serve as a good form of documentation as to what the expected user behavior for each demo is.

The test-drive should take screenshots of each step in the flow for reference and comparison.

This boilerplate starts off with an example test-drive in place (./test/test-drive.test.js).

Differencify's API matches [Puppeteer's](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) exactly. Reference that when writing interactivity for tests.

Demuxe uses a fork of Differencify that allows us some more flixibility vs what currently exists in the base repository. If someone wants to go through the pain of figuring out Docker and guiding the open PRs through the process etc etc to get these changes merged into the base repository, go for it.

# Spec/Designs
Shall live in `/dev-assets/`. Typically these will be sketch files.

## Sketch -> SVG Files
- Designers MUST NOT SET A LINE-HEIGHT in Sketch 
	- If a line-height is set, it can throw off vertical alignement of text in the final SVG exports
	— Designers must NOT set a line-height on text
	- Line height must not be set on text in Sketch
- Use `/dev-assets/utilities/embed-font-in-svg.js` to embed the fonts in the Sketch SVG exports




# Templates
Templates are page shells that can be quickly used to re-create different products. (eg: DMP Header, Navigation, & Footer)
- Product templates shall live in `/templates/{product-name}/`.
- Product templates should be an MVP shell and component pages of a product built out as simply, but thoroughly, as possible.
- The more complete our library of product templates the better.
- Once per quarter existing templates should be audited with designers and updated. In this manner when we are asked to quickly complete a demo, we will have an even better jumping off point.

# Component Gallaries
Component gallaries should contain MVP examples of components used in past demos (eg: graphs on the DMP home page). These should be lightly documented and reviewed to ensure high confidence in quality, readability, and re-usability (in essence, you should be able to just open the file and know exactly what to copy/paste and how to use it within a few minutes).

# Hall of Fame
Past demos utilizing this boilerplate (add yours here!)

[Connections 2018 DMP Demo](https://github.exacttarget.com/uxarchitecture/cnx-dmp-2018)
