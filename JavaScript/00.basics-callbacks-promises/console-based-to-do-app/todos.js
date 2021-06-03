let input = prompt('Enter you command');
const todos = [];
while (input.toLowerCase() !== 'quit') {
  if (input.toLowerCase() === 'add') {
    let toAdd = prompt('Enter the todo to add');
    while (toAdd.toLowerCase() !== 'back') {
      todos.push(toAdd);
      toAdd = prompt('Enter the todo to add');
    }
  } else if (input.toLowerCase() === 'list') {
    console.log();
    console.log("********** Your Todo's **********");
    for (let todo of todos) {
      console.log(`${todos.indexOf(todo)} : ${todo}`);
    }
    console.log('**********************************');
    console.log();
  } else if (input.toLowerCase() === 'delete') {
    let toDelete = prompt('Enter the index to delete');
    while (toDelete.toLowerCase() !== 'back') {
      if (!Number.isNaN(parseInt(toDelete))) {
        todos.splice(parseInt(toDelete), 1);
      } else {
        // do nothing
        console.error('entered index is invalid');
      }
      toDelete = prompt('Enter the index to delete');
    }
  }
  input = prompt('Enter you command');
}
console.log('you have exited the to-dos app, bye!');
