import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { checkVoucher, payHere } from '../services/Payment';
import { MdOutlineCheck } from 'react-icons/md';
import { getVouchers, updateVoucher } from '../public/data/voucher';
import { courseSubscription, updateSubscription } from '../public/data/courseSubscription';
import { getModule } from '../services/Content';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getPlan } from '../services/Plan';

const payingPlan = {
  ['Basic']: {
    description: 'Select any 1 coaching programme and get lifetime access',
    deduct: '250',
    percentage: 20
  },
  ['Pro']: {
    description: 'Select any 2 coaching programmes and get lifetime access',
    deduct: '500',
    percentage: 30
  },
  ['Premium']: {
    description: 'Select any 3 coaching programmes abd get lifetime access',
    deduct: '750',
    percentage: 40
  },
  ['Platinum']: {
    description: 'Access unlimited coaching programmes for a year',
    deduct: '1900',
    percentage: 55
  },
}

const Billing = () => {
  const router = useRouter();
  const {query: {course}} = router;
  const [module, setModule] = useState({});
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [htmlContent, setHTMLContent] = useState('');
  const [voucher, setVoucher] = useState('');
  const [availableVoucher, setAvailableVoucher] = useState('');
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getModule(course).then((data) => {
      setModule(data);
    });
    getPlan().then((data) => {
      setPlans(data)
    })
  }, [router.query]);

  const choosePlan = async (plan) => {
    const payload = {
      amount: (availableVoucher?.discount ? (+plan?.price - ((+plan?.price * +availableVoucher?.discount) /100)) : plan?.price)?.toString(),
      item_name: module?.name?.trim().slice(0, -1)
    }

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
  };

  const handleVoucher = async () => {
    setVoucher('')
    const result = getVouchers.filter(item => item.usedBy == '' && item.code == voucher);

    if(result.length > 0) {
      toast('Discount applied !!');
      updateVoucher(result[0].id, 'admin')
      setAvailableVoucher(result[0]);
    }
  }

  return (
    <>
      <div className="container mt-md-5">
        <div className="row">
          <div className='col-md-5'>
            <h6 className='mb-3'>
              <small style={{color: '#17A2B8'}}>Join a Life Coach today & live the life you want!</small>
            </h6>
            <h3>Select your Magic Plan</h3>
            <div className="p-4 bg-light my-2">
              <h6 className="my-2 font-weight-bold">What You get With Our Plan</h6>
              <div className="my-4 d-flex flex-column">
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Skilled life coaching experts</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>A powerful journey to put you on the road to success</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Flexible learning at your own pace</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Step by step daily guidance from your coach</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Enhance your skill set and personal growth</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Invest in yourself & your future</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Practical tools to see tangible results</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Creative and well-developed contents</small>
                </span>
                <span className="my-2">
                  {/* <MdOutlineCheck color="#82C760" /> &nbsp; */}
                  <small>Bite size fun learning & development</small>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-7 px-5">
            <div className="my-5">
              <div className="px-4 w-100 pt-4 pb-2 bg-light my-2 shadow-sm">
                <span className='text-info'>HAVE A VOUCHER TO  SUBMIT</span>
                <form className='form-inline w-100 mt-4'>
                  <div className="form-group w-75 mb-2 mr-2">
                    <label htmlFor="inputPassword2" className="sr-only">Password</label>
                    <input type="text" className="form-control w-100 rounded-0" placeholder="Voucher code" value={voucher} name="voucher" onChange={({target}) => setVoucher(target.value)} />
                  </div>
                  <button type="button" onClick={handleVoucher} className="btn btn-info rounded-0 mb-2">APPLY</button>
                </form>

              </div>
              {/* <form action="https://www.payfast.co.za/eng/process" method="post">
                <input type="hidden" name="merchant_id" value="17844670" />
                <input type="hidden" name="merchant_key" value="o2djg0y03gnll" />
                <input type="hidden" name="passphrase" value="Life-Space/Coaching1" />
                <input type="hidden" name="amount" value="5" />
                <input
                  type="hidden"
                  name="return_url"
                  value="https://lyra-education-production.vercel.app/successpay"
                />
                <input
                  type="hidden"
                  name="cancel_url"
                  value="https://lyra-education-production.vercel.app/failedpay"
                />
                <input
                  type="hidden"
                  name="notify_url"
                  value="https://189c-196-12-131-142.ngrok-free.app/v1/test-payment-notify-url"
                />
                <input type="hidden" name="item_name" value="Test Product" />
                <input type="hidden" name="subscription_type" value="1" />
                <input type="hidden" name="billing_date" value="2020-01-01" />
                <input type="hidden" name="recurring_amount" value="5" />
                <input type="hidden" name="frequency" value="3" />
                <input type="hidden" name="cycles" value="12" />
                <input type="hidden" name="subscription_notify_email" value="true" />
                <input type="hidden" name="subscription_notify_webhook" value="true" />
                <input type="hidden" name="subscription_notify_buyer" value="true" />
                <div className="my-3">
                  <div className="d-flex align-items-center justify-content-between shadow p-3">
                    <div>
                      <span className="p-0 m-0">
                        <small className="text-muted">Duration</small>
                      </span>
                      <h6 className="p-0 my-2">
                        <small>
                          1 Month -{' '}
                          <span>
                            <small className="font-weight-bold">ZAR 5</small>
                          </span>
                        </small>
                      </h6>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-secondary rounded-pill"
                      >
                        <small>Get Started</small>
                      </button>
                    </div>
                  </div>
                </div>
              </form> */}
              {plans?.map((plan, key) => (
                <div key={key} className="my-3" onClick={() => choosePlan(plan)} style={{cursor: 'pointer'}}>
                  <div className="row border rounded p-3">
                    <div className='col-md-9'>
                      <h5 className="p-0 m-0 mb-2">
                        <small className="font-weight-bold">{plan?.name}</small>
                      </h5>
                      <small style={{fontSize: '11px'}}>
                        {payingPlan[plan?.name]?.description}
                      </small>
                    </div>
                    <div className='col-md-3'>
                      <small className='font-weight-bold'>{availableVoucher?.discount ? 'R ' + (plan?.price - (plan?.price * availableVoucher?.discount) /100) : 'R ' + plan?.price}</small>
                      <br />
                      {(payingPlan[plan?.name]?.deduct || (payingPlan[plan?.name]?.deduct && availableVoucher?.discount)) && <small className='text-muted' style={{fontSize: '12px'}}><del>{availableVoucher?.discount ? 'R ' + (payingPlan[plan?.name]?.deduct - (payingPlan[plan?.name]?.deduct * availableVoucher?.discount) /100) : 'R ' + payingPlan[plan?.name]?.deduct}</del></small>}
                      <br />
                      <small className='font-weight-bold text-muted' style={{fontSize: '11.5px'}}>Save {payingPlan[plan?.name]?.percentage} %</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
