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
  it.todo("has an AWS Lambda function defined resource");
});
