export interface IFilesStore {
    files: File[] | undefined;
    setFiles: (files: File[]) => void;
    sendFiles: () => void;
}
