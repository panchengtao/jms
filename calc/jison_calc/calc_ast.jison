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
        {return $1;}
    ;

e
    :  '(' operator e e ')'
        {$$ = { operator: $2,children: [$3,$4] }; }
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