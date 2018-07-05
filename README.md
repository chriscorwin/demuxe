# Demuxe - The Boilerplate UXE Demo App
Demuxe is the starting point for new demos. I propose that "Demuxe" should be pronounced "dem-you", but we should definitely have years long raging religious debates about this.

## First Principles
- Demos shall be HTML/JS/CSS. 
- Demos shall function in Chrome.
- Demos shall not use Angular/React/etc.
- Where possible parts of demos may be "click-able screenshots".
	- Every effort shall be made for elements of demos to be "real" (vs click-able screenshots). 
	- Click-able screenshots are first priority and will be replaced as time permits.
- Decision about architecture shall be made with a bias towards simplicity.
- Demos are expected to be served by Heroku. Utilizing a Heroku pipeline is strongly recommended.

## How to Use
- Fork this repo for each new demo. 
- Create a discrete Heroku pipeline for each new demo.
- Do not commit demos back to this repo. 
- In the retrospective phase of a demo, update this repo based on lessons learned.

## Dependencies
This demo utilizes:
- HTML/EJS
- JS
- CSS/LESS
- Express

# Setup
- Fork this repo
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

The boilerplate starts off with a baseline test-drive in place that can be expanded on.

Differencify's API matches [Puppeteer's](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) exactly. Reference that when writing interactivity for tests.

Demuxe uses a fork of Differencify that allows us some more flixibility vs what currently exists in the base repo. If someone wants to go through the pain of figuring out Docker and guiding the open PRs through the process etc etc to get these changes merged into the base repo, go for it.

# Spec/Designs
Shall live in `/dev-assets/`. Typically these will be sketch files.


# Hall of Fame
Past demos utilizing this boilerplate (add yours here!)

[Connections 2018 DMP Demo](https://github.exacttarget.com/uxarchitecture/cnx-dmp-2018)
