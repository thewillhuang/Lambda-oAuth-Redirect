An Apex Lambda function built using aws codebuild with client id, client secreted stored in codebuild

### try it out
```bash
curl -H "Content-Type: application/json" -H "Accept: application/json" -X POST -d '{ "code": <Auth code from oauth>, }' https://74awtm2943.execute-api.us-east-1.amazonaws.com/prod
```