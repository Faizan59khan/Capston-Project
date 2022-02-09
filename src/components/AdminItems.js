import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirestore } from '../hooks/useFirestore'
import EditItem from './EditItem';
import './Admin.css'
import ProductsToolbar from '../component/ProductList/components/ProductsToolbar/ProductsToolbar'
const AdminItems = ({ documents, error }) => {

    const { deleteDocument } = useFirestore('products')
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false);
    const [docEdit, setDoc] = useState(null);
    console.log(documents);
    return (<>

        {!edit && <div> {error && <p className="error">{error}</p>}
            {documents && <>
                <ProductsToolbar />
                <div className='admin-options'>
                    {documents.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0)).map(document => (
                        <div className='item' key={document.id}>
                            <div className='item-img'>
                                <img src={document.imgUrl} />
                            </div>
                           
                            <div className='item-details'>
                                <h4>{document.flavour}</h4>
                                <div className="det-opt">
                                    <div>
                                <p>Price: <b>${document.price}</b></p>
                                <p>Category: {document.category}</p>
                                </div>
                                <div className='item-options'>
                                <button className='edit-item' onClick={() => { setEdit(true); setDoc(document) }}><i class="fas fa-lg fa-edit"></i></button>
                                <button className='delete-item' onClick={() => { deleteDocument(document.id) }}><i class="fas fa-lg fa-trash-alt"></i></button>
                            </div>
                                </div>
                            </div>
                            
                            

                        </div>
                    ))}
                </div></>}
        </div>}
        {edit && <EditItem Edit={setEdit} document={docEdit} />}
    </>)
};

export default AdminItems;
