/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { observer } from "mobx-react-lite";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <div>
            <div style={{maxWidth: '200px', marginBottom: '10px'}}>
                <Header sub color="teal" content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </div>
            <div style={{maxWidth: '200px', marginBottom: '10px'}}>
                <Header sub color="teal" content='Step 2 - Resize image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </div>
            <div>
                <Header sub color="teal" content='Step 3 - Preview & Upload' />
                {files && files.length > 0 &&
                    <>
                        <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden', marginBottom: '10px' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>
                }
            </div>
        </div>
    )
})