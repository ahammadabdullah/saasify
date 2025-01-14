import B2 from "backblaze-b2";

let b2Instance: B2 | null = null;

const appKeyID: string = process.env.NEXT_PUBLIC_B2_KEY_ID!;
const appKey: string = process.env.NEXT_PUBLIC_B2_APPLICATION_KEY!;

export const getB2Instance = async () => {
  if (!b2Instance) {
    b2Instance = new B2({
      applicationKeyId: appKeyID,
      applicationKey: appKey,
    });
    await b2Instance.authorize();
  }
  return b2Instance;
};

export const uploadFileToB2 = async ({
  fileName,
  fileData,
  bucketId,
  folderName,
}: {
  fileName: string;
  fileData: Buffer;
  bucketId: string;
  folderName?: string;
}) => {
  const b2 = await getB2Instance();
  const response = await b2.getUploadUrl({ bucketId });

  return await b2.uploadFile({
    uploadUrl: response.data.uploadUrl,
    uploadAuthToken: response.data.authorizationToken,
    fileName: folderName ? `${folderName}/${fileName}` : fileName,
    data: fileData,
  });
};
