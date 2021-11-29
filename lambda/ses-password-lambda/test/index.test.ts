import { handler } from "../src/index";
import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from "aws-lambda";

describe("the handler function", () => {
  it("should return a CloudFormationCustomResourceResponse object", async () => {
    const cfnEvent: CloudFormationCustomResourceEvent = {
      RequestType: "Create",
      ResponseURL: "https://cloudformation-custom-resource-response-url",
      StackId:
        "arn:aws:cloudformation:us-east-1:123456789012:stack/test-stack/guid",
      RequestId: "request-id",
      LogicalResourceId: "test-resource",
      ResourceType: "Custom::Test",
      ResourceProperties: {
        ServiceToken:
          "arn:aws:lambda:us-east-1:123456789012:function:test-function",
        TestProperty: "test-value",
      },
      ServiceToken:
        "arn:aws:lambda:us-east-1:123456789012:function:test-function",
    };

    const cfnResponse: CloudFormationCustomResourceResponse = {
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

    let result: CloudFormationCustomResourceResponse = await handler(cfnEvent);

    expect(cfnResponse).toEqual(result);
  });
});
