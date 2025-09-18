import { useLoaderData, useSubmit, Link } from 'react-router-dom';

export default function TodoList() {
    const list = useLoaderData();
    const submit = useSubmit();

    const handleDoneClick = key => submit(null, { action: `/${key}`, method: 'patch' });
    const handleDelClick = key => submit(null, { action: `/${key}`, method: 'delete' });

    return (
        <section>
            <h1>Дела</h1>
            <table className="table is-hoverable is-fullwidth">
                <tbody>
                    {list.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Link to={`/${item.id}`}>
                                    {item.done ? <del>{item.title}</del> : item.title}
                                </Link>
                            </td>
                            <td>
                                <button className="button is-success" title="Выполнено" disabled={item.done} onClick={() => handleDoneClick(item.id)}>
                                    &#9745;
                                </button>
                            </td>
                            <td>
                                <button className="button is-danger" title="Удалить" onClick={() => handleDelClick(item.id)}>
                                    &#9746;
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
