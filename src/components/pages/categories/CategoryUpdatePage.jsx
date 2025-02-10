import { useParams } from "react-router-dom";
import CategoryUpdate from "../../modules/categories/CategoryUpdate";

const CategoryUpdatePage = () => {
  const { id } = useParams();

  return (
    <div>
      <CategoryUpdate id={id} />
    </div>
  );
};

export default CategoryUpdatePage;
