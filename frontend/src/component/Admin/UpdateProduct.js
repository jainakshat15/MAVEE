import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button, CircularProgress } from '@mui/material'
import MetaData from '../layout/MetaData'
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
  Star,
} from '@mui/icons-material'
import SideBar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, product } = useSelector((state) => state.productDetails)

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product,
  )

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [subCategory,setSubCategory] = useState("");
  const [subCategories,setSubCategories] = useState([]);
  const [featured,setFeatured] = useState(false);
  const [sizeChart, setSizeChart] = useState([]);



  const categories = [
    {id: 1,name: 'women',subCategories: ['traditional wear',
      'kurta',
      'kurta sets',
      'lehenga sets',
      'western wear', 
      'top', 
      'bottom wear',
      'shirts', 
      'co ords']},
    {id: 2,name: 'men',subCategories: ['traditional wear',
    'kurta',
    'western wear', 
    'shirts', 
    'co ords',
    'bottom wear',]},
    {id: 3,name: 'bags',subCategories: []},
    {id: 4,name: 'kids',subCategories: []},
  ];

  const productId = match.params.id

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId))
    } else {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setSubCategory(product?.subCategory ? product.subCategory: '')
      setStock(product.stock)
      setOldImages(product.images)
      setFeatured(product?.featured)

      if(product?.sizeChart?.url){
        setSizeChart([product?.sizeChart?.url])
      }else{
        setSizeChart([]);
      }
       
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully')
      history.push('/admin/products')
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ])

  useEffect(() => {
    if(category){
      const filtered = categories.filter((c) => c.name === category);
      setSubCategories(filtered[0]?.subCategories);
    }else{
      setSubCategories([]);
    }
  },[category])

  const updateProductSubmitHandler = (e) => {
    e.preventDefault()

    // const myForm = new FormData()

    // myForm.set('name', name)
    // myForm.set('price', price)
    // myForm.set('description', description)
    // myForm.set('category', category)
    // myForm.set('stock', stock)

    // images.forEach((image) => {
    //   myForm.append('images', image)
    // })
    const obj = {
      name: name,
      price: price,
      description: description,
      category: category,
      subCategory: subCategory,
      stock: stock,
      images: images,
      featured: featured,
      sizeChart: sizeChart
    }

    
    dispatch(updateProduct(productId, obj))
  }

  const createSizeChartImagesChange = (e) => {
    const fileImg = e.target.files[0];

    setSizeChart([]);
   

    const reader = new FileReader();

    reader.onload = () => {
        if (reader.readyState === 2) {
            
          setSizeChart((old) => [...old, reader.result]);
        }

    };
    reader.readAsDataURL(fileImg);

}

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <Description />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

              <div>
              <AccountTree />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate.id} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>



            {subCategories?.length ?  <div>
              <AccountTree />
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose Sub Category</option>
                
                  {subCategories.map((s) => (
                    <option key={s} value={s}>
                    {s}
                  </option>
                    ))}
                  
                  
              </select>
            </div>: <></>
            }
            

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div>
              <Star />
              <select value={featured} onChange={(e) => setFeatured(e.target.value)}>
                <option value={true}>Featured - true</option>
                <option value={false}>Featured - false</option>
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createSizeChartImagesChange}
              />
            </div>
            <div id="createProductFormImage">
              
                 {sizeChart.length ? <img src={sizeChart} alt="Old Product Preview" /> : <></>}
                
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
             {loading? <CircularProgress /> : 'Update'}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
