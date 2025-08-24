import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useStore from '@store/store';
import Document from '@components/Document/Document';
import DocumentMenu from '@components/Menu/DocumentMenu';
import AIMenu from '@components/Menu/AIMenu/AIMenu';
import { DocumentPlate } from '@components/Document/DocumentPlate';

import useInitialiseNewDocument from '@hooks/useInitialiseNewDocument';
import { DocumentInterface } from '@type/document';
import { Theme } from '@type/theme';
import ApiPopup from '@components/FooterMenu/Api/ApiPopup';
import Toast from '@components/Toast';
import { HealthStatus } from '@components/Health';
import FAQs from '@components/FAQs/FAQs';

/**
 * Root React component that initializes app state, performs legacy localStorage migration, and renders the main routes.
 *
 * Performs two startup effects: (1) clears the `edited` flag on any existing chats in the global store, and (2) migrates legacy keys from localStorage (old `chats`, `apiKey`, and `theme`) into the current store or falls back to creating a new document. Also ensures the current chat index is valid after initialization.
 *
 * Renders the home UI (DocumentMenu, Document wrapped in DocumentPlate with AIMenu, ApiPopup, Toast) at the "/" route and the FAQs page at "/faqs". In development mode, shows a floating HealthStatus panel.
 */
function App() {
  const initialiseNewDocument = useInitialiseNewDocument();
  const setChats = useStore(state => state.setChats);
  const setTheme = useStore(state => state.setTheme);
  const setApiKey = useStore(state => state.setApiKey);
  const setCurrentChatIndex = useStore(state => state.setCurrentChatIndex);

  // a useEffect that resets the .edited variables of all items in chats to false

  useEffect(() => {
    const chats = useStore.getState().chats;

    if (chats && chats.length > 0) {
      const newChats = chats.map(chat => {
        chat.edited = false;
        return chat;
      });
      useStore.getState().setChats(newChats);
    }
  }, []);

  useEffect(() => {
    // legacy local storage
    const oldChats = localStorage.getItem('chats');
    const apiKey = localStorage.getItem('apiKey');
    const theme = localStorage.getItem('theme');

    if (apiKey) {
      // legacy local storage
      setApiKey(apiKey);
      localStorage.removeItem('apiKey');
    }

    if (theme) {
      // legacy local storage
      setTheme(theme as Theme);
      localStorage.removeItem('theme');
    }

    if (oldChats) {
      // legacy local storage
      try {
        const chats: DocumentInterface[] = JSON.parse(oldChats);
        if (chats.length > 0) {
          setChats(chats);
          setCurrentChatIndex(0);
        } else {
          initialiseNewDocument();
        }
      } catch (e: unknown) {
        console.error(e);
        initialiseNewDocument();
      }
      localStorage.removeItem('chats');
    } else {
      // existing local storage
      const chats = useStore.getState().chats;
      const currentChatIndex = useStore.getState().currentChatIndex;
      if (!chats || chats.length === 0) {
        initialiseNewDocument();
      }
      if (chats && !(currentChatIndex >= 0 && currentChatIndex < chats.length)) {
        setCurrentChatIndex(0);
      }
    }
  }, [initialiseNewDocument, setApiKey, setChats, setCurrentChatIndex, setTheme]);

  function Home() {
    return (
      <>
        <DocumentMenu />
        <DocumentPlate>
          <Document />
          <AIMenu />
        </DocumentPlate>
        <ApiPopup />
        <Toast />
        {/* Health Status - Development only */}
        {import.meta.env.MODE === 'development' && (
          <div className="fixed bottom-4 right-4 z-50 max-w-sm">
            <HealthStatus showDetails={true} autoRefresh={true} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-full h-full relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
