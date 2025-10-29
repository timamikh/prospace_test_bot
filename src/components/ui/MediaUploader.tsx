/**
 * Компонент загрузки медиа файлов
 * Last Updated: 29-10-2025
 */

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { FILE_UPLOAD } from '@/utils/constants';
import { formatFileSize } from '@/utils/formatters';
import './MediaUploader.css';

export interface MediaUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  maxSize?: number;
  error?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    'video/*': ['.mp4', '.webm'],
  },
  maxSize = FILE_UPLOAD.MAX_FILE_SIZE,
  error,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
    },
    [files, maxFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - files.length,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const getFilePreview = (file: File): string => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return '';
  };

  return (
    <div className="media-uploader">
      <div
        {...getRootProps()}
        className={clsx('media-uploader__dropzone', {
          'media-uploader__dropzone--active': isDragActive,
          'media-uploader__dropzone--error': error,
        })}
      >
        <input {...getInputProps()} />
        <div className="media-uploader__icon">📁</div>
        <p className="media-uploader__text">
          {isDragActive
            ? 'Отпустите файлы здесь'
            : 'Перетащите файлы сюда или нажмите для выбора'}
        </p>
        <p className="media-uploader__hint">
          Максимум {maxFiles} файлов, до {formatFileSize(maxSize)} каждый
        </p>
      </div>

      {error && <p className="media-uploader__error">{error}</p>}

      {files.length > 0 && (
        <div className="media-uploader__preview-list">
          {files.map((file, index) => (
            <div key={index} className="media-uploader__preview-item">
              {file.type.startsWith('image/') ? (
                <img
                  src={getFilePreview(file)}
                  alt={file.name}
                  className="media-uploader__preview-image"
                />
              ) : (
                <div className="media-uploader__preview-placeholder">
                  {file.type.startsWith('video/') ? '🎥' : '📄'}
                </div>
              )}

              <div className="media-uploader__preview-info">
                <p className="media-uploader__preview-name">{file.name}</p>
                <p className="media-uploader__preview-size">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="media-uploader__remove-button"
                aria-label="Удалить файл"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

