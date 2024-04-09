import PaymentDetailsCard from "./ui/PaymentDetailsCard";
import Message from "./ui/Message";
import reserveAPI from "../api/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Query } from "../services/external-api.service";
import { useQueryClient } from "@tanstack/react-query";
import { IoCloseSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

function Modal({ showModal, handleClose, data }) {
  const [error, setError] = useState(null);
  const [partners, setPartners] = useState([]);
  const [isCardShown, setIsCardShown] = useState({ Azampesa: false });
  const [totalCountDown, setTotalCountDown] = useState(900);
  const [countDownMins, setCountDownMins] = useState(0);
  const [countDownSecs, setCountDownSecs] = useState(0);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  // const navigate = useNavigate();

  useEffect(() => {
    // Update countDownMins and countDownSecs whenever totalCountDown changes
    let mins = Math.floor(totalCountDown / 60);
    let secs = totalCountDown % 60;
    setCountDownMins(mins);
    setCountDownSecs(secs);

    // Start the timer when the component mounts
    if (totalCountDown > 0) {
      let countdownInterval = setInterval(() => {
        setTotalCountDown((prevCount) => prevCount - 1);
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => clearInterval(countdownInterval);
    }
  }, [totalCountDown]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await queryClient.ensureQueryData(
          Query({
            method: "GET",
            route: "/partners",
          })
        );

        if (res && res.partners) {
          setPartners(res.partners);
        }
      } catch (error) {
        console.error("API request failed:", error);
      }
    };

    fetchPartners();
    const modal = document.querySelector("dialog");
    showModal ? modal.showModal() : modal.close();
  }, [queryClient, showModal, totalCountDown]);

  const handleClick = (partner) => {
    setIsCardShown((prev) => {
      const newState = {};
      Object.entries(prev).map(([pName, pState]) => {
        if (partner.partnerName == pName) {
          newState[pName] = !pState;
        } else {
          newState[partner.partnerName] = true;
        }
      });
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      const userPaymentData = {
        ...data,
        ...formValues,
        provider: Object.keys(isCardShown)[0],
      };

      console.log(userPaymentData);
      const res = await reserveAPI({
        method: "POST",
        route: "/reservation",
        data: userPaymentData,
      });

      if (res && res.success) {
        toast.success("Payment confirmed");
        // navigate("/bookings");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className="flex flex-col items-center p-4 rounded-md space-y-4 outline-none">
      <div className="flex self-stretch gap-20 justify-end items-center">
        <h2 className="text-3xl">Complete Your Payment</h2>
        <IoCloseSharp className="text-2xl" onClick={handleClose} />
      </div>

      <h4>Waiting for payment</h4>
      <div className="border-4 py-4 px-8 text-2xl font-semibold tracking-widest">
        {countDownMins < 10 ? `0${countDownMins}` : countDownMins}:
        {countDownSecs < 10 ? `0${countDownSecs}` : countDownSecs}
      </div>
      <h4>Time Remaining</h4>

      <h2 className="border-b-2 self-stretch">Pay with</h2>
      <h4 className="self-start">&#x2022; Mobile Money</h4>
      <form className="space-y-1" onSubmit={handleSubmit}>
        <div className="flex gap-1">
          {partners.map((partner) => (
            <div
              key={partner.provider}
              onClick={() => handleClick(partner)}
              className="rounded p-2 shadow-sm border w-32"
            >
              <img src={partner.logoUrl} alt={partner.partnerName} />
            </div>
          ))}
        </div>
        {Object.values(isCardShown)[0] && (
          <PaymentDetailsCard
            pName={Object.keys(isCardShown)[0]}
            isLoading={loading}
          />
        )}
      </form>
      <Message message={error} />
    </dialog>
  );
}

export default Modal;
