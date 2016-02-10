var Context = function(parent){
	return Object.create(parent || Library);
};

var Literal = function(value){
    this.value = value;
    return this;
};

var Symbol = function(value){
    this.value = value;
    return this;
};

var Library = {
    first: function(resolve, input, context) {
        resolve = resolve || NOP;
        resolve(input[0]);
    },
    rest: function(resolve, input, context) {
        resolve = resolve || NOP;
        resolve(input.slice(1));
    },
    print: function(resolve, input, context) {
        resolve = resolve || NOP;
        console.log(input[0]);
        resolve(input[0]);
    },
};

var Core = {
	Literal: Literal,
	Symbol: Symbol,
	Context: Context,
	Library: Library,
};

module.exports = Core;
