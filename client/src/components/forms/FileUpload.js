import React from 'react';
import {useSelector} from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from 'axios';

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[1], 720, 720, "JPEG",
                    100, 0, (uri) => {
                        console.log(uri);
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`,
                            { image: uri}, {
                                headers: {
                                    authtoken: user ? user.token : "",
                                },
                            }).then((res) => {
                                console.log("IMAGE UPLOAD RES DATA");
                                setLoading(false);
                                allUploadedFiles.push(res.data);
                                setValues({ ...values, images: allUploadedFiles });
                        }).catch((err) => {
                            setLoading(false);
                            console.log("CLOUDINARY UPLOAD ERR", err);
                        });
                    }, "base64"
                );
            }
        }
    };

    return (
        <div className="row">
            <label className="btn btn-primary">
                Escolher Foto
                <input
                    type="file" multiple hidden
                    accept="images/*" onChange={fileUploadAndResize}
                />
            </label>
        </div>
    )
};

export default FileUpload;