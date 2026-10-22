import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
];

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Impossible de récupérer le jeton Google Drive.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
  blobUrl?: string;
}

export async function fetchWoodzDriveFolder(accessToken: string): Promise<{
  folderId: string | null;
  folderName: string;
  files: DriveFileItem[];
}> {
  // 1. Search for folder named WOODZ-Gemini (or containing WOODZ)
  const folderQuery = encodeURIComponent(
    "mimeType = 'application/vnd.google-apps.folder' and (name = 'WOODZ-Gemini' or name contains 'WOODZ') and trashed = false"
  );
  const folderRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&fields=files(id,name)&pageSize=10`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!folderRes.ok) {
    throw new Error(`Erreur Google Drive (${folderRes.status})`);
  }

  const folderData = await folderRes.json();
  const folders: Array<{ id: string; name: string }> = folderData.files || [];
  const exactFolder =
    folders.find((f) => f.name.toLowerCase() === 'woodz-gemini') || folders[0] || null;

  let filesQuery: string;
  if (exactFolder) {
    filesQuery = encodeURIComponent(
      `'${exactFolder.id}' in parents and trashed = false`
    );
  } else {
    filesQuery = encodeURIComponent(
      "name contains 'WOODZ' and trashed = false"
    );
  }

  const filesRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${filesQuery}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&pageSize=50&orderBy=name`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!filesRes.ok) {
    throw new Error(`Erreur lors de la lecture des fichiers (${filesRes.status})`);
  }

  const filesData = await filesRes.json();
  const rawFiles: DriveFileItem[] = filesData.files || [];

  // Also check if there are subfolders inside WOODZ-Gemini and fetch their images too
  const subFolders = rawFiles.filter(
    (f) => f.mimeType === 'application/vnd.google-apps.folder'
  );

  let allFiles: DriveFileItem[] = rawFiles.filter((f) =>
    f.mimeType.startsWith('image/')
  );

  for (const sub of subFolders.slice(0, 5)) {
    const subQuery = encodeURIComponent(`'${sub.id}' in parents and trashed = false`);
    const subRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${subQuery}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&pageSize=50&orderBy=name`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (subRes.ok) {
      const subData = await subRes.json();
      const subImages = (subData.files || []).filter((f: DriveFileItem) =>
        f.mimeType.startsWith('image/')
      );
      allFiles = [...allFiles, ...subImages];
    }
  }

  // Fetch high-res image blobs for reliable rendering without third-party cookie issues
  const enrichedFiles = await Promise.all(
    allFiles.slice(0, 30).map(async (file) => {
      try {
        const mediaRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (mediaRes.ok) {
          const blob = await mediaRes.blob();
          const blobUrl = URL.createObjectURL(blob);
          return { ...file, blobUrl };
        }
      } catch {
        // Fallback to thumbnailLink
      }
      return file;
    })
  );

  return {
    folderId: exactFolder ? exactFolder.id : null,
    folderName: exactFolder ? exactFolder.name : 'WOODZ-Gemini',
    files: enrichedFiles,
  };
}
