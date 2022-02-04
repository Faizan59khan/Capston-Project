import React,{ useState } from 'react';
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom';
import './AdminForm.css'
const EditDeal = ({Edit,document}) => {

    const navigate=useNavigate()
    const [name, setName] = useState(document.name)
    const [price, setPrice] = useState(document.price)
    const [desc, setDesc] = useState(document.desc)
    const [off, setOff] = useState(document.off)
    const [img, setImg] = useState('')
    const [formError, setFormError] = useState(null)
    const [imgError,setImgError]=useState(null)
    const { updateDocument, response } = useFirestore('deals')
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
            price:price,
            desc:desc,
            off: off,
            ratings:0,
          }
        
          await updateDocument(document.id,item)
          console.log(response);
          if (!response.error) {
            setName('')
            setPrice('')
             setDesc('')
           setOff('')
          setImg('')
          Edit(false)
          navigate('/AdminDeals')
          }
       
        
         
        }
  return <div>
     
<form className='adminForm' onSubmit={handleSubmit}>
<div className='cancel'><span onClick={()=>{Edit(false)}}>X</span></div>
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
              placeholder='Desciption'
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
          />
          <input
              required
              placeholder='Off'
              type="number"
              onChange={(e) => setOff(e.target.value)}
              value={off}
          />

<input
//  required
  type="file"
  onChange={handleFileChange}
/>
<div className='button'>
          <button>
              Edit Deal
          </button>
          </div>
          {formError && <p className="error">{formError}</p>}
  {imgError && <div className="error">{imgError}</div>}
      </form>
  </div>;
};

export default EditDeal;
