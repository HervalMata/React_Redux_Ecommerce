const FileUpload = () => {
    const fileUploadAndResize = (e) => {

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