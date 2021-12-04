import {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceResponse,
} from "aws-lambda";

import * as crypto from "crypto";

var aws = require("aws-sdk");

export const handler = async (
  event: CloudFormationCustomResourceEvent
): Promise<CloudFormationCustomResourceResponse> => {
  const secretAccessKey = event.ResourceProperties.AWSSecretAccessKey;
  let awsRegion: string = process.env.AWS_REGION!;

  if (awsRegion === undefined || awsRegion === "" || awsRegion === null) {
    console.error("The AWS_REGION environment variable has not been set");
    return {
      PhysicalResourceId: "",
      Data: {},
      LogicalResourceId: event.LogicalResourceId,
      RequestId: event.RequestId,
      Status: "FAILED",
      Reason: "The AWS_REGION environment variable has not been set",
      StackId: event.StackId,
    };
  }

  const date: string = "11111111";
  const service = "ses";
  const terminal = "aws4_request";
  const message = "SendRawEmail";
  const version = Buffer.from([0x04]);

  let kDate: Buffer = crypto
    .createHmac(
      "sha256",
      Buffer.from(`AWS4${secretAccessKey}`).toString("utf8")
    )
    .update(date)
    .digest();
  let kRegion: Buffer = crypto
    .createHmac("sha256", kDate)
    .update(awsRegion)
    .digest();
  let kService: Buffer = crypto
    .createHmac("sha256", kRegion)
    .update(service)
    .digest();
  let kTerminal: Buffer = crypto
    .createHmac("sha256", kService)
    .update(terminal)
    .digest();
  let kMessage: Buffer = crypto
    .createHmac("sha256", kTerminal)
    .update(message)
    .digest();

  let signatureAndVersion = Buffer.concat([version, kMessage]);
  let smtpPassword = Buffer.from(signatureAndVersion).toString("base64");

  const responseData: CloudFormationCustomResourceResponse = {
    Status: "SUCCESS",
    PhysicalResourceId: "test-resource",
    StackId:
      "arn:aws:cloudformation:us-east-1:123456789012:stack/test-stack/guid",
    RequestId: "request-id",
    LogicalResourceId: "test-resource",
    Data: {
      SMTPPassword: smtpPassword,
    },
    NoEcho: true,
  };

  return Promise.resolve(responseData);
};
