
import React,{ useState } from 'react';
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom';
import './AdminForm.css'
const EditItem = ({Edit,document}) => {
 
    const navigate=useNavigate()
    const [name, setName] = useState(document.name)
    const [price, setPrice] = useState(document.price)
    const [desc, setDesc] = useState(document.details)
    const [img, setImg] = useState('')
    const [flavour,setFlavour]=useState(document.flavour);
    const [category, setCategory] = useState(document.category)
    const [formError, setFormError] = useState(null)
    const [imgError,setImgError]=useState(null)
    const { updateDocument, response } = useFirestore('products')
    const handleFileChange = (e) => {
        setImg(null)
        let selected = e.target.files[0]
        console.log(selected)
    
        if (!selected) {
          setImgError('Please select a file')
          return
        }
        if (!selected.type.includes('image')) {
          setImgError('Selected file must be an image')
          return
        }
        if (selected.size > 1000000) {
          setImgError('Image file size must be less than 1MB')
          return
        }
        
        setImgError(null)
        setImg(selected)
        console.log('thumbnail updated')
      }
     
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
    
     /*   if (!tag) {
          setFormError('Please select a project category.')
          return
        }
        */
        const item = {
            name:name,
            price:Number(price),
            details:desc,
            category,
           flavour,
            ratings:0,
          }
      console.log(item)
          await updateDocument(document.id,item)
          console.log(response);

          if (!response.error) {
            console.log("hijhjkhhjoh")
           setName('')
           setPrice('')
            setDesc('')
        
          setFlavour('')
          setCategory("")
         setImg('')
         Edit(false)
         navigate('/products')
          }
       
        
         
        }
  return <div>
<form className='adminForm' onSubmit={handleSubmit}>
<div className='form-title'>
      <div><h3>Edit Item</h3></div>
<div className='cancel'><span onClick={()=>{Edit(false)}}>X</span></div>
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
  </div>

<div className='button'>
   <button>
   Edit Menu
   </button>
   </div>
   {formError && <p className="error">{formError}</p>}
{imgError && <div className="error">{imgError}</div>}
</form></div>;
};

export default EditItem;
