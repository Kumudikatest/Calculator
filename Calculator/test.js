let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	console.log("Received request with payload", event);
	let operation = event.Operation;
	let id = event.ID;
	let result = null;
	switch (operation) {
		case "Add":
			result = event.LeftParameter + event.RightParameter;
			break;
		case "Subtract":
			result = event.LeftParameter - event.RightParameter;
			break;
		case "Multiply":
			result = event.LeftParameter * event.RightParameter;
			break;
		case "Devide":
			result = event.LeftParameter / event.RightParameter;
			break;
		case "Mod":
			result = event.LeftParameter % event.RightParameter;
			break;
		default:
			result = "Operation Not Permitted";
			break;
	}
	event.Result = result;
	ddb.put({
		TableName: 'Calculator',
		Item: {'ID': id, 'Result': result}
	}, function (err, data) {
		if (err) {
			//handle error
			console.log("Fail");
		} else {
			//your logic goes here
			console.log("Pass");
		}
	});

	callback(null, event);
}