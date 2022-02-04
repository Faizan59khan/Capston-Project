import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirestore } from '../hooks/useFirestore'
import EditItem from './EditItem';
import './Admin.css'
import ProductsToolbar from '../component/ProductList/components/ProductsToolbar/ProductsToolbar'
const AdminItems = ({documents,error}) => {

    const { deleteDocument } = useFirestore('products')
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false);
    const [docEdit,setDoc]=useState(null);
    console.log(documents);
    return (<>
    
       {!edit && <div> {error && <p className="error">{error}</p>}
            {documents &&<>
            <ProductsToolbar/>
                <div className='admin-options'>
                    {documents.map(document => (

                        <div className='item' key={document.id}>
                            <div className='item-img'>
                                <img src={document.imgUrl} />
                            </div>

                            <div className='item-details'>
                                <h4>{document.name}</h4>
                                <p>Price: <b>${document.price}</b></p>
                                <p>Flavour: {document.flavour}</p>
                                <p>Category: {document.category}</p>
                                <p className='desc'>Desc:{document.desc}</p>
                                
                            </div>

                            <div className='item-options'>
                                <button className='edit-item' onClick={() => { setEdit(true);setDoc(document) }}>Edit</button>
                                <button className='delete-item' onClick={() => { deleteDocument(document.id) }}>Delete</button>
                            </div>
                          
                        </div>
                    ))}
                </div></>}
        </div>}
        {edit && <EditItem Edit={setEdit} document={docEdit}/>}
    </>)
};

export default AdminItems;
