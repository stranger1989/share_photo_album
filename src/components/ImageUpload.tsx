import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const thumbsContainer = {
  display: 'flex',
  marginTop: 16,
  overflow: 'scroll',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const useStyles = makeStyles(() =>
  createStyles({
    dropBox: {
      marginTop: 20,
      minHeight: '20px',
      padding: 10,
      border: 'dashed 3px lightgray',
      color: 'lightgray',
      textAlign: 'center',
      '&:hover': {
        color: 'gray',
        border: 'dashed 3px gray',
        cursor: 'pointer',
      },
    },
  }),
);

const Previews: React.FC<any> = ({ input, reset, resetTriger }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="preview" />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    input.onChange(files);
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
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box className={classes.dropBox}>
          Drag and drop some files here, or click to select files<br />
          <Icon fontSize="large">photo</Icon>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </Box>
      </div>
    </section>
  );
};

export default Previews;
