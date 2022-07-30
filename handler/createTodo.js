const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.createTodo = async (event, context) =>  {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'hellood'})
    }
}