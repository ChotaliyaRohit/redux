'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, Product } from '../features/productSlice'
import { RootState, AppDispatch } from '../lib/store'
import { Card, Row, Col, Spin } from 'antd'
import Link from 'next/link'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (loading) return <div className="flex justify-center mt-10"><Spin size="large" /></div>

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        {products.map((product: Product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Link href={`/products/${product.id}`}>
              <Card
                hoverable
                cover={<img alt={product.title} src={product.image} style={{ height: '200px', objectFit: 'contain' }} />}
              >
                <Card.Meta title={product.title} description={`$${product.price}`} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}
