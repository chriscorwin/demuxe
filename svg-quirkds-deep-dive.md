# Brief deep dive on using SVG content in your demo

Much of the "fake" content on a page can be created simply by exporting a design from Sketch as an SVG and showing it in the proper container.

The SVGs scale well, render beautifully at all sizes, just work, and, we can put them in place and never worry about it again.

Awesome.

However, there is a quirk with SVGs, due to how the "box" and alignments of child elements is figured that setting a line-height on text elements in Sketch and exporting as SVG _can_ (see note below) result in misalignment of elements.

> **Note Below:** We opted for the word "can" above, but in practice, the word "does" is truly more appropriate.
> 
> The misalignment _almost_ always **does** happen. Due to how the math works, there are rare cases where the visual change is so slight as to be not readily noticeable, or the alignment, by accident, ends up putting the text element in the same place, but these cases are _exceedingly rare_.
> 
> The pedants in us require that we use the word "can" above, but, truly think of it as "does".


Happily, the misalignment problem is completely avoidable, simply by _not setting a line height on text elements_ in the Sketch source files.

To make things much easier on everyone involved the following guardrails should be put into place:

1. Designers **MUST NOT** set a line height in Sketch on text elements.
	
	If a line height is set, it can throw off vertical alignement of text in the final SVG exports. (See the "note below", which is above ☝️ )

	The only acceptable setting for line height on a text element in a Sketch file is _not to set one_. The input value field will show a placeholder of "auto".
	
1. While working in Sketch, a human being — whether they are a designer or not — _must_ **NOT** set a line height on text elements.
1. Line height _must not be set on text elements_ in Sketch.
1. Use `/dev-assets/utilities/embed-font-in-svg.js` to embed the fonts in the Sketch SVG exports.

	When embedding SVGs in a webpage, they do not have access to `font-family` and so they will not render exactly as intended. The `embed-font-in-svg` tool modifies the SVG in place so that the font is, get this, _embedded in the SVG_, making the typeface render correctly. 

	Genius.


