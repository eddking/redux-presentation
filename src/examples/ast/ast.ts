import {
  Selector,
  createDictionarySelector,
  liftMap,
  materialize,
} from '../../lib/reselect';

interface BaseExpression {
  type: string;
}

interface Literal extends BaseExpression {
  type: 'literal';
  value: number;
}

interface Property extends BaseExpression {
  type: 'property';
  name: string;
}

interface Addition extends BaseExpression {
  type: 'add';
  left: Expression;
  right: Expression;
}

interface Subtraction extends BaseExpression {
  type: 'subtract';
  left: Expression;
  right: Expression;
}

type Expression = Literal | Subtraction | Addition | Property;

type ConstructedExpression = Selector<State, number>;

function buildExpression(expression: Expression): ConstructedExpression {
  switch(expression.type) {
    case 'literal':
      return (state) => expression.value;
    case 'property':
      return (state) => {
        let dep = state.dep[expression.name]
        return dep === undefined ? null : dep.value;
      };
    case 'add':
      const addleft = buildExpression(expression.left);
      const addright = buildExpression(expression.right);
      return (state) => addleft(state) + addright(state);
    case 'subtract':
      const subleft = buildExpression(expression.left);
      const subright = buildExpression(expression.right);
      return (state) => subleft(state) - subright(state);
  }
}

interface Dep {
  name: string;
  value: number;
}

interface State {
  expressions: { [key: string]: Expression },
  expressionList: string[]
  dep: {
    [key: string]: Dep
  }
}

// Omg i love selectors
let expressions = (state: State) => state.expressions;                           // Selector<Dictionary<Expression>>
let expressionList = (state: State) => state.expressionList;                     // Selector<string[]>
let builtExpressionMap = createDictionarySelector(expressions, buildExpression); // Selector<Dictionary<Selector<number>>>
let expressionValuesMap = liftMap(builtExpressionMap);                           // Selector<Dictionary<number>>
let expressionValuesList = materialize(expressionList, expressionValuesMap);     // Selector<number[]>
