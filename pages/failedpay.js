import React, {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image1 from 'next/legacy/image'
import Cancel from '../public/images/cancel.svg'
import { getModule } from '../services/Content';
import { payingPlan } from './billing';
import { updateSubscription } from '../public/data/courseSubscription';
import { createSubscription } from '../services/CourseSubscription';

const FailedPay = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [module, setModule] = useState({});
  const amount = searchParams.get('amount');
  const item = searchParams.get('item');
  const plan = searchParams.get('plan');
  const course = decodeURIComponent(searchParams.get('course'));

  useEffect(() => {
    getModule(course).then((data) => {
      setModule(data);
    });

  }, []);

  const handleCourseSubscribe = () => {
    // updateSubscription('admin', payingPlan.filter(item => item?.name == plan)[0], module, amount);
    createSubscription({plan_id: plan, amount, moduleId: module?.id}).then((data) => {
      console.log('More Data', data)
    })
    router.push('/module/' + course)
  }

  return (
    <div className='w-100 my-5 d-flex justify-content-center align-items-center'>
      <div className='bg-white d-flex flex-column align-items-center shadow px-5 py-3'>
        <Image1 src={Cancel} width="80" height="80" />
        <h5 className='text-center my-4 text-danger'>Payment Failed</h5>
        <p className='text-center'><small className='text-muted'> You just need to check again with your payment method for the issue. <br /> Or try again with on-time inputs.</small></p>
        <button onClick={handleCourseSubscribe} className='btn btn-danger rounded w-100 mb-3'>Try Again</button>
      </div>
    </div>
  )
}

export default FailedPay
