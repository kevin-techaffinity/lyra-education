import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { checkVoucher, getPricingTier, payHere } from '../services/Payment';
import { MdOutlineCheck } from 'react-icons/md';
import { getVouchers, updateVoucher } from '../public/data/voucher';
import { courseSubscription, updateSubscription } from '../public/data/courseSubscription';
import { getModule } from '../services/Content';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getPlan } from '../services/Plan';
import { createSubscription } from '../services/CourseSubscription';
import { applyVoucher } from '../services/Voucher';
import { useAuth } from '../hooks/useAuth';
import { getDomain } from '../utilities/getDomain';


const payingPlan = {
  Basic: {
    description: 'Select any 1 coaching programme and get lifetime access',
    deduct: '250',
    percentage: 20,
    id: 4,
    position: 1,
    features: [
      "Skilled life coaching experts",
      "A powerful journey to put you on the road to success",
      "Flexible learning at your own pace",
      "Step by step daily guidance from your coach",
      "Enhance your skill set and personal growth",
      "Invest in yourself & your future",
      "Practical tools to see tangible results",
      "Creative and well-developed contents",
      "Bite size fun learning & development"
    ],
    active: false,
  },
  Pro: {
    description: 'Select any 2 coaching programmes and get lifetime access',
    deduct: '500',
    percentage: 30,
    id: 5,
    position: 2,
    features: [
      "Skilled life coaching experts",
      "A powerful journey to put you on the road to success",
      "Flexible learning at your own pace",
      "Step by step daily guidance from your coach",
      "Enhance your skill set and personal growth",
      "Invest in yourself & your future",
      "Practical tools to see tangible results",
      "Creative and well-developed contents",
      "Bite size fun learning & development"
    ],
    active: false,
  },
  Premium: {
    description: 'Select any 3 coaching programmes and get lifetime access',
    deduct: '750',
    percentage: 40,
    id: 6,
    position: 3,
    features: [
      "Skilled life coaching experts",
      "A powerful journey to put you on the road to success",
      "Flexible learning at your own pace",
      "Step by step daily guidance from your coach",
      "Enhance your skill set and personal growth",
      "Invest in yourself & your future",
      "Practical tools to see tangible results",
      "Creative and well-developed contents",
      "Bite size fun learning & development"
    ],
    active: true,
  },
  Platinum: {
    description: 'Access unlimited coaching programmes for a year',
    deduct: '1900',
    percentage: 55,
    id: 8,
    position: 4,
    features: [
      "Skilled life coaching experts",
      "A powerful journey to put you on the road to success",
      "Flexible learning at your own pace",
      "Step by step daily guidance from your coach",
      "Enhance your skill set and personal growth",
      "Invest in yourself & your future",
      "Practical tools to see tangible results",
      "Creative and well-developed contents",
      "Bite size fun learning & development"
    ],
    active: false,
  },
};

const Billing = () => {
  useAuth();
  const router = useRouter();
  const {query: {course}} = router;
  const [module, setModule] = useState({});
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [htmlContent, setHTMLContent] = useState('');
  const [voucher, setVoucher] = useState('');
  const [availableVoucher, setAvailableVoucher] = useState('');
  const [plans, setPlans] = useState([]);
  const [content, setContent] = useState();

  useEffect(() => {
    getPricingTier(getDomain()).then((data) => {
      setContent(data);
    })
    getModule(course).then((data) => {
      setModule(data);
    });
    getPlan().then((data) => {
      setPlans(data)
    })
  }, [router.query]);

  const render = useMemo(() => {
    if (content?.length > 0) {
      return content
    } else {
      return plans
    }
  }, [content])

  const choosePlan = async (plan) => {
    const payload = {
      amount: (((availableVoucher?.plantype == plan?.name || availableVoucher?.plantype == 'all') && availableVoucher?.discount) ? (+plan?.price - ((+plan?.price * +availableVoucher?.discount) /100)) : plan?.price)?.toString(),
      item_name: module?.name?.trim().slice(0, -1)
    }

    if(parseInt(payload?.amount) < 6) {
      createSubscription({plan_id: plan?.id?.toString(), amount: payload?.amount, moduleId: module?.id}).then((data) => {
        router.push(module?.slug)
      })
    } else {
      const result = await payHere(payload);

      if (result.uuid) {
        window.payfast_do_onsite_payment({
          uuid: result.uuid,
          return_url: window.location.origin + `/successpay?amount=${payload?.amount}&item=${payload?.item_name}&plan=${plan?.id}&course=${course}`,
          cancel_url: window.location.origin + `/failedpay?amount=${payload?.amount}&item=${payload?.item_name}&plan=${plan?.id}&course=${course}`,
        });

        setAvailableVoucher('')
      }

      router.back();
    }
  };

  const handleVoucher = () => {
    setVoucher('')
    applyVoucher(voucher).then((data)  => {


      setAvailableVoucher(data);

      if(data?.discount == '100') {
        choosePlan({name: data?.plan, price: 0, id: payingPlan[data?.plan]?.id})
      }

      toast('Discount applied !!');
    }).catch((err) => {
      toast('Failed to apply discount !!');
    })
  }

  console.log('Render ', render)

  return (
    <>
      <div className="voucher-section">
        <div className="container">
          <div className="voucher-block text-center">
            <p>Join a Life Coach today & live the life you want!</p>
            <h1>Select your Magic Plan</h1>
            <form className="form-voucher" action="#" method="post">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Voucher code"
                  value={voucher}
                  name="voucher"
                  onChange={({target}) => setVoucher(target.value)}
                />
                <span className="input-group-btn">
                  <button className="btn btn-apply" onClick={handleVoucher} type="button">
                    Apply
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div className="plan-section">
        <div className="container">
          <div className="plan-block">

          {render
            ?.map((plan) => {
              const planDetails = payingPlan[plan?.name] || {};
              return { ...plan, planDetails }; // Merge planDetails into each plan object
            })
            .sort((a, b) => (a.planDetails.position || 0) - (b.planDetails.position || 0)) // Sort by position
            .map((plan) => {
              const planDetails = plan.planDetails;

            // Base calculation for the strike-through price
            const strikePrice = ((parseFloat(plan?.price) *100) /  ( 100 - (planDetails?.percentage || 1))).toFixed(0);

            // Discount calculation based on voucher
            const basePrice = parseFloat(plan?.price)
            const discount = (availableVoucher?.plantype == plan?.id || availableVoucher?.plantype == 'all') ? availableVoucher?.discount : 0;
            const exactDiscountedPrice = (basePrice - (basePrice * discount / 100)).toFixed(0);

            return (
              <div key={plan.id} className={`plan-data ${planDetails.active ? 'active' : ''}`}>
                <div className="plan-header">
                  <div className="plan-price">
                    <h3>
                      R {exactDiscountedPrice}
                      {planDetails?.percentage > 0 && (
                        <span>
                          <span className="strike-price">R {strikePrice}</span> Save {planDetails?.percentage}%
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <div className="plan-content">
                  <div className="plan-details">
                    <div className="plan-item">
                      <h4>{plan?.name}</h4>
                      <p>{planDetails?.description}</p>
                    </div>
                    <ul className="plan-list">
                      {plan?.feature?.length > 0 ? plan.feature.map((f, index) => (
                        <li key={index}>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.04297 18.4783C14.0135 18.4783 18.043 14.4488 18.043 9.47827C18.043 4.50771 14.0135 0.478271 9.04297 0.478271C4.07241 0.478271 0.0429688 4.50771 0.0429688 9.47827C0.0429688 14.4488 4.07241 18.4783 9.04297 18.4783ZM8.81119 13.1185L13.8112 7.11846L12.2747 5.83809L7.97577 10.9969L5.75008 8.77116L4.33586 10.1854L7.33586 13.1854L8.11017 13.9597L8.81119 13.1185Z" fill="#17A2B8"/>
                          </svg>
                          <p>{f}</p>
                        </li>
                      )) : planDetails?.features?.map((f, index) => (
                        <li key={index}>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.04297 18.4783C14.0135 18.4783 18.043 14.4488 18.043 9.47827C18.043 4.50771 14.0135 0.478271 9.04297 0.478271C4.07241 0.478271 0.0429688 4.50771 0.0429688 9.47827C0.0429688 14.4488 4.07241 18.4783 9.04297 18.4783ZM8.81119 13.1185L13.8112 7.11846L12.2747 5.83809L7.97577 10.9969L5.75008 8.77116L4.33586 10.1854L7.33586 13.1854L8.11017 13.9597L8.81119 13.1185Z" fill="#17A2B8"/>
                          </svg>
                          <p>{f}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="plan-btn">
                    <button type="button" className="btn choose-btn" onClick={() => choosePlan(plan)}>Choose plan</button>
                  </div>
                </div>
              </div>
            );
          })}

          </div>
        </div>
      </div>






    </>
  );
};

export default Billing;

const RenderHTML = ({ htmlContent }) => {
  const createMarkup = () => {
    return { __html: `${htmlContent}` };
  };

  return (
    <div>
      <div
        dangerouslySetInnerHTML={createMarkup()}
        style={{
          overflow: 'auto',
          width: '90%',
          height: 300,
        }}
      ></div>
    </div>
  );
};
