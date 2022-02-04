import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFirestore'
import EditDeal from './EditDeal';
import './Admin.css'
const AdminDeals = () => {
    const { documents, error } = useCollection('deals')
    const {deleteDocument}=useFirestore('deals')
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false);
    const [docEdit,setDoc]=useState(null);
    return (<>
    {!edit && <div>
        {error && <p className="error">{error}</p>}
        {documents &&
            <div className='admin-options'>
                <button className='admin-menu' onClick={() => { navigate('/AdminItems') }}>Menu</button>
                <button className='admin-deals' disabled>Deals</button>
                <br/>
                <button className='admin-add-item' onClick={() => { navigate('/AdminForm2') }}>Add Deals</button>
                {documents.map(document => (

                    <div className='item' key={document.id}>
                        <div className='item-img'>
                            <img src="./img1.jpg" />
                        </div>

                        <div className='item-details'>
                        <h4>{document.name}</h4>
                                <p className='desc'>Desc:{document.desc}</p>
                                <p>Price: <b>${document.price}</b></p>
                                <p><b>{document.off}% Off</b></p>
                        </div>

                        <div className='item-options'>
                            <button className='edit-item' onClick={()=>{setEdit(true);setDoc(document)}}>Edit</button>
                            <button className='delete-item' onClick={()=>{deleteDocument(document.id)}}>Delete</button>
                        </div>
                      
                    </div>
               
                ))}

            </div>}
            </div>}
            {edit && <EditDeal Edit={setEdit} document={docEdit}/>}</>)
};

export default AdminDeals;
