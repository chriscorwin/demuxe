The users.json file is a list of valid usernames and passwords across Demuxe.

If you need to add a username/password for just a single demo, do that in the demo's config file:

```
	"users": [
		{
			"id": 0,
			"username": "username",
			"password": "password",
			"displayName": "Demo User",
			"emails": [ { "value": "cmcculloh@salesforce.com" } ]
		}
	],
```

To disable auth for a particular app, add the  following line to your config.json:

```
	"noAuth": true,
```