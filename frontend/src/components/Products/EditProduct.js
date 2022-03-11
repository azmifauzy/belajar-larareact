import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditProduct = () => {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        await fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            setTitle(data.title)
            setPrice(data.price)
        })
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
                async function isUpdated () {
                    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                        method: "PUT",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "title": title,
                            "price": price,
                        })
                    }).then(response => response.json())

                    if( res.status === 200 ) {
                        Swal.fire(
                            'Updated!',
                            res.message,
                            'success'
                        )
                        navigate("/products")
                    } else {
                        setErrors(res.validate_err)
                    }
                }
                isUpdated()
            }
          })
    }

  return (
    <div className="card">
        <div className='card-header'>
            <h5 className='card-title mt-2'>Edit Product</h5>
        </div>
        <div className='card-body'>
            <form onSubmit={updateProduct}>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>

                    {
                        errors.title ? ( 
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control is-invalid' id="title" name="title" placeholder='Enter a Title'></input>
                         ) : ( 
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' id="title" name="title" placeholder='Enter a Title'></input>
                          )
                    }
                    <small className="text-danger">{errors.title}</small>
                </div>
                <div className="mb-3">
                    <label for="price" className="form-label">Price</label>
                    {
                        errors.price ? ( 
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} name="price" className="form-control is-invalid" id="price" placeholder='Enter a Price'></input>
                         ) : ( 
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} name="price" className="form-control" id="price" placeholder='Enter a Price'></input>
                          )
                    }
                    <small className="text-danger">{errors.price}</small>
                </div>
                <button className="btn btn-primary">Save</button>
                <Link to="/products" className="text-primary d-block mt-3 text-decoration-none">&#x2190; Go Back</Link>
            </form>
        </div>
    </div>
  )
}

export default EditProduct