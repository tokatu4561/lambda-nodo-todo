const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = (event, context, callback) =>  { 
    const params = {
        TableName: TODO_TABLE,
        key: {
            id: event.pathParameters.id
        }
    }

    dynamoDb.delete(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error);
            return
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        }

        callback(null, response)
    })

}