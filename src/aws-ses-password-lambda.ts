import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { CfnParameter } from "@aws-cdk/core";

export class AwsSesPasswordLambda extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let codeSource: lambda.Code;

    if (this.node.tryGetContext("isTaskcatRun") === "true") {
      codeSource = lambda.Code.fromCfnParameters({
        bucketNameParam: new CfnParameter(this, "bucketName"),
        objectKeyParam: new CfnParameter(this, "ObjectKey"),
      });
    } else {
      codeSource = lambda.Code.fromAsset("lambda/ses-password-lambda");
    }

    const lambdaFunction = new lambda.Function(this, "AwsSesPasswordLambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "dist/src/index.handler",
      code: codeSource,
      timeout: cdk.Duration.seconds(180),
      memorySize: 128,
      environment: {
        AWS_REGION: cdk.Aws.REGION,
      },
      tracing: lambda.Tracing.PASS_THROUGH,
    });
  }
}
