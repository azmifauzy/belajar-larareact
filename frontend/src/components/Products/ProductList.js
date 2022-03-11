import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import Swal from 'sweetalert2'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    // on mount function 
    useEffect(() => {
        getProdudcts()
    }, [])

    const getProdudcts = async () => {
        await fetch(`http://127.0.0.1:8000/api/products`)
        .then(response => response.json())
        .then(data => setProducts(data))
    }

    const deleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                async function isDelete() {
                    let res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                        method: "DELETE",
                    }).then(response => response.json())
                    if(res.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        res.message,
                        'success'
                        )
                    }
                }
                isDelete()
                getProdudcts()
            }
          })
    }

  return (
    <div>
        <Link to="/products/add" className="btn btn-primary">Add Product</Link>
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Added at</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length == 0 ? ( 
                            <tr>
                                <th colSpan={5}>No Data Found!</th>
                            </tr>
                         ) : ( 
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        {format(new Date(product.created_at), 'PPPP, p')}
                                    </td>
                                    <td>
                                        <Link to={`/products/${product.id}`} className="btn btn-primary mx-1">Edit</Link>
                                        <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                          )
                        
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductList