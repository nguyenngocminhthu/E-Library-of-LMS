import { storage } from "../config/firebase";

const uploadFilesToFirebase = (file: any, folder: any) => {
  return async () => {
    const result = await Promise.all(
      file.map(async (file: any) => {
        return await upload(file, folder);
      })
    );

    return result.length > 1 ? result : result[0];
  };
};

const upload = async (file: any, folder: any) => {
  const storageRef = storage.ref(`${folder}`);
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};

export { uploadFilesToFirebase };
