const { v4 } = require("uuid");
const AWS = require("aws-sdk")

const fetchTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters

    let todos;
    try {
        const result = await dynamodb.get({ TableName: "TodoTable", Key: { id } }).promise();
        todos = result.Item
    }
    catch (error) {
        console.log(error);
    }

    return {
        body: JSON.stringify(todos)
    };
};

module.exports = {
    handler: fetchTodo
}