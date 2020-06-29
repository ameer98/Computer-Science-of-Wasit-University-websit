export class UploadModel {
    $key: String;
    file: File ;
    name: String;
    url: String;
    created: Date = new Date();
  progress: number;

    constructor(file:File){
        this.file=file;
    }
}
