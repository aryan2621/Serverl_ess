const { v4 } = require("uuid");
const AWS = require("aws-sdk")

const addTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false
  }

  console.log("This is the id of new Todo", id);

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise();

  return {
    body: JSON.stringify(newTodo)
  };
};

module.exports = {
  handler: addTodo
}