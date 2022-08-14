import { useHistory } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  let history = useHistory();
  return (
    <div className="categoryCardContainer" onClick={() => history.push(item.link)}>
        <img className="categoryImage" src={item.img} alt="" />
      <div className="categoryInfo">
        <div className="categoryTitle"><h1>{item.title}</h1></div>
        
        <div className="categoryButton">SHOP NOW</div>
        </div>
      </div>
  );
};

export default CategoryItem;