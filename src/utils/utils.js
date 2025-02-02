import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

export const htmlToState = (html) => {
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return { contentState, editorState };
  }
};

export const stateToHTML = (editorState) => {
  const json = convertToRaw(editorState.getCurrentContent());

  return draftToHtml(json, {}, false, ({ type, data }) => {
    if (type === 'IMAGE') {
      const alignment = data.alignment ? data.alignment : 'center';
      return `
        <p style="justify-content:${alignment}; display:flex">
          <img src="${data.src}" alt="${data.alt}" style="height: ${data.height};width: ${data.width}"/>
        </p>
      `;
    }
  });
};
