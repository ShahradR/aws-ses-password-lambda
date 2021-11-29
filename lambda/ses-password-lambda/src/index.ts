import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from "aws-lambda";

var aws = require("aws-sdk");

export const handler = async (
  event: CloudFormationCustomResourceEvent
): Promise<CloudFormationCustomResourceResponse> => {
  console.log("Entered the application code");

  const responseData: CloudFormationCustomResourceResponse = {
    Status: "SUCCESS",
    PhysicalResourceId: "test-resource",
    StackId:
      "arn:aws:cloudformation:us-east-1:123456789012:stack/test-stack/guid",
    RequestId: "request-id",
    LogicalResourceId: "test-resource",
    Data: {
      TestProperty: "test-value",
    },
  };

  return Promise.resolve(responseData);
};
