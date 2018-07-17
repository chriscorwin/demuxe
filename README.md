# Demuxe - The Boilerplate UXE Demo App
Demuxe is the starting point for new demos. I propose that "Demuxe" should be pronounced "dem-you", but we should definitely have years long raging religious debates about this.

# First Principles
Decisions about architecture in this project shall be made with an **_aggressive_ bias towards simplicity**.

We very much desire to keep our demo creation process one that does not require learning _how to use tools_, so that we can focus on _simply creating the demo required_.

**Resist the urge** to "improve" this project with your particular favorite tooling.

Any questions that a second (or third) developer thrown at an already-in-progress demo has to ask about _how the thing is being created_ brings the entire project to a grinding halt for half a day or more -- which can be 20% of the total alloted time needed to create the thing.

Every. Hour. Counts.

Do _not_ pollute demos with needless complexity, you're under deadline.

## To Maintain Aggressive Simplicity...

Demos _must_:

- Consist of semantic HTML, vanilla JavaScript, and CSS.
- Only be required to function in Chrome.
- Not use Angular, React, Vue, or any other MVC model/framework/whathaveyou.


Demos _shall_:

- Be as "real" as practical, given the time restraints.
	- Every effort shall be made for elements of demos to be "real" (vs click-able screenshots). 
	- Click-able screenshots are first priority and will be replaced piecemeal as time permits.
- Be served by Heroku. 
	
	- Utilizing a Heroku pipeline is strongly recommended.

Demos _may_: 

- Consist merely of "click-able screenshots", where appropriate.
- Use SCSS, since that is the tool used by our very own [SLDS](https://www.lightningdesignsystem.com) team.
- Make strategic use of JavaScript libraries as-needed to best fulfill the needs of a given demo. 
	
	Keep in mind that such tools are a per-demo decision and do not generally  belong in this boilerplate repository.

	It _is_ entirely apprpriate for some libraries to be so commonly utilized so as to justify their inclusion in this repository.
	
	Examples [D3](https://github.com/d3/d3/wiki/Gallery) and [Highcharts](https://www.highcharts.com/demo), which have been used in nearly every demo we've created thus far to generate interactive graphs where SVGs alone do not suite our purposes.



# How to Use
- Create a fork of this repository for each new demo.
- Create a discrete Heroku pipeline for each new demo.
- Do **not** commit demos back to this repository. 
- In the retrospective phase of a demo, update this repo:
	- Place new components into component gallery.
	- Review and update existing components.
	- Review and update existing templates.
	- Thoughtfully incorporate new ideas for creating demos based on lessons learned.


# Dependencies
This demo utilizes:
- HTML/[EJS](http://ejs.co/#docs)
- JavsScript
- CSS/[node-sass](https://github.com/sass/node-sass)
- [Express](https://expressjs.com/en/4x/api.html)
- [SLDS](https://www.lightningdesignsystem.com)
- SVG (for screenshots & animations where possible)
- [D3](https://github.com/d3/d3/wiki/Gallery) & [Highcharts](https://www.highcharts.com/demo) (for interactive graphs where SVGs will not suite our purposes)


# Setup
- Fork this repository, check out your fork into a directory named something close to, perhaps, the demo you are creating, to avoid confusion with _this project_ and _this repository itself_.
- `cd` into your new directory and run:

	`npm install`

- Get coding, you are under deadline, kiddo.


# The Server


## Starting the Server
`npm run start`


## Understanding the Server
- [Express server](https://expressjs.com).
- Serves from port `:3000` (http://localhost:3000).
- `.ejs` files are processed server-side and served.
	- Routes all requests to corresponding files in `public/` (eg: `localhost:3000/bobs/books` routes to `public/bobs/books.ejs`).
	- User input is magically sanitized using [express-sanitizer](https://www.npmjs.com/package/express-sanitizer).
- All other files under `public/` are served as static files.
- Any query params `?like=this` are passed along into the EJS template and available for use in the global js `locals` object `<%= locals.likeThis %>`.
- EJS files can be included in other EJS files (server side) `<%- include('includes/like-this') %>`.




# Using Livereload

After starting the server (see Starting the Server), open a new Terminal tab and:

`npm run livereload`



# Heroku

It is assumed here, that is, taken as a _given_ that demos _will_ be served on Heroku, utilizing a pipeline.

Getting started with Heroku, setting up a pipeline, etc., is currently _far_ beyond the scope of this document.

1. Push your changes to the dev area of the pipeline.
2. Promote changes to QA for wider testing.
3. Promote changes to Prod for end-use (this is where they will be demo'd from).



# Unit Tests

Demos shall not have unit tests. There is no point in testing code that changes every fifteen minutes for a week straight only to be run exactly once and then thrown away never to be looked at again.



# Visual & Behavioral Testing

Visual testing is done through Mocha/Chai/Differencify.

The demo flow shall have a `.test-drive.test.js` file in `./test/` (if a demo has multiple flows, each flow will have its own test-drive file).

Test drives must through the _entire_ flow of your demo using Mocha+Chai+Phantom to ensure that the flow still works and that it has only changed in expected ways. 

This will also serve as a good form of documentation as to what the expected user behavior for each demo is.

The test-drive shall take screenshots of each step in the flow for reference and comparison.

This boilerplate starts off with an example test-drive in place (`./test/test-drive.test.js`).

Differencify's API matches [Puppeteer's](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) exactly. Reference that when writing interactivity for tests.

Demuxe uses a fork of Differencify that allows us some more flixibility vs what currently exists in the base repository. If someone wants to go through the pain of figuring out Docker and guiding the open PRs through the process etc etc to get these changes merged into the base repository, go for it.



# Spec/Designs

Shall live in `/dev-assets/`. Typically these will be sketch files.



## Sketch -> SVG Files

There is a [deep dive on using SVGs in demos](svg-quirks-deep-dive.md) available.

### Using SVGs summary

SVGs can be used to great effect in demos, but can exhibit layout quirks, where text elements appear misaligned.

This is avoidable by not having a line height set on such elements in the source Sketch files.

Also, SVG files do not have access to fonts the same way HTML elements do, so we've developed a script that embeds the font files in the SVGs themselves.

- Use `svg-font-embedder` to embed fonts inside the Sketch SVG exports.
    - From the root directory of this project, run
	
		`node ./dev-assets/utilities/embed-fonts-in-svgs`

    - By default the script will scan the `public/` directory for all SVG files referencing font files, attempt to locate the required font files on your machine, and, create an embedded copy of the files with the `.embedded.svg` suffix.

    - To convert other project directories, add a directory path when running the script, thus: 
	
		`node ./dev-assets/utilities/embed-fonts-in-svgs ./some/project/path`




# Templates

Templates are page shells that can be quickly used to re-create different products. (eg: DMP Header, Navigation, & Footer)

- Product templates must live in `/templates/{product-name}/`.
	- The goal would be that if a demo requires that template, all someone would have to do is copy the entire contents of the product-specific sub-folder and paste it into `/public/` and they'd have a base-line browser-viewable demo of shell of that product ready to go to modify.
- Product templates shall be an MVP shell and component pages of a product built out as simply, but thoroughly, as possible.
- The more complete our library of product templates the better.
- Once per quarter existing templates shall be audited with designers and updated. In this manner when we are asked to quickly complete a demo, we will have an even better jumping off point.



# Component Gallaries

Component gallaries should contain MVP examples of components used in past demos (eg: graphs on the DMP home page). These shall be lightly documented and reviewed to ensure high confidence in quality, readability, and re-usability (in essence, you shall be able to just open the file and know exactly what to copy/paste and how to use it within a few minutes).



# Hall of Fame

Past demos utilizing this boilerplate (add yours here!)

[Connections 2018 DMP Demo](https://github.exacttarget.com/uxarchitecture/cnx-dmp-2018)
