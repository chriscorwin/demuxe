# Magick Flows

Magick Flows build themselves.

That's what makes them magickal.

In the simplest possible case, one simply need place one or more media files into the proper directory, and, *poof*, next time you start the server a Magick Flow will exist at the same name of the folder you created.

## Quick start

- Duplicate the `/demo-overrides/magick-flows/optical-illusions` directory, rename it to what you want. In this example we shall use `doot`.
- In your new `/demo-overrides/magick-flows/doot` directory, you will find a directory named `main`: this is where your main content goes.
- Name them whatever you want, they will be displayed one at a time, in alphanumeric order.
- Assets accompnaying your new `doot` Magick Flow live in a sibling of `main`, called `assets`.
- Edit the `/demo-overrides/magick-flows/doot/assets/styles.scss` file. In it you shall find a variable telling the SASS system how many slides you have.
- Restart the server and go look at your new Magick Flow in the browser. You can find a handy link right to it in the terminal output of the server.


## Naming conventions

You can name your files alphanumerically so as to to control which order they are presented in.

So, `0000.png` will come before `0015.png`.

Beyond that there are some conventions you can follow in order to take advantage of Magick Flows', uh, magickalness.



### Step Identifier

Take the following filename as an example.

`0052___ID=message-is-being-dragged___DATA=use-slide-transition__slide-transition_auto-advance__slide-transition-timing--fast___NOTES=Do-not-forget-to-move-your-mouse-too.svg`

We break that file name down into three parts: _sorter_, _step identifier_, _meta data_.

- The _sorter_ is `0000`.
- The _step identifier_ is `google-search-results`.
- The _meta data_ is: `has-sticky-header__has-sticky-footer`



### Header and footer example

`0000___ID=google-search-results___DATA=has-sticky-header__has-sticky-footer.png`

We break that file name down into three parts: _sorter_, _step identifier_, _meta data_.

- The _sorter_ is `0000`.
- The _step identifier_ is `google-search-results`.
- The _meta data_ is: `has-sticky-header__has-sticky-footer`

The Magick Flows system will use the _step identifier_ and _meta data_ to find and display header and footer assets for this image.

It will find the header at `../assets/google-search-results___sticky-header.png`.


### Side transition example

`0500___ID=valora-home___DATA=use-slide-transition__slide-transition_app-switch.png`


- The _sorter_ is `0500`.
- The _step identifier_ is `valora-home`.
- The _meta data_ is: `use-slide-transition__slide-transition_app-switch`

Given that meta data, the system will do a nice little animation to go between that file and the one before it.

The Demuxe Magick Flows roadmap has plans to implement more special meta data parsing along these lines.



### Drawer example

`0020___ID=review-journey-analytics___DATA=show-drawer-from-left.svg`


- The _sorter_ is `0020`.
- The _step identifier_ is `valora-home`.
- The _meta data_ is: `use-slide-transition__slide-transition_app-switch`

Given that meta data, the system will do a nice little animation to go between that file and the one before it.

The Demuxe Magick Flows roadmap has plans to implement more special meta data parsing along these lines.


