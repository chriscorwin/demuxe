const sassGenerator = {
	sassVariable: function(name, value) {
		return "$" + name + ": " + value + ";";
	},

	sassVariables: function(variablesObj) {
		return Object.keys(variablesObj).map(function (name) {
			return sassGenerator.sassVariable(name, variablesObj[name]);
		}).join('\n')
	},

	sassImport: function(path) {
		return "@import '" + path + "';";
	}
}


module.exports = sassGenerator;
