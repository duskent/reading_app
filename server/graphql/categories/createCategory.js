import Category from '../../db/models/Category'
// Types
import CategoryType from '../types/CategoryType'
import CategoryInputType from '../types/CategoryInputType'

const createCategory = {
  createCategory: {
    type: CategoryType,
    description: 'Creates new category in the database',
    args: {
      category: {type: CategoryInputType, description: 'Input category'}
    },
    resolve: async (source, args) => {
      return await Category.create(args.category)
    }
  }
}

export default createCategory
