import React from 'react';
import { S3Image } from 'aws-amplify-react';

import { useDropzone } from 'react-dropzone';

import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';

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
    thumbsContainer: {
      display: 'flex',
      marginTop: 16,
      overflow: 'scroll',
    },
    thumb: {
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden',
    },
  })
);

const ImageUpload: React.FC<any> = ({ files, setFiles, updateValue }) => {
  const classes = useStyles();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <Box className={classes.thumb} key={file.name}>
      <Box className={classes.thumbInner}>
        <img
          src={file.preview}
          style={{ width: 'auto', height: '100%', display: 'block' }}
          alt="preview"
        />
      </Box>
    </Box>
  ));

  const updateThumbs = updateValue.value
    ? updateValue.value.map((image: any) => (
        <Box className={classes.thumb} key={image.name}>
          <Box className={classes.thumbInner}>
            <S3Image
              level="public"
              imgKey={image.file.key}
              theme={{
                photoImg: {
                  display: 'block',
                  width: 'auto',
                  height: 100,
                },
              }}
            />
          </Box>
        </Box>
      ))
    : null;

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box className={classes.dropBox}>
          <Typography>
            Drag and drop some files here, or click to select files
          </Typography>
          <ImageIcon fontSize="large" />
          <Box className={classes.thumbsContainer}>
            {files.length === 0 ? updateThumbs : thumbs}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ImageUpload;
