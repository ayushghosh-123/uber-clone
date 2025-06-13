import React, { forwardRef } from "react";
import CarImg from "../images/car.png";
import BikeImg from "../images/UberBike.png";
import AutoImg from "../images/uberauto.png";

const Vehiclepannel = forwardRef(
  ({ setVehiclePanel, setConfirmRidePanel, setSelectedVehicle ,  fare , selectedVehicle}, ref) => {
    return (
      <div
        ref={ref}
        className="fixed w-full z-10 bottom-0 px-3 py-10 pt-14 bg-white rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Close Button */}
        <button
          onClick={() => setVehiclePanel(false)}
          className="absolute top-3 left-6 text-3xl text-gray-400 hover:text-black transition"
        >
          <i className="ri-arrow-down-wide-line"></i>
        </button>

        <h3 className="text-lg font-semibold mb-5">Choose a Vehicle</h3>

        <div className="space-y-4">
          {/* UberGo */}
          <div
            onClick={() => {
              setSelectedVehicle({
                name: "UberGo",
                seats: 4,
                waitTime: "2 mins",
                price: 45,
                img: CarImg,
              });
              setConfirmRidePanel(true);
              selectedVehicle('car')
              setVehiclePanel(false);
            }}
            className="flex border-2 border-gray-200 active:border-black rounded-xl w-full justify-between items-center p-4 cursor-pointer transition"
          >
            <img src={CarImg} className="h-20 object-contain" alt="Car" />
            <div className="w-1/2 px-3">
              <h4 className="font-medium text-base flex items-center gap-2">
                UberGo <span className="text-sm"><i className="ri-user-line"></i> 4</span>
              </h4>
              <h5 className="text-sm text-gray-600">2 mins away</h5>
              <p className="text-xs text-gray-500">Affordable, compact price</p>
            </div>
            <h2 className="text-xl font-semibold text-green-700">{fare.car}</h2>
          </div>

          {/* Moto */}
          <div
            onClick={() => {
              setSelectedVehicle({
                name: "Moto",
                seats: 1,
                waitTime: "3 mins",
                price: 20,
                img: BikeImg,
              });
              setConfirmRidePanel(true);
              selectedVehicle('moto')
              setVehiclePanel(false);
            }}
            className="flex border-2 border-gray-200 active:border-black rounded-xl w-full justify-between items-center p-4 cursor-pointer transition"
          >
            <img src={BikeImg} className="h-20 object-contain" alt="Bike" />
            <div className="w-1/2 px-3">
              <h4 className="font-medium text-base flex items-center gap-2">
                Moto <span className="text-sm"><i className="ri-user-line"></i> 1</span>
              </h4>
              <h5 className="text-sm text-gray-600">3 mins away</h5>
              <p className="text-xs text-gray-500">Affordable, Motorcycle ride</p>
            </div>
            <h2 className="text-xl font-semibold text-green-700">{fare.moto}</h2>
          </div>

          {/* UberAuto */}
          <div
            onClick={() => {
              setSelectedVehicle({
                name: "UberAuto",
                seats: 3,
                waitTime: "3 mins",
                price: 120,
                img: AutoImg,
              });
              setConfirmRidePanel(true);
              selectedVehicle('auto')
              setVehiclePanel(false);
            }}
            className="flex border-2 border-gray-200 active:border-black rounded-xl w-full justify-between items-center p-4 cursor-pointer transition"
          >
            <img src={AutoImg} className="h-20 object-contain" alt="Auto" />
            <div className="w-1/2 px-3">
              <h4 className="font-medium text-base flex items-center gap-2">
                UberAuto <span className="text-sm"><i className="ri-user-line"></i> 3</span>
              </h4>
              <h5 className="text-sm text-gray-600">3 mins away</h5>
              <p className="text-xs text-gray-500">Affordable, Auto ride</p>
            </div>
            <h2 className="text-xl font-semibold text-green-700">{fare.auto}</h2>
          </div>
        </div>
      </div>
    );
  }
);

export default Vehiclepannel;


