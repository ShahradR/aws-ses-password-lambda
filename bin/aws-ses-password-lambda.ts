#!/usr/bin/env node

/* eslint-disable no-new */

import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsSesPasswordLambda } from "../src/aws-ses-password-lambda";

const app = new cdk.App();
new AwsSesPasswordLambda(app, "AwsSesPasswordLambda");
