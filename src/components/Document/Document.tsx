import { useRef } from 'react';

import useStore from '@store/store';
import { PlateEditor } from '@src/components/editor/plate-editor';

import MobileBar from '../MobileBar';
import EditorSelection from './EditorSelection';

const Document = () => {
  const hideSideMenu = useStore(state => state.hideSideMenu);
  const hideSideAIMenu = useStore(state => state.hideSideAIMenu);
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <EditorSelection editorRef={editorRef} />
      <div
        className={`flex flex-col h-full flex-1 ${hideSideMenu ? 'md:pl-0' : 'md:pl-[260px]'} ${
          hideSideAIMenu ? 'md:pr-0' : 'md:pr-[365px]'
        } transition-all ease-in-out`}
      >
        <MobileBar />
        <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <div className="flex w-full">
            <div className="flex-grow w-full">
              <div className="relative h-full flex flex-grow flex-col gap-2 md:gap-3">
                <PlateEditor editorRef={editorRef} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Document;
