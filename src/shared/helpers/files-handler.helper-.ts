import { CreateFileDto } from 'src/modules/files/dtos/create-file.dto';
import { existsSync, writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { UserFile } from 'src/modules/files/models/files.model';
import { NotFoundException } from '@nestjs/common';
interface getFileByName {
  getFileByFileName: (file_name: string) => Promise<Buffer>;
}

interface getFileByPath {
  getFileByPath: (file_path: string) => Promise<Buffer>;
}

export const base64_decodeAsync = (
  fileToSave: CreateFileDto,
): Promise<UserFile> => {
  return new Promise(async (resolve, reject) => {
    try {
      const name_on_server =
        uuid() + fileToSave.file_name + '.' + fileToSave.file_type;
      const folder_on_server = DetermineFileFolder(fileToSave.file_type);
      const full_path = join(__dirname, '/uploads/' + folder_on_server + '/');
      VerifyDirectoryExists(full_path); //Assure that folder exists
      var buffer = new Buffer(fileToSave.content, 'base64'); //Since its coming from a web client
      writeFileSync(full_path + name_on_server, buffer);
      resolve({
        ...fileToSave,
        path_on_server: full_path + name_on_server,
        file_size: buffer.length.toString(),
        name_on_server: name_on_server,
      });
    } catch (ex: any) {
      reject(ex);
    }
  });
};

export const delete_fileAsync = (userFile: UserFile): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      unlinkSync(userFile.path_on_server);
      resolve(true);
    } catch (ex: any) {
      console.log(ex.message);
      reject(ex);
    }
  });
};

//IT RETURNS FILE PATH
export default function getFilePath(file_name: string) {
  const file_type = file_name.split('.').pop(); //File type
  const folder_on_server = DetermineFileFolder(file_type);
  const full_path = join(__dirname, '/uploads/' + folder_on_server + '/');
  return join(full_path, file_name);
}

function DetermineFileFolder(file_type: string) {
  const image = ['jpg', 'png', 'jpeg'];
  const music = ['mp3', 'wma'];
  const video = ['mp4', 'avi', 'mkv', '3gp'];
  const document = ['txt', 'docx', 'xslx', 'csv'];
  const executable = ['exe', 'msi'];
  if (image.some((x) => x === file_type)) return 'image';
  if (music.some((x) => x === file_type)) return 'music';
  if (video.some((x) => x === file_type)) return 'video';
  if (document.some((x) => x === file_type)) return 'document';
  if (executable.some((x) => x === file_type)) return 'executable';
  return 'others';
}

function VerifyDirectoryExists(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}
