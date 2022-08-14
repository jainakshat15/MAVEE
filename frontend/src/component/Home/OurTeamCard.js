

const OurTeamCard = ({ item }) => {
  return (
    <div className="ourTeamCardContainer">
        <img className="OurTeamImage" src={item.img} alt="" />
      
        <div className="OurTeamTitle"><span>{item.title}</span></div>
        
      </div>
  );
};

export default OurTeamCard;