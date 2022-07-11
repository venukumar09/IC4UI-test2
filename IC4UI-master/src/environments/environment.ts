// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = 'http://127.0.0.1:8000';
const uri = 'http://127.0.0.1:4200/';
export const environment = {

  production: true,
  apiTemplatesURL : `${url}`,
  logApiURL: `${url}/api/log/`,
  templatesURL:`${uri}assets/templates/`,

  local_api : `${url}/api/`,
  server_api : 'https://ic4api.gathi.in/api/',
  //AWS S3 Bucket details
  // aws_accessKeyId: 'AKIAJVC2GE4NVRWK457Q',
  // aws_secretAccessKey:'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',
  // aws_region:'us-east-1',
  // aws_acl:'public-read',
  // aws_object_url:'https://s3.us-east-2.amazonaws.com/'

  aws_accessKeyId: 'AKIAYAQGZ6ZS5RV56OUN',
  aws_secretAccessKey:'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',
  aws_region:'us-east-2',
  aws_acl:'public-read',
  aws_object_url:'https://s3.us-east-2.amazonaws.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
