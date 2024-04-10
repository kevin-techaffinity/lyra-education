import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { checkVoucher, payHere } from '../services/Payment';
import { MdOutlineCheck } from 'react-icons/md';
import { getVouchers, updateVoucher } from '../public/data/voucher';
import { courseSubscription, updateSubscription } from '../public/data/courseSubscription';
import { getModule } from '../services/Content';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const payingPlan = [
  {
    name: 'Starter',
    description: 'Great for beginners to learn and grow in loving what we offer and change their life.',
    // amount: 199,
    amount: 5,
    duration: 1,
    deduct: 250
  },
  {
    name: 'Pro',
    description: 'You can have more than a single change but double that with some greatness experience.',
    // amount: 350,
    amount: 5,
    deduct: 500,
    duration: 2
  },
  {
    name: 'Premium',
    description: 'Maximize your time with courses that will change your life on an amazing discount.',
    // amount: 450,
    amount: 5,
    deduct: 750,
    duration: 3
  },
]

const Billing = () => {
  const router = useRouter();
  const {query: {course}} = router;
  const [module, setModule] = useState({});
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [htmlContent, setHTMLContent] = useState('');
  const [voucher, setVoucher] = useState('');
  const [availableVoucher, setAvailableVoucher] = useState('')

  useEffect(() => {
    getModule(course).then((data) => {
      setModule(data);
    });
  }, [router.query]);

  const getDate = () => {
    // Create a new Date object
    let date = new Date();

    // Get the date in ISO string format
    let isoString = date.toISOString();

    // Extract the date part and time part separately
    let [datePart, timePart] = isoString.split('T');

    // Get the offset in hours and minutes
    let offsetHours = Math.floor(date.getTimezoneOffset() / 60);
    let offsetMinutes = date.getTimezoneOffset() % 60;

    // Format the offset string
    let offsetString = `${offsetHours >= 0 ? '+' : '-'}${Math.abs(offsetHours)
      .toString()
      .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

    // Construct the final ISO string with offset
    return `${datePart}T${timePart}${offsetString}`;
  };

  const choosePlan = async (plan) => {
    const payload = {
      amount: (availableVoucher?.discount ? ((plan?.amount * availableVoucher?.discount) /100) : plan?.amount).toString(),
      plan: plan?.name,
      item_name: module?.name?.trim().slice(0, -1)
    }

    const result = await payHere(payload);

    if (result.uuid) {
      window.payfast_do_onsite_payment({
        uuid: result.uuid,
        return_url: window.location.origin + `/successpay?amount=${payload?.amount}&item=${payload?.item_name}&plan=${plan?.name}&course=${course}`,
        cancel_url: window.location.origin + `/failedpay?amount=${payload?.amount}&item=${payload?.item_name}&plan=${plan?.name}&course=${course}`,
      });

      setAvailableVoucher('')
      updateSubscription('admin', plan, module, payload.amount)
    }
    

    router.back();

    // courseSubscription.push({
    //   user: 'admin',
    //   duration: (plan?.duration - module?.duration),
    //   course: [module],
    //   amount: payload?.amount,

    //   createdAt: Date.now()
    // })
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
            <h3>Select a Plan</h3>
            <h6 className='mb-3'>
              <small className="text-muted">Select one plan of the three to go with</small>
            </h6>
            <div className="p-4 bg-light my-2">
              <h6 className="my-2 font-weight-bold">What You get With Our Plan</h6>
              <div className="my-4 d-flex flex-column">
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Up-to-date content</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Ready-and-verified content uploads</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Unlimited Content</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Creative and well-developed contents</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>100% Lifes lessons</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Books that covers all categories</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Images as part of contents</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>Creative and well-developed contents</small>
                </span>
                <span className="my-2">
                  <MdOutlineCheck color="#82C760" /> &nbsp;
                  <small>100% Lifes lessons</small>
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
              {payingPlan?.map((plan, key) => (
                <div key={key} className="my-3" onClick={() => choosePlan(plan)} style={{cursor: 'pointer'}}>
                  <div className="row border rounded p-3">
                    <div className='col-md-9'>
                      <h5 className="p-0 m-0 mb-2">
                        <small className="font-weight-bold">{plan?.name}</small>
                      </h5>
                      <small style={{fontSize: '11px'}}>
                        {plan?.description}
                      </small>
                    </div>
                    <div className='col-md-3'>
                      <small className='font-weight-bold'>{availableVoucher?.discount ? 'ZAR ' + (plan?.amount - (plan?.amount * availableVoucher?.discount) /100) + ' /Cr' : 'ZAR ' + plan?.amount + ' /Cr'}</small>
                      <br />
                      {(plan?.deduct || (plan?.deduct && availableVoucher?.discount)) && <small className='text-muted' style={{fontSize: '11px'}}><del>{availableVoucher?.discount ? 'ZAR ' + (plan?.deduct - (plan?.deduct * availableVoucher?.discount) /100) + ' /Cr' : 'ZAR ' + plan?.deduct + ' /Cr'}</del></small>}
                      {/* <button
                        className="btn btn-sm btn-outline-secondary rounded-pill"
                      >
                        <small>Get Started</small>
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="my-3">
                <div className="row border rounded p-3">
                  <div className='col-md-9'>
                    <h5 className="p-0 m-0 mb-2">
                      <small className="font-weight-bold">Pro</small>
                    </h5>
                    <small style={{fontSize: '11px'}}>
                    You can have more than a single change but double that with some greatness experience
                    </small>
                  </div>
                  <div className='col-md-3'>
                    <small className='font-weight-bold' style={{fontSize: '14px'}}>ZAR 890 /Cr</small>
                    <br />
                    <small className='text-muted' style={{fontSize: '11px'}}><del>ZAR 84 /Cr</del></small>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <div className="row border rounded p-3">
                  <div className='col-md-9'>
                    <h5 className="p-0 m-0 mb-2">
                      <small className="font-weight-bold">Premium</small>
                    </h5>
                    <small style={{fontSize: '11px'}}>
                    Maximize your time with courses that will change your life on an amazing discount
                    </small>
                  </div>
                  <div className='col-md-3'>
                    <small className='font-weight-bold' style={{fontSize: '14px'}}>ZAR 1,365 /Cr</small>
                    <br />
                    <small className='text-muted' style={{fontSize: '11px'}}><del>ZAR 96 /Cr</del></small>
                  </div>
                </div>
              </div> */}
              {/* <div className="my-3">
                <div className="d-flex align-items-center justify-content-between shadow p-3">
                  <div>
                    <h6 className="p-0 m-0">
                      <small className="font-weight-bol">Premium</small>
                    </h6>
                    <h6 className="p-0 my-2">
                      <small>
                        1 Year -{' '}
                        <span>
                          <small className="font-weight-bold">ZAR 5</small>
                        </span>
                      </small>
                    </h6>
                  </div>
                  <div>
                    <button
                      onClick={() => choosePlan({ amount: '5', item_name: '1 Year' })}
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                    >
                      <small>Get Started</small>
                    </button>
                  </div>
                </div>
              </div> */}
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
