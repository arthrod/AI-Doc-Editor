import { useEffect } from 'react';
import useStore from '@store/store';

const EditorSelection = ({ editorRef }: { editorRef: React.RefObject<HTMLElement> }) => {
  const setCurrentSelection = useStore(state => state.setCurrentSelection);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection) {
        setCurrentSelection('');
        return;
      }
      const anchorNode = selection.anchorNode;
      if (editorRef.current && anchorNode && editorRef.current.contains(anchorNode)) {
        setCurrentSelection(selection.toString());
      } else {
        setCurrentSelection('');
      }
    };
    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [editorRef, setCurrentSelection]);

  return null;
};

export default EditorSelection;
