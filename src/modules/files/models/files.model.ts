interface IFiles {
  file_name: string;
  path_on_server: string;
  file_type: string;
  file_size: string;
  name_on_server: string;
}

export type UserFile = IFiles;
