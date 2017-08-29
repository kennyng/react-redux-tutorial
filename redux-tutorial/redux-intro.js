// Redux: Introduction


// Application "state" is described as a plain object (a model with no setters).
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}


// To change state, you need to dispatch an "action" (a plain JS object).
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }


/* To tie state and actions together, write a function called a "reducer"
 * (a function that takes state and action as arguments and returns the
 * next state of the app).
 * NOTE: write smaller reducer functions to manage parts of the state.
 */
function visibilityFilter(state='SHOW ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }]);
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index) => 
          action.index === index 
            ? {text: todo.text, completed: !todo.completed } 
            : todo
      )
    default:
      return state;
  }
}


/*
 * Lastly, write another reducer that manages the complete state of the app
 * by calling those two reducers for the corresponding state keys.
 */
function todoApp(state={}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}




