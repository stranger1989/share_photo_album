import React, { useState, useEffect } from 'react';

import ImageUpload from '../components/03_organisms/ImageUpload';

const ImageUploadContainer: React.FC<any> = ({ input, reset, resetTriger }) => {
  const [updateValue, _] = useState(input);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    if (files.length === 0) {
      if (updateValue.value) input.onChange(updateValue.value);
    } else {
      input.onChange(files);
    }
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    // setupdateValue(input.value);
    setFiles([]);
    input.onChange(files);
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    resetTriger(false);
  }, [reset]);

  return (
    <ImageUpload files={files} setFiles={setFiles} updateValue={updateValue} />
  );
};

export default ImageUploadContainer;
