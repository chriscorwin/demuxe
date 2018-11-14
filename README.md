# Demuxe - The Boilerplate UXE Demo App
Demuxe is the starting point for new demos. I propose that "Demuxe" should be pronounced "dem-you", but we should definitely have years long raging religious debates about this.

Demuxe is the Class. Your demo is the Object.
Demuxe is the Prototype. Your demo is the Instantiation.
Demuxe is the Mold. Your demo is the Cast.

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
	
	Keep in mind that such tools are a per-demo decision and need not necessarily be included in all demos.

	It _is_ entirely appropriate for some libraries to be so commonly utilized so as to justify their inclusion in this repository.
	
	Examples [D3](https://github.com/d3/d3/wiki/Gallery) and [Highcharts](https://www.highcharts.com/demo), which have been used in nearly every demo we've created thus far to generate interactive graphs where SVGs alone do not suite our purposes.



# How to Use
- Create a fork of this repository, or a new topic branch, for each new demo.
- Create a discrete Heroku pipeline for each new demo.
- Do **not** commit demos directly back to master in this repository. 
- In the retrospective phase of a demo, update master in this repo:
	- Identify and separate out components within your template.
	- Review and update existing components in your template.
	- Review and update your template.
	- Thoughtfully incorporate new ideas for Demuxe itself based on lessons learned.


# Dependencies
Demuxe utilizes:
- HTML/[Custom EJS 2.6.1](https://github.com/cmcculloh/ejs/)
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

- Edit `/config/config.json` (and other config files). 
	- Specify your brand and product-template. 
	- `config.json` should be _production settings_.
- Get coding, you are under deadline, kiddo.


# The Server


## Starting the Server
`npm start`


## Understanding the Server
- [Express server](https://expressjs.com).
- Serves from port `:3000` (http://localhost:3000).
- `.ejs` files are processed server-side and served.
	- Routes all requests to corresponding files in `/your-code-here/`, `/product-templates/{config.productTemplate}`, and `/engine/` _in that order_ (eg: `localhost:3000/bobs/books` routes to `your-code-here/bobs/books.ejs`, if that doesn't exist, it tries `/product-templates/{config.productTemplate}/bobs/books.ejs`, if that doesn't exist, it tries `/engine/bobs/books.ejs`, and if that doesn't exist it serves up `/engine/404.ejs` (unless you've overridden that in the product-template or `your-code-here`)).
	- User input is magically sanitized using [express-sanitizer](https://www.npmjs.com/package/express-sanitizer).
- All other files under `/your-code-here/`, `/product-templates/{config.productTemplate}`, and `/engine/` are served as static files, _in that order of prioritization_.
- Any query params `?like=this` are passed along into the EJS template and available for use in the global js `locals.sanitizedQueryParams` object `<%= locals.sanitizedQueryParams.likeThis %>`.
- EJS files can be included in other EJS files (server side) `<%- include('includes/like-this') %>` and follow the same rules as outlined in `.ejs` bullet-point above.




# Using Livereload

After starting the server (see Starting the Server), open a new Terminal tab and:

`npm run livereload`



# Heroku

It is assumed here, that is, taken as a _given_ that demos _will_ be served on Heroku, utilizing a pipeline.

## Setting up your pipeline
1. Create a new pipeline (you can connect to Github if you are using a fork of Demuxe, otherwise do not).
2. Create a `{app-name}-dev`, `{app-name}-qa`, and `{app-name}` environment in the pipeline for the app.
	- You may have to create the `-dev` version in the "staging" area of the pipeline and then click on the disclosure menu at the top right of the app tile and select "Move app to `development`". Heroku pipelines do not seem to have `development` channels by default that you can easily add apps to.
3. Click into the dev instance of your app.
4. Click on the deploy tab.
5. Copy the command from the very bottom for "Existing Git repository".
	It will look something like this: `heroku git:remote -a laulima-2018-dmp-dev`.
6. Run the command in your terminal.

## Deploying
1. `git push heroku {branch}:master` your changes to the dev area of the pipeline to test a branch in dev on Heroku.
2. `git push heroku master` to push master to dev.
3. Use the Heroku interface to promote dev to QA for wider testing.
3. Use the Heroku interface to promote QA to Prod for end-use (this is where they will be demo'd from).



# Unit Tests

Demos shall not have unit tests. There is no point in testing code that changes every fifteen minutes for a week straight only to be run exactly once and then thrown away never to be looked at again.



# Visual & Behavioral Testing

Each demo must have an explicitly defined "demo flow". This is created as the _first thing_ you do when making a new Demo. This can reasonably be done in your initial discovery meeting with the designer and will function as your spec. See [/test/README.md]() for more information.

# Visual Design Artifacts

Shall live on your machine or in corporate Google Drive. Typically these will be sketch files. These should never be merged into Demuxe because it will bloat the repo and eventually make it so you literally _can't push your changes_.

# Brand Theming
Enables brand re-use across demos, and brand-theming demos, quickly and easily.

All brand assets and verbiage associated with that brand shall live in `/brand-themes/{brand-name}/`. 

You must structure your brand assets as follows:

```
/brand-themes/{brand-name}/
    +-- styles/
    |    +-- brand.css
    +-- javascripts/
    |    +-- brand.js
    +-- images/
    |    +-- brand-logo.svg
    +-- localization.js
```

NOTE: The folder name is named after the brand (eg, `/brand-themes/ducati/`) but the actual files themselves are named `brand` as the core brand theme files are standardized across all brands.

`/brand-themes/{brand-name}/localization.js` typically imports all sorts of other localization/data from other files so that it isn't just one huge massive JS Object in a single file.


## Sketch -> SVG Files

There is a [deep dive on using SVGs in demos](svg-quirks-deep-dive.md) available.

### Using SVGs summary

SVGs can be used to great effect in demos, but can exhibit layout quirks, where text elements appear misaligned.

This is avoidable by not having a line height set on such elements in the source Sketch files.

Also, SVG files do not have access to fonts the same way HTML elements do, so we've developed a script that embeds the font files in the SVGs themselves.

- Use `svg-font-embedder` to embed fonts inside the Sketch SVG exports.
	- Install the font embedder manually

		`npm install git+ssh://git@github.exacttarget.com:uxarchitecture/svg-font-embedder.git`

		**DO NOT** put this in package.json because it will cause heroku deploys to fail. Eventually this repo needs moved to github.com/salesforce-ux (or somewhere else that Heroku can see it)
	- From the root directory of this project, run
	
		`node ./dev-assets/utilities/embed-fonts-in-svgs`

	- By default the script will scan the `your-code-here/` directory for all SVG files referencing font files, attempt to locate the required font files on your machine, and, create an embedded copy of the files with the `.embedded.svg` suffix.

	- To convert other project directories, add a directory path when running the script, thus: 
	
		`node ./dev-assets/utilities/embed-fonts-in-svgs ./some/project/path`




# Product Templates

Product Templates are page shells that can be quickly used to re-create different products.

- Product templates must live in `/product-templates/{product-name}/`.
	- The goal would be that whatever product a demo requires is mostly already present in a relatively up-to-date form.
- Product templates shall be an MVP shell and components of a product built out as simply, but thoroughly, as possible.
- Each time a product template is used in a demo, once the demo is complete, the product template should be updated with the cleaned up version of the demo code.
- The more complete our library of product templates the better.
- Once per quarter existing templates shall be audited with designers and updated. In this manner when we are asked to quickly complete a demo, we will have an even better jumping off point.

## Components
Components:
- Are _single file_ modules containing all JS, CSS, and HTML required to display the component on the page.

	If the component has a dependency which is not present within the component itself, that dependency shall be noted at the top of the component's file.

- Live within the template for which they were created.
- Shall be lightly documented and reviewed to ensure high confidence in quality, readability, and re-usability.
	
	The intent is that you ought to be able to copy a component out of any template into whatever demo you are building regardless of the template the component was originally built for.



# Hall of Fame

Past demos utilizing this boilerplate (add yours here!)

[Connections 2018 DMP Demo](https://cnx-dmp-2018.herokuapp.com/)*
[Connections 2018 DMP 201 Demo](https://cnx-dmp-2018.herokuapp.com/201/)**
[Laulima 2018 DMP Demo - Crocs](https://laulima-2018-dmp.herokuapp.com/) (This demo never saw the light of day)
[Dreamforce 2018 DMP Demo](https://dmp-dreamforce-2018.herokuapp.com/)
[Dreamforce 2018 201 DMP Demo](https://df-dmp-2018.herokuapp.com/)**
[Dreamforce 2018 ROI DMP Demo](https://roi-einstein-df18.herokuapp.com/) (This demo was huge and was created in two days, perfectly illustrating the extreme power of Demuxe)


* This demo used the predicessor to Demuxe, and is what Demuxe was loosely based on. It is listed here in honor of the vast swaths of code that were taken from it in order to create Demuxe.
** This demo is in need of being moved over to this boilerplate, and continues to utilize the precursor to Demuxe. It is included on this list as a reminder to upgrade Demuxe to accomodate the featureset this demo requires (namely, account switching)
