import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
    const [content, setContent] = useState('');

    return(
        <div style={{ padding: '20px', color: '#000000',backgroundColor: '#ffffff', minHeight: '100vh' }}>
            <h2 style={{ color: '#000000'}}>Mi editor de documentos</h2>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                style={{ height: '400px', marginBottom: '50px', backgroundColor: '#ffffff'  }}
            />
            <div style={{ marginTop: '60px', color: '#000000'}}>
                <h3 style={{ color: '#000000'}}>Vista previa</h3>
                <div dangerouslySetInnerHTML={{__html: content}} />
            </div>
        </div>
    );
}

export default Editor;