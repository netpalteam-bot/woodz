import React, { useState, useEffect } from 'react';
import { FolderSync, LogOut, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  fetchWoodzDriveFolder,
  DriveFileItem,
} from '../utils/auth';

interface DriveSyncSectionProps {
  onDriveFilesLoaded: (files: DriveFileItem[]) => void;
}

export const DriveSyncSection: React.FC<DriveSyncSectionProps> = ({
  onDriveFilesLoaded,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [folderName, setFolderName] = useState<string>('WOODZ-Gemini');
  const [driveError, setDriveError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, accessToken) => {
        setUser(authedUser);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadFolderContents = async (accessToken: string) => {
    setIsLoadingDrive(true);
    setDriveError(null);
    try {
      const result = await fetchWoodzDriveFolder(accessToken);
      setFolderName(result.folderName);
      setDriveFiles(result.files);
      onDriveFilesLoaded(result.files);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erreur lors de la synchronisation avec Google Drive.';
      setDriveError(message);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setDriveError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        await loadFolderContents(result.accessToken);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Connexion Google Drive annulée ou refusée.';
      setDriveError(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setDriveFiles([]);
  };

  return (
    <section
      id="drive-sync"
      className="py-16 bg-[#12100E] text-[#F5F2EB] border-b border-[#292524]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-[#181512] border border-[#C5A059]/40 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-2">
                <FolderSync className="w-4 h-4 text-[#C5A059]" />
                <span>Synchronisation Google Drive · Dossier WOODZ-Gemini</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F2EB]">
                Médiathèque &amp; Assets Officiels Wood&apos;Z (Google Drive)
              </h2>
              <p className="text-sm text-[#A8A29E] leading-relaxed mt-2">
                Connectez votre compte Google pour synchroniser en direct toutes les photos et créations haute définition présentes dans le dossier{' '}
                <strong className="text-[#F5F2EB] font-mono-tabular">
                  WOODZ-Gemini
                </strong>{' '}
                et mettre à jour automatiquement les visuels de la carte.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap items-center gap-3">
              {needsAuth || !token ? (
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white hover:bg-[#F5F2EB] text-[#141210] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5 block shrink-0"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  <span>
                    {isLoggingIn
                      ? 'Connexion à Google Drive...'
                      : 'Sign in with Google (WOODZ-Gemini)'}
                  </span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => loadFolderContents(token)}
                    disabled={isLoadingDrive}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08d48] text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isLoadingDrive ? 'animate-spin' : ''}`}
                    />
                    <span>
                      {isLoadingDrive
                        ? 'Synchronisation...'
                        : `Actualiser ${folderName}`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#221F1D] hover:bg-[#292524] text-[#A8A29E] hover:text-[#F5F2EB] border border-[#44403C] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Déconnexion ({user?.email || 'Google'})</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {driveError && (
            <div className="mt-6 p-4 bg-[#D92323]/15 border border-[#D92323] text-xs text-[#F5F2EB]">
              {driveError}
            </div>
          )}

          {/* Display synced files from WOODZ-Gemini if connected */}
          {!needsAuth && driveFiles.length > 0 && (
            <div className="mt-8 pt-8 border-t border-[#292524]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#C5A059]">
                  {driveFiles.length} Fichiers synchronisés depuis Google Drive ({folderName})
                </div>
                <span className="text-xs text-[#A8A29E]">
                  Associés automatiquement aux plats de la carte
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {driveFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-[#0D0C0B] border border-[#292524] p-2 flex flex-col justify-between"
                  >
                    <div className="aspect-square overflow-hidden bg-[#161412] flex items-center justify-center">
                      {file.blobUrl || file.thumbnailLink ? (
                        <img
                          src={file.blobUrl || file.thumbnailLink}
                          alt={file.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-[#A8A29E]" />
                      )}
                    </div>
                    <div className="text-[11px] font-mono-tabular text-[#A8A29E] truncate mt-2">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
