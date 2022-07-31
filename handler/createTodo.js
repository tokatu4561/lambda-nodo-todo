const AWS = require("aws-sdk");

const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid')

exports.createTodo = (event, context, callback) =>  {
    const timestamp = new Date().getTime()
    const data = JSON.parse(event.body)
    if (typeof data.todo !== "string") {
        console.log("invalid todo")
        return
    }

    const params = {
        TableName: TODO_TABLE,
        Item: {
            id: uuid.v1(),
            todo: data.todo,
            checked: false,
            created_at: timestamp,
            updated_at: timestamp
        }
    }

    dynamoDb.put(params, (error, data) => {
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