export const directUpload = async (fileUrl, presignPayload) => {
  let body = new FormData();
  body.append("key", presignPayload.fields.key);
  body.append("bucket", presignPayload.fields.bucket);
  body.append("X-Amz-Algorithm", presignPayload.fields.algorithm);
  body.append("X-Amz-Credential", presignPayload.fields.credential);
  body.append("X-Amz-Date", presignPayload.fields.date);
  body.append("Policy", presignPayload.fields.policy);
  body.append("X-Amz-Signature", presignPayload.fields.signature);
  body.append("file", {
    name: presignPayload.fields.key,
    type: presignPayload.file.mime,
    uri: fileUrl
  })

  return fetch(presignPayload.url, {
    method: 'POST',
    body: body
  });
};
