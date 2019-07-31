/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {console.log($1);}
    ;

e
    :  '(' operator e e ')'
        {$$ = $2 == '+' ? $3 + $4 : ($2 == '-' ? $3 - $4 : ($2 == '*'? $3 * $4 : ($2 == '/'? $3 / $4: 0)));}
    | NUMBER
        {$$ = Number(yytext);}
    ;

operator
    : '+'
        {$$ = $1;}
    | '-'
        {$$ = $1;}
    | '*'
        {$$ = $1;}
    | '/'
        {$$ = $1;}
    ;