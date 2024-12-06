import React, { useState } from 'react';
import { RoutineEditorProps } from './RoutineEditor.types';
import { validateRoutineSession } from '../../utils/routineValidator';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './RoutineEditor.module.scss';

const RoutineEditor: React.FC<RoutineEditorProps> = ({
  onAccept,
  onCancel,
  placeholder = 'Write your routine here...',
}) => {
  const [text, setText] = useState<string>('');

  const handleAccept = () => {
    const isValid = validateRoutineSession(text);

    if (isValid) {
      toast.success('Routine is valid!', { position: 'top-right' });
      onAccept(text);
    } else {
      toast.error(
        text.trim()
          ? 'Routine is invalid. Please check the format and ensure each exercise has at least one set.'
          : 'Routine cannot be empty.',
        { position: 'top-right' }
      );
    }
  };


  const handleCancel = () => {
    onCancel();
    setText(''); // Clear the text when canceled
  };

  return (
    <div className={styles.container}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={10}
        className={styles.textarea}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.buttonCancel} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.buttonAccept} onClick={handleAccept}>
          Accept
        </button>
      </div>
      {/* ToastContainer ensures toast notifications are rendered */}
      <ToastContainer />
    </div>
  );
};

export default RoutineEditor;
