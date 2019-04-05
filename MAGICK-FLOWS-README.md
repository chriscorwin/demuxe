(draft) Magick Flows README

This is the private version of https://quip.com/axAaAMIRIMhD
With Demuxe Magick Flows, well–organized demos build themselves.

That's what makes them magickal.

In the simplest possible case, one need only place one or more media files into the proper directory, and, poof, next time you start the server a Magick Flow will exist at the same name of the folder you created.

But they can be powerful, too.

Merely by naming your assets in a way the system understands, you can craft a demo with fake hovers, fake drag and drop, fake drawers that fake step in and out, fake sticky headers, fake sticky footers, fake auto-advance, fake everything!

The only thing about a Magick Flow demo that is not fake is the feeling of accomplishment you'll have from nailing your flow down and being able to look at it in a browser three minutes later.

Now go get yourself a cup of coffee, you absolute warlock of demonstrations, you deserve it.



Quick start

* Duplicate the /magick-flows-web-root/magick-flows/jb-test-run-nto directory, rename it to what you want. In this example we shall name it doot.
* In your new /magick-flows-web-root/magick-flows/doot directory, you will find a directory named main: this is where your main content goes.
* Name them whatever you want, they will be displayed one at a time, in alphanumeric order.
* Assets accompnaying your new doot Magick Flow live in a sibling of main, called assets.
* Restart the server and go look at your new Magick Flow in the browser. You can find a handy link right to it in the terminal output of the server.




Outline of what I wanna write about 

* Naming conventions
    * Overview
        * Why use filenames?
        * How the filename is parsed.

Filenames are paresed this way

            * Underscores
                * Number of underscores matter
                    * Three underscores
                        * Three underscores ___ is the main divider. 
                        * The “chunks”  of data derived after dividing it up this way are
                            * sorter
                            * step id
                            * data
                            * notes
                    * Two underscores
                        * Two underscores __ is a sub-divider
                            * The *data* and *notes* nodes can be further divided into sub-nodes.
                            
            * Equals signs
                * A *sub-node* can inform the system that it holds a key-value-pair by containing an equals sign ( = ) 
                * This is how *data** *and* notes* work
            * Dashes
                * Dashes are simply placeholders for spaces. 
                * 
    * Parts of the filename
        * Sorter
        * Step ID
            * Not a "unique" ID
                * The index (zero based) is a unique identifier built into the substrate the system was built upon, so, no need to manually create one.
                * Besides, the tuple of sorter and step identifier makes a unique ID for a step, in a way humans identify with.
            * Use to group headers, footers, drawers for reuse.
                * If you need different (even subtly different) sticky headers for two different steps, use a unique step identifier for each one.
                * 
        * DATA
            * 
        * NOTES
            * Use dashes between words — spaces are ambiguious and ambiguity is slower and less simple.
                * Remmeber: Demuxe has a radical bias towards simplicity.
    * Other slash miscelaneousness
        * Artboards → files
            * Artboard names become your file names
            * Watch for extra spaces at the end of you artboard name.
                * Sketch.app (http://sketch.app/) does not follow Apple's HIG for triple-click select-then-effect efforts and can sometimes leave a hanging extra space at the end, which could lead to an extra space in your filename. Maybe.
                    * Actualyl, let's test this and leave it out if it is rare or nonexistant.
        * Performance considerations
            * SVGs are a verbose file format and can be slow to load. Complex stuff may actually perform better with JPEGs or PNGs.
            * 
* Other considerdations
    * 

Naming conventions

You can name your files alphanumerically so as to to control which order they are presented in.

So, 0000.png will come before 0015.png.

Beyond that there are some conventions you can follow in order to take advantage of Magick Flows', uh, magickalness.




Step Identifier

Take the following filename as an example.

0052___ID=message-is-being-dragged___DATA=use-step-transition__step-transition_auto-advance__step-transition-timing--fast___NOTES=Do-not-forget-to-move-your-mouse-too.svg

We break that file name down into three parts: sorter, step identifier, meta data.


* The sorter is 0000.
* The step identifier is google-search-results.
* The meta data is: has-sticky-header__has-sticky-footer

Header and footer example

0000___ID=google-search-results___DATA=has-sticky-header__has-sticky-footer.png

We break that file name down into three parts: sorter, step identifier, meta data.


* The sorter is 0000.
* The step identifier is google-search-results.
* The meta data is: has-sticky-header__has-sticky-footer

The Magick Flows system will use the step identifier and meta data to find and display header and footer assets for this image.

It will find the header at ../assets/google-search-results___sticky-header.png.



Side transition example

0500___ID=valora-home___DATA=use-step-transition__step-transition_app-switch.png



* The sorter is 0500.
* The step identifier is valora-home.
* The meta data is: use-step-transition__step-transition_app-switch

Given that meta data, the system will do a nice little animation to go between that file and the one before it.

The Demuxe Magick Flows roadmap has plans to implement more special meta data parsing along these lines.




Drawer example

0020___ID=review-journey-analytics___DATA=show-drawer-from-left.svg



* The sorter is 0020.
* The step identifier is valora-home.
* The meta data is: use-step-transition__step-transition_app-switch

Given that meta data, the system will do a nice little animation to go between that file and the one before it.

The Demuxe Magick Flows roadmap has plans to implement more special meta data parsing along these lines.


