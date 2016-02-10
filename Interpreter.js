
var Core = require("./Core");
var Context = Core.Context;
var Literal = Core.Literal;
var Symbol = Core.Symbol;

var Futures = require("./Futures");
var NOP = Futures.NOP;
var rest = Futures.rest;
var Future = Futures.Future;
var ChainFuture = Futures.ChainFuture;
var GateFuture = Futures.GateFuture;

var LiteralFuture = function(input){
	return function(resolve){
		(resolve || NOP)(input.value)
	};
};

var SymbolFuture = function(input, context){
	return function(resolve){
		(resolve || NOP)(context[input.value]);
	};
};

var FunctionFuture = function(input, context){
	return function(resolve){
		resolve = resolve || NOP;
		if(input[0] instanceof Function){
			input[0].call(input[0],resolve,rest(input),context);
		}else{
			resolve.call(NOP,input);
		}
	};
};

var ArrayFuture = function(input, context){
	return function(resolve){
		resolve = resolve || NOP;
		var funcs = input.map(function(x){return EvalFuture(x,context)});
		var onResults = function(_resolve,results){
			FunctionFuture(results,context)(resolve);
		}
        GateFuture(funcs)(onResults);
    };
};

var EvalFuture = function(input, context){
	context = context || new Context();

    if(input instanceof Array){
        return ArrayFuture(input,context);
    }else if(input instanceof Symbol){
        return SymbolFuture(input,context);
    }else if(input instanceof Literal){
        return LiteralFuture(input);
    }
};

var Interpreter = EvalFuture;

module.exports = Interpreter;


