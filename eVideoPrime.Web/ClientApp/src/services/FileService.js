import axios from "axios";
import { WEB_ADDRESS } from "../helpers/constant";

const FileService = {
    UploadFiles
}

function UploadFiles(file) {
    const uri = WEB_ADDRESS;
    return axios.post(uri + '/api/file/UploadFiles', file)
        .then((res) => res)
        .catch((err) => err);
}

export default FileService;