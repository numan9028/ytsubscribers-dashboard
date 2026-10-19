import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
//
import Loader from 'src/components/Loader';

function RichTextEditor(props) {
  const [rteLoading, setRteLoading] = useState(false);

  // For RTE
  useEffect(() => {
    setRteLoading(true);
    setTimeout(() => {
      setRteLoading(false);
    }, 1000);
  }, []);

  // RTE Image upload Function
  function example_image_upload_handler(blobInfo, success, failure, progress) {
    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', `${process.env.REACT_APP_API_URL}/uploads`);

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };
    console.log('xhr rte', xhr);

    xhr.onload = function () {
      var json;

      if (xhr.status === 403) {
        failure('HTTP Error: ' + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);
      if (!json || typeof json.path != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }

      success(`${process.env.REACT_APP_NODE_ROOT}/uploads/${json.path}`);
    };

    xhr.onerror = function () {
      failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };

    formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  }
  return (
    <div>
      {rteLoading ? (
        <Loader />
      ) : (
        <Editor
          name={props.name}
          value={props.value ? props.value : null}
          apiKey={process.env.REACT_APP_RTE_KEY}
          init={{
            selector: 'textarea#open-source-plugins',
            images_upload_handler: example_image_upload_handler,
            height: 300,
            width: '94%',
            menubar: true,
            forced_root_block: '',
            branding: false,
            plugins:
              'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            toolbar:
              'undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            link_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_list: [
              { title: 'My page 1', value: 'https://www.tiny.cloud' },
              { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_class_list: [
              { title: 'None', value: '' },
              { title: 'Some class', value: 'class-name' }
            ],
            importcss_append: true,
            file_picker_callback: function (callback, value, meta) {
              /* Provide file and text for the link dialog */
              if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', {
                  text: 'My text'
                });
              }

              /* Provide image and alt text for the image dialog */
              if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', {
                  alt: 'My alt text'
                });
              }

              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === 'media') {
                callback('movie.mp4', {
                  source2: 'alt.ogg',
                  poster: 'https://www.google.com/logos/google.jpg'
                });
              }
            },
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            image_caption: true,
            quickbars_selection_toolbar:
              'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image imagetools table'
          }}
          onEditorChange={(content) => props.setFieldValue(props.name, content)}
        />
      )}
    </div>
  );
}

export default RichTextEditor;
