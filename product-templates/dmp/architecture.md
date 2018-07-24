```
{page name}.ejs
	+-> includes wrapper.ejs
		- passes it the header to use (einstein or not)
		- passes it the name of the content files to use
```

If someone wants to overwrite the contents, they do that in `your-code-here`. Vetted contents from last demo lives in templates. After crunch time they audit/vet the contents and move it to product-templates/{product}/.