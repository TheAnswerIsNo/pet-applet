import { View, Button } from '@tarojs/components'
import { useState } from 'react'

interface Category {
  id: number
  name: string
}

interface CategoryListProps {
  categories: Category[]
  onCategoryChange: (categoryId: number) => void
}

export default function CategoryList({ categories, onCategoryChange }: CategoryListProps) {
  const [activeCategory, setActiveCategory] = useState<number>(categories[0]?.id || -1)

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId)
    onCategoryChange(categoryId)
  }

  return (
    <View className='category-list'>
      {categories.map(category => (
        <Button
          key={category.id}
          className={activeCategory === category.id ? 'active' : ''}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </View>
  )
}
