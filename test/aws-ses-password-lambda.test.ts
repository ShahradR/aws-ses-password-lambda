/* eslint-disable jest/expect-expect, jest/prefer-expect-assertions */

import {
  expect as expectCDK,
  haveResource,
  haveResourceLike,
  countResources,
  Capture,
  anything,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { AwsSesPasswordLambda } from "../src/aws-ses-password-lambda";

const app = new cdk.App();
const stack = new AwsSesPasswordLambda(app, "MyAwsSesPasswordLambdaStack");

describe("the CloudFormation stack", () => {
  it("contains an AWS Lambda function", () => {
    expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
    expectCDK(stack).to(haveResource("AWS::IAM::Role"));
  });
});

describe("the AWS Lambda function", () => {
  it("does not define a function name", () => {
    expectCDK(stack).notTo(
      haveResourceLike("AWS::Lambda::Function", {
        FunctionName: anything(),
      })
    );
  });

  it("references the correct JavaScript file and handler", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        Handler: "dist/src/index.handler",
      })
    );
  });

  it("executes using the Node.js 14 runtime", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        Runtime: "nodejs14.x",
      })
    );
  });

  it("is only allowed to execute for a maximum of three minutes", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        Timeout: 180,
      })
    );
  });

  it("has 128 MB of memory available at runtime", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        MemorySize: 128,
      })
    );
  });

  it("is passed the AWS region as an environment variables", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        Environment: {
          Variables: {
            AWS_REGION: {
              Ref: "AWS::Region",
            },
          },
        },
      })
    );
  });

  it("traces the request if the upstream service requests it", () => {
    expectCDK(stack).to(
      haveResourceLike("AWS::Lambda::Function", {
        TracingConfig: {
          Mode: "PassThrough",
        },
      })
    );
  });
});
