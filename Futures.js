
var NOP = function(){};

var defer = function(func,timeout){
	setTimeout(func,timeout || 0);
}

var first = function(args){
	return args[0];
}

var rest = function(args){
	return Array.prototype.slice.call(args,1);
}

var Future = function(func){
	return function(){
		var _arguments = arguments;
		var wrapper = function(){
			func.apply(this || func,_arguments);
		}.bind(this);
		defer(wrapper);
	};    
};

var ChainFuture = function(funcs){
	funcs = funcs.slice();
	funcs.reverse();

	var helper = function(a,b){
		return function(){
			var args = [b];
			args.push.apply(args,arguments);
			a.apply(undefined,args);
		}
	};	

	return Future(function(){
		var resolve = first(arguments) || NOP;
		var params = rest(arguments);

		for(var i=0;i<funcs.length;i++){
			resolve = helper(funcs[i],resolve);
		}

		resolve.apply(undefined,params);
	});
};

var GateFuture = function(funcs){
    funcs = funcs.slice();
	var UNSET = {};

	var helper = function(array,index,resolve){
		return function(result){
			array[index] = result;
			for(var i=0;i<array.length;i++){
				if(array[i] === UNSET){return;}
			}
			resolve.apply(undefined,[NOP,array]);
		};
	};

	return Future(function(){
		var resolve = first(arguments) || NOP;
		var params =  rest(arguments);
		var results = [];

		for(var i=0;i<funcs.length;i++){
			results[i] = UNSET;
		}

		for(var i=0;i<funcs.length;i++){
			var args = [helper(results,i,resolve)]
			args.push.apply(args,params);
			funcs[i].apply(undefined,args);
		}
	});
}


var Futures = {
	NOP: NOP,
	defer: defer,
	first: first,
	rest: rest,
	Future: Future,
	ChainFuture: ChainFuture,
	GateFuture: GateFuture,
};

module.exports = Futures;
