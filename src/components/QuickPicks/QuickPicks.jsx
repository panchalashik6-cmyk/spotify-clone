import React from "react";
import "./QuickPicks.css";
import { useNavigate } from "react-router-dom";
import quickPicks from "../../data/quickPicks";

const QuickPicks = () => {

  const navigate = useNavigate();

  return (

    <div className="quick-picks">

      {quickPicks.map((item) => (

        <div
          key={item.id}
          className="quick-card"
          onClick={() => navigate(item.route)}
        >

          <img
            src={item.image}
            alt={item.title}
          />

          <div className="quick-info">

            <h4>{item.title}</h4>

            <p>
              Your favourite playlist
            </p>

          </div>

        </div>

      ))}

    </div>

  );

};

export default QuickPicks;