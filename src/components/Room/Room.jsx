// import React from 'react'
import { Link } from "react-router-dom"
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs"
import PropTypes from 'prop-types';


const Room = ({room}) => {
    // const { id, capacity, image, name, price, amenities, size, description } = room;
    const { id, maxPerson, image, name, price, size, description } = room;

  return (
    <div className="bg-white shadow-2xl min-h-[500px] group">
        {/* img  */}
        <div className="overflow-hidden">
            <img className="group-hover:scale-110 transition-all duration-300 w-full" 
                src={image} alt="" />
        </div>

        {/* details  */}
        <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px]
        -translate-y-1/2 flex justify-center items-center uppercase font-tertiary
        tracking-[1px] font-semibold text-base">
            <div className="flex justify-between w-[80%]">
                {/* size */}
                <div className="flex items-center gap-x-2">
                    <div className="text-accent">
                        <BsArrowsFullscreen className="text-[15px]"/>
                    </div>
                    <div className="flex gap-x-1">
                        <div>size</div>
                        <div>{size}m2</div>
                    </div>
                </div>
                
                {/* capacity */}
                <div className="flex items-center gap-x-2">
                    <div className="text-accent">
                        <BsPeople className="text-[18px]"/>
                    </div>
                    <div className="flex gap-x-1">
                        <div>max people</div>
                        <div>{maxPerson}</div>
                    </div>
                </div>

            </div>
        </div>

        {/* name & description */}
        <div className="text-center">
            {/* <Link to={`/room/${id}`}> */}
                <h3 className="h3">{name}</h3>
            {/* </Link> */}
            <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
                {description.slice(0, 126)}
            </p>
        </div>

        {/* btn  */}
        <Link to={`/rooms/${id}`}
            className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
        > 
            Book now from {price}$
        </Link>


    </div>
  )
}

Room.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        maxPerson: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default Room