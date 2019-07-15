```
{page name}.ejs
	+-> includes wrapper.ejs
		- passes it the header to use (einstein or not)
		- passes it the name of the content files to use
```

To override the contents of any of these files, do that in `demo-overrides`. Vetted contents from last demo lives here in /product-templates/audience-studio/. After crunch time, audit/vet the new code in `demo-overrides` and move it to product-templates/audience-studio/ so that the next demo will start with a pristine version of the last demo.