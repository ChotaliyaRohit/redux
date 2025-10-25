'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Card, Spin } from 'antd'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="flex justify-center mt-10"><Spin size="large" /></div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="p-6 flex justify-center">
      <Card
        style={{ width: 400 }}
        cover={<img alt={product.title} src={product.image} style={{ height: '300px', objectFit: 'contain' }} />}
      >
        <Card.Meta
          title={product.title}
          description={
            <>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              <p>{product.description}</p>
            </>
          }
        />
      </Card>
    </div>
  )
}
