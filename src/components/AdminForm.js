import React,{ useState } from 'react';
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom';
import { timestamp,projectStorage,projectFirestore } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext';
import './AdminForm.css'


const AdminForm = () => {
    const navigate=useNavigate()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [desc, setDesc] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [formError,setFormError]=useState("");
    const [flavour,setFlavour]=useState("");
    const [category, setCategory] = useState('')
  
    const { addDocument, response } = useFirestore('products')
  
    const {user}=useAuthContext();

    const handleFileChange = (e) => {
      setThumbnail(null)
      let selected = e.target.files[0]
      console.log(selected)
                                         //selected obj contain all these type,size ....
       if(!selected){                   
         setThumbnailError("Please select a File")
         return
       }
       if(!selected.type.includes("image")){
         setThumbnailError("Selected file must be an image");
         return
       }
       if(selected>100000){
         setThumbnailError("File size must be less than 100kb");
         return
       }
  
       setThumbnailError(null);
       setThumbnail(selected);
       console.log("Thumbnail Updated")
    }
     
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
    
     /*   if (!tag) {
          setFormError('Please select a project category.')
          return
        }
        */
        //firebase
      // upload user thumbnail                                           //create path in a storage in firebase 
       const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`        //thumbnails/fsdgsdg45/faizan
       const img = await projectStorage.ref(uploadPath).put(thumbnail)
       const imgUrl = await img.ref.getDownloadURL();
       /* ========================================= */

        const item = {
            name:name,
            price: Number(price),
            details:desc,
            category,
            imgUrl,
            flavour,
            ratings:0,
          }
        
          await addDocument(item)
          console.log(response);
          if (!response.error) {
            setName('')
            setPrice(0)
            setDesc('')
            setThumbnail('');
            setFlavour('')
            setCategory("")
            navigate('/products')
          }
       
        
         
        }
  return <div>
     
      <form className='adminForm' onSubmit={handleSubmit}>
        <div className='form-title'>
      <div><h3>Add Item</h3></div>
      <div className='cancel'><span onClick={()=>{navigate('/products')}}>X</span></div>
      </div>
      
    <div className='myinput'>
                <input
                    required
                    placeholder='Name'
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                 <input
                    required
                    placeholder='Price'
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                 <input
                    required
                    placeholder='Category'
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                <input
                    required
                    placeholder='Flavour'
                    type="text"
                    onChange={(e) => setFlavour(e.target.value)}
                    value={flavour}
                />
                 <input
                    required
                    placeholder='Desciption'
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                />
               

      <input

        type="file"
        className='form-input'
        placeholder='upload-image'
        onChange={handleFileChange}
        required
      />
      </div>
      {thumbnailError && <div className="error">{thumbnailError}</div>}

      <div className='button'>
        <button>
          Add Item
        </button>
      </div>
      {formError && <p className="error">{formError}</p>}
  
    </form>
  </div>;
};

export default AdminForm;
