
var Core = require("./Core");
var Context = Core.Context;

var Parser = require("./Parser");

var Interpreter = require("./Interpreter");


var FutureLisp = function(lisp){
	var parsed = Parser.parse(lisp);
	return function(resolve,scope){
		var context = new Context();
		scope = scope || {};
		for(var key in scope){
			if(scope.hasOwnProperty(key)){
				context[key] = scope[key];
			}
		}		
		Interpreter(parsed,context)(resolve);
	};
};

module.exports = FutureLisp;
