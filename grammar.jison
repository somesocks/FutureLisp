/* lexical grammar */
%lex
%%

\s+                   {return;}
'('                   {return '(';}
')'                   {return ')';}
[-+]?[0-9]*\.?[0-9]+  {return 'number';}
\"(\\.|[^\\"])*\"     {return 'string';}
[a-zA-Z][a-zA-Z0-9]*  {return 'symbol';}
<<EOF>>               {return 'eof';}
/lex

%% /* language grammar */

lisp:
   expression eof {return $1;};

expression:
   number {$$ = $number;/*number*/}
 | string {$$ = $string;/*string*/}
 | symbol {$$ = $symbol;/*symbol*/}
 | list   {$$ = $list;/*list*/};

list:
   '(' items ')' {$$=$items;}
 | '(' ')'       {$$=[];};

items:
   expression items {$$=$items;$$.unshift($expression);}
 | expression       {$$=[$expression]};

%%
