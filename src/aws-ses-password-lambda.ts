import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class AwsSesPasswordLambda extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "AwsSesPasswordLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "dist/index.handler",
      code: lambda.Code.fromAsset("lambda/"),
      timeout: cdk.Duration.seconds(180),
      memorySize: 128,
      environment: {
        AWS_REGION: cdk.Aws.REGION,
      },
      tracing: lambda.Tracing.PASS_THROUGH,
    });
  }
}
