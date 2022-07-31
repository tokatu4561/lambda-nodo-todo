const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.createTodo = (event, context, callback) =>  { 
    const params = {
        TableName: TODO_TABLE,
        key: {
            id: event.pathParameters.id
        }
    }

    dynamoDb.scan(params, (error, data) => {
        if (error) {
            console.error(error);
            callback(new Error);
            return
        }

        const response = data.Item ? 
        {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        } : {
            statusCode: 404,
            body: JSON.stringify("data not fond")
        }

        callback(null, response)
    })

}