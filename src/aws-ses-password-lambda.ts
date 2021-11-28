import * as cdk from "@aws-cdk/core";

/**
 * This CloudFormation stack creates an IAM role with the permission to send
 * e-mails via AWS Simple Email Service to Atlassian Opsgenie.
 */
export class AwsSesPasswordLambda extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
