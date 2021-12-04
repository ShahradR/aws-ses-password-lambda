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
        AWSSecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
      ServiceToken:
        "arn:aws:lambda:us-east-1:123456789012:function:test-function",
    };

    process.env.AWS_REGION = "ca-central-1";

    const cfnResponse: CloudFormationCustomResourceResponse = {
      Status: "SUCCESS",
      PhysicalResourceId: "test-resource",
      StackId:
        "arn:aws:cloudformation:us-east-1:123456789012:stack/test-stack/guid",
      RequestId: "request-id",
      LogicalResourceId: "test-resource",
      Data: {
        SMTPPassword: "BAasSsnWzpnb1x/UOD58KEOQvGKrh4RNYWJDqqq9/dFC",
      },
      NoEcho: true,
    };

    let result: CloudFormationCustomResourceResponse = await handler(cfnEvent);

    expect(cfnResponse).toEqual(result);
  });

  it("should derive the SMTP password from the AWS access key ID", async () => {
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
        AWSSecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
      ServiceToken:
        "arn:aws:lambda:us-east-1:123456789012:function:test-function",
    };
    process.env.AWS_REGION = "ca-central-1";

    let result: CloudFormationCustomResourceResponse = await handler(cfnEvent);

    expect(result.Data!.SMTPPassword).toEqual(
      "BAasSsnWzpnb1x/UOD58KEOQvGKrh4RNYWJDqqq9/dFC"
    );
  });

  it("should return an error if the AWS_ACCOUNT_ID value has not been set", async () => {
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
        AWSSecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
      ServiceToken:
        "arn:aws:lambda:us-east-1:123456789012:function:test-function",
    };

    process.env.AWS_REGION = "";

    const cfnResponse: CloudFormationCustomResourceResponse = {
      Status: "FAILED",
      PhysicalResourceId: "",
      StackId:
        "arn:aws:cloudformation:us-east-1:123456789012:stack/test-stack/guid",
      RequestId: "request-id",
      LogicalResourceId: "test-resource",
      Data: {},
      Reason: "The AWS_REGION environment variable has not been set",
    };

    let result: CloudFormationCustomResourceResponse = await handler(cfnEvent);

    expect(cfnResponse).toEqual(result);
  });
  it("uses the NoEcho field to mask the output of the custom resource", async () => {
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
        AWSSecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
      ServiceToken:
        "arn:aws:lambda:us-east-1:123456789012:function:test-function",
    };

    process.env.AWS_REGION = "ca-central-1";

    let result: CloudFormationCustomResourceResponse = await handler(cfnEvent);

    expect(result.NoEcho!).toEqual(true);
  });
});
