import axios from 'axios';
import React, { useState } from 'react';
import { payHere } from '../services/Payment';
import { MdOutlineCheck } from "react-icons/md";

const Billing = () => {
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [htmlContent, setHTMLContent] = useState('');

  const choosePlan = async ({amount, item_name}) => {
    const result = await payHere(amount, item_name);
    if(result.uuid) {
      window.payfast_do_onsite_payment({
        "uuid": result.uuid,
        "return_url": window.location.origin + `/successpay?amount=${amount}&item=${item_name}`,
        "cancel_url": window.location.origin + `/failedpay?amount=${amount}&item=${item_name}`
      });
    }
  };

  return (
    <>
      <div className="container mt-md-5">
        <div className="row">
          <div className="col-md-6 px-5">
            <h3>Select a Plan</h3>
            <h6>
              <small className="text-muted">Select one plan of the three to go with</small>
            </h6>
            <div className="my-5">
              <form action="https://www.payfast.co.za/eng/process" method="post">
                <input type="hidden" name="merchant_id" value="17844670" />
                <input type="hidden" name="merchant_key" value="o2djg0y03gnll" />
                <input type="hidden" name="amount" value="5" />
                <input type="hidden" name="return_url" value="https://lyra-education-production.vercel.app/successpay" />
                <input type="hidden" name="cancel_url" value="https://lyra-education-production.vercel.app/failedpay" />
                <input type="hidden" name="notify_url" value="https://189c-196-12-131-142.ngrok-free.app/v1/test-payment-notify-url" />
                <input type="hidden" name="item_name" value="Test Product" />
                <input type="hidden" name="subscription_type" value="1" />
                <input type="hidden" name="billing_date" value="2020-01-01" />
                <input type="hidden" name="recurring_amount" value="5" />
                <input type="hidden" name="frequency" value="3" />
                <input type="hidden" name="cycles" value="12" />
                <input type="hidden" name="subscription_notify_email" value="true" />
                <input type="hidden" name="subscription_notify_webhook" value="true" />
                <input type="hidden" name="subscription_notify_buyer" value="true" />
                {/* <button type="submit">Submit</button> */}
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
                        type='submit'
                        className="btn btn-sm btn-outline-secondary rounded-pill"
                      >
                        <small>Get Started</small>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="my-3">
                <div className="d-flex align-items-center justify-content-between shadow p-3">
                  <div>
                    <span className="p-0 m-0">
                      <small className="text-muted">Duration</small>
                    </span>
                    <h6 className="p-0 my-2">
                      <small>
                        6 Months -{' '}
                        <span>
                          <small className="font-weight-bold">ZAR 5</small>
                        </span>
                      </small>
                    </h6>
                  </div>
                  <div>
                    <button
                      onClick={() => choosePlan({amount: '5', item_name: '6 Month' })}
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                    >
                      <small>Get Started</small>
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-3">
                <div className="d-flex align-items-center justify-content-between shadow p-3">
                  <div>
                    <h6 className="p-0 m-0">
                      <small className="text-muted">Duration</small>
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
                      onClick={() => choosePlan({amount: '5', item_name: '1 Year' })}
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                    >
                      <small>Get Started</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 p-4 bg-light">
            <h6 className='my-2 font-weight-bold'>What You get With Our Plan</h6>
            <div className='my-4 d-flex flex-column'>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Up-to-date content</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Ready-and-verified content uploads</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Unlimited Content</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Creative and well-developed contents</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>100% Lifes lessons</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Books that covers all categories</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Images as part of contents</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>Creative and well-developed contents</small>
              </span>
              <span className='my-2'>
                <MdOutlineCheck color='#82C760' /> &nbsp;
                <small>100% Lifes lessons</small>
              </span>
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
