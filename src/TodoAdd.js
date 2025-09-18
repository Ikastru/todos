import { useState } from 'react';
import { useSubmit } from 'react-router-dom';

export default function TodoAdd() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const submit = useSubmit();

    const handleImageChange = evt => {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () => setImage(fileReader.result);
            fileReader.readAsDataURL(cFiles[0]);
        } else setImage('');
    };

    const handleFormSubmit = evt => {
        evt.preventDefault();
        // используем FormData для action в router
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('image', image);
        submit(formData, { action: '/add', method: 'post' });
    };

    return (
        <section>
            <h1>Создание нового дела</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="field">
                    <label className="label">Заголовок</label>
                    <div className="control">
                        <input className="input" value={title} onChange={e => setTitle(e.target.value)} name="title" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Примечание</label>
                    <div className="control">
                        <textarea className="textarea" value={desc} onChange={e => setDesc(e.target.value)} name="desc" />
                    </div>
                </div>
                <div className="field">
                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" accept="image/*" onChange={handleImageChange} />
                            <span className="file-cta">
                                <span className="file-label">Графическая иллюстрация...</span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control"><input type="reset" className="button is-warning is-light" value="Сброс" onClick={() => {setTitle(''); setDesc(''); setImage('');}}/></div>
                    <div className="control"><input type="submit" className="button is-primary" value="Создать дело" /></div>
                </div>
            </form>
        </section>
    );
}
